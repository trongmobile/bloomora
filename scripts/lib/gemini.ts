/**
 * Minimal Gemini client over plain `fetch` (no SDK, no new dependency), using the Interactions API:
 *   POST {base}/interactions  { model, input, tools, response_format, generation_config, ... }
 * Reference: https://aistudio.google.com/api-reference/interactions-api
 *
 * Only what the weekly flower job needs: one text prompt in, text (+ Google Search citations) out,
 * optionally constrained to a JSON schema. Transient failures (429 / 5xx / network) are retried with
 * exponential backoff, as Google recommends.
 */

export const DEFAULT_MODEL = 'gemini-4-carbon';
export const DEFAULT_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta';

export interface Citation {
  url: string;
  /** Often just the site's domain; do not treat it as the page title. */
  title: string;
}

export interface GeminiResponse {
  text: string;
  /** `url_citation` annotations from Grounding with Google Search, de-duplicated by URL. */
  citations: Citation[];
  searchQueries: string[];
}

export type ThinkingLevel = 'minimal' | 'low' | 'medium' | 'high';

export interface GenerateRequest {
  input: string;
  systemInstruction?: string;
  /** Ground the answer with Google Search; sources come back in `citations`. */
  search?: boolean;
  /** JSON schema (a subset of JSON Schema); the reply is then JSON text that conforms to it. */
  schema?: Record<string, unknown>;
  maxOutputTokens?: number;
  thinkingLevel?: ThinkingLevel;
}

export interface GeminiClient {
  readonly model: string;
  generate(req: GenerateRequest): Promise<GeminiResponse>;
}

export class GeminiError extends Error {
  readonly status: number | undefined;
  readonly retryable: boolean;
  readonly retryAfterMs: number | undefined;
  constructor(message: string, opts: { status?: number; retryable?: boolean; retryAfterMs?: number } = {}) {
    super(message);
    this.name = 'GeminiError';
    this.status = opts.status;
    this.retryable = opts.retryable ?? false;
    this.retryAfterMs = opts.retryAfterMs;
  }
}

const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);

/** `thinking_level` is only accepted by Gemini 3 and later; older models reject it. */
export const supportsThinkingLevel = (model: string): boolean => /^gemini-(3|4)/.test(model);

/** Builds the JSON body of `POST /interactions`. Exported for tests. */
export function buildRequestBody(model: string, req: GenerateRequest): Record<string, unknown> {
  const body: Record<string, unknown> = {
    model,
    input: req.input,
    // Stateless: we never use previous_interaction_id, so there is nothing to keep on Google's side.
    store: false,
  };
  if (req.systemInstruction) body.system_instruction = req.systemInstruction;
  if (req.search) body.tools = [{ type: 'google_search' }];
  if (req.schema) body.response_format = { type: 'text', mime_type: 'application/json', schema: req.schema };
  const config: Record<string, unknown> = {};
  if (req.maxOutputTokens) config.max_output_tokens = req.maxOutputTokens;
  if (req.thinkingLevel && supportsThinkingLevel(model)) config.thinking_level = req.thinkingLevel;
  if (Object.keys(config).length > 0) body.generation_config = config;
  return body;
}

function describeErrors(errors: unknown): string {
  if (!Array.isArray(errors)) return '';
  const msgs = errors.map((e) => (isRecord(e) && typeof e.message === 'string' ? e.message : '')).filter(Boolean);
  return msgs.length > 0 ? `: ${msgs.join('; ').slice(0, 300)}` : '';
}

/** Reads the final text, citations and search queries out of a completed Interaction. Exported for tests. */
export function parseInteraction(json: unknown): GeminiResponse {
  if (!isRecord(json)) throw new GeminiError('Unexpected response: not a JSON object');
  const status = typeof json.status === 'string' ? json.status : 'unknown';
  if (status === 'incomplete') {
    throw new GeminiError('The reply was cut off (max_output_tokens reached); raise the limit or shorten the request');
  }
  if (status !== 'completed') {
    throw new GeminiError(`Interaction ended with status "${status}"${describeErrors(json.errors)}`, {
      retryable: status === 'failed',
    });
  }
  const steps = Array.isArray(json.steps) ? json.steps : [];
  let text = '';
  const citations = new Map<string, Citation>();
  const searchQueries: string[] = [];
  for (const step of steps) {
    if (!isRecord(step)) continue;
    if (step.type === 'google_search_call' && isRecord(step.arguments)) {
      const { queries, query } = step.arguments;
      if (Array.isArray(queries)) for (const q of queries) if (typeof q === 'string') searchQueries.push(q);
      if (typeof query === 'string') searchQueries.push(query);
    }
    if (step.type === 'model_output' && Array.isArray(step.content)) {
      for (const block of step.content) {
        if (!isRecord(block) || block.type !== 'text' || typeof block.text !== 'string') continue;
        text += block.text;
        if (!Array.isArray(block.annotations)) continue;
        for (const a of block.annotations) {
          if (isRecord(a) && a.type === 'url_citation' && typeof a.url === 'string' && !citations.has(a.url)) {
            citations.set(a.url, { url: a.url, title: typeof a.title === 'string' ? a.title : '' });
          }
        }
      }
    }
  }
  if (!text.trim()) throw new GeminiError('The model returned no text', { retryable: true });
  return { text, citations: [...citations.values()], searchQueries };
}

const RETRYABLE_STATUS = new Set([408, 429, 500, 502, 503, 504]);

function httpError(status: number, raw: string, retryAfter: string | null): GeminiError {
  let message = raw.slice(0, 300);
  try {
    const parsed: unknown = JSON.parse(raw);
    if (isRecord(parsed) && isRecord(parsed.error) && typeof parsed.error.message === 'string') {
      message = parsed.error.message.slice(0, 500);
    }
  } catch {
    // keep the raw text
  }
  const seconds = retryAfter ? Number(retryAfter) : NaN;
  return new GeminiError(`Gemini API HTTP ${status}: ${message}`, {
    status,
    retryable: RETRYABLE_STATUS.has(status),
    retryAfterMs: Number.isFinite(seconds) ? seconds * 1000 : undefined,
  });
}

export interface ClientOptions {
  apiKey: string;
  model?: string;
  baseUrl?: string;
  /** Sent as the `Api-Revision` header when set (optional pin of the API revision). */
  apiRevision?: string;
  fetchImpl?: typeof fetch;
  /** Retries after the first attempt. Default 4. */
  maxRetries?: number;
  /** Per-request timeout; grounded, thinking requests are slow. Default 5 minutes. */
  timeoutMs?: number;
  sleep?: (ms: number) => Promise<void>;
  log?: (message: string) => void;
}

export function createGeminiClient(opts: ClientOptions): GeminiClient {
  if (!opts.apiKey) throw new GeminiError('GEMINI_API_KEY is empty');
  const model = opts.model || DEFAULT_MODEL;
  const baseUrl = (opts.baseUrl || DEFAULT_BASE_URL).replace(/\/+$/, '');
  const fetchImpl = opts.fetchImpl ?? fetch;
  const maxRetries = opts.maxRetries ?? 4;
  const timeoutMs = opts.timeoutMs ?? 300_000;
  const sleep = opts.sleep ?? ((ms: number) => new Promise<void>((r) => setTimeout(r, ms)));
  const log = opts.log ?? (() => {});

  return {
    model,
    async generate(req) {
      const headers: Record<string, string> = { 'content-type': 'application/json', 'x-goog-api-key': opts.apiKey };
      if (opts.apiRevision) headers['Api-Revision'] = opts.apiRevision;
      const body = JSON.stringify(buildRequestBody(model, req));
      let lastError: unknown;
      for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
          const res = await fetchImpl(`${baseUrl}/interactions`, {
            method: 'POST',
            headers,
            body,
            signal: AbortSignal.timeout(timeoutMs),
          });
          const raw = await res.text();
          if (!res.ok) throw httpError(res.status, raw, res.headers.get('retry-after'));
          let json: unknown;
          try {
            json = JSON.parse(raw);
          } catch {
            throw new GeminiError('The response was not valid JSON', { status: res.status, retryable: true });
          }
          return parseInteraction(json);
        } catch (e) {
          lastError = e;
          // Network errors and timeouts are not GeminiErrors: treat them as transient.
          const retryable = e instanceof GeminiError ? e.retryable : true;
          if (!retryable || attempt === maxRetries) break;
          const backoff = Math.min(60_000, 1000 * 2 ** attempt) + Math.floor(Math.random() * 500);
          const wait = e instanceof GeminiError && e.retryAfterMs ? Math.min(e.retryAfterMs, 120_000) : backoff;
          log(`Gemini request failed (${e instanceof Error ? e.message : String(e)}); retry ${attempt + 1}/${maxRetries} in ${Math.round(wait / 1000)}s`);
          await sleep(wait);
        }
      }
      throw lastError;
    },
  };
}
