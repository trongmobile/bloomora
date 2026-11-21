/**
 * AnalyticsConfig — resolves GoatCounter settings from environment variables.
 *
 * Nothing here is hard-coded: the site code comes from PUBLIC_GOATCOUNTER_CODE so
 * it can be set in CI/hosting without editing source code.
 */

export interface AnalyticsConfig {
  enabled: boolean;
  /** Full GoatCounter endpoint, e.g. https://my-site.goatcounter.com/count */
  endpoint: string | null;
  /** URL of the official GoatCounter script. */
  scriptSrc: string;
  /** Why analytics is off (useful for logs / docs / tests). */
  reason?: 'no-code' | 'invalid-code' | 'disabled-by-flag';
}

export const GOATCOUNTER_SCRIPT_SRC = 'https://gc.zgo.at/count.js';

/**
 * The only custom event the site sends: a click on a flower card. GoatCounter's own count.js binds
 * it from `data-goatcounter-click`, so there is no tracking code of ours. The name uses the
 * language-neutral flower id, so the vi and en cards of one species land on the same row.
 */
export const FLOWER_CLICK_EVENT_PREFIX = 'click/flower/';

export function flowerClickEventName(flowerId: string): string {
  return `${FLOWER_CLICK_EVENT_PREFIX}${flowerId}`;
}

/** GoatCounter site codes are lowercase letters, digits and hyphens. */
const CODE_PATTERN = /^[a-z0-9](?:[a-z0-9-]{0,48}[a-z0-9])?$/;

export function isValidGoatCounterCode(code: string): boolean {
  return CODE_PATTERN.test(code);
}

export function resolveAnalyticsConfig(env: {
  PUBLIC_GOATCOUNTER_CODE?: string;
  PUBLIC_ANALYTICS_ENABLED?: string;
}): AnalyticsConfig {
  const base = { scriptSrc: GOATCOUNTER_SCRIPT_SRC };
  const flag = (env.PUBLIC_ANALYTICS_ENABLED ?? 'true').trim().toLowerCase();
  if (flag === 'false' || flag === '0' || flag === 'off') {
    return { ...base, enabled: false, endpoint: null, reason: 'disabled-by-flag' };
  }
  const code = (env.PUBLIC_GOATCOUNTER_CODE ?? '').trim().toLowerCase();
  if (!code) return { ...base, enabled: false, endpoint: null, reason: 'no-code' };
  if (!isValidGoatCounterCode(code)) {
    return { ...base, enabled: false, endpoint: null, reason: 'invalid-code' };
  }
  return { ...base, enabled: true, endpoint: `https://${code}.goatcounter.com/count` };
}
