// eslint-disable-next-line @typescript-eslint/triple-slash-reference -- required by Astro; an import would turn this file into a module
/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly PUBLIC_GOATCOUNTER_CODE?: string;
  readonly PUBLIC_ANALYTICS_ENABLED?: string;
  readonly PUBLIC_GSC_VERIFICATION?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
