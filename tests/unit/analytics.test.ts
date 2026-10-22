import { describe, expect, it } from 'vitest';
import { GOATCOUNTER_SCRIPT_SRC, isValidGoatCounterCode, resolveAnalyticsConfig } from '../../src/config/analytics';

describe('GoatCounter configuration', () => {
  it('is off without a site code', () => {
    expect(resolveAnalyticsConfig({})).toMatchObject({ enabled: false, endpoint: null, reason: 'no-code' });
    expect(resolveAnalyticsConfig({ PUBLIC_GOATCOUNTER_CODE: '   ' }).enabled).toBe(false);
  });

  it('builds the endpoint from the code', () => {
    const c = resolveAnalyticsConfig({ PUBLIC_GOATCOUNTER_CODE: 'My-Site' });
    expect(c).toMatchObject({ enabled: true, endpoint: 'https://my-site.goatcounter.com/count', scriptSrc: GOATCOUNTER_SCRIPT_SRC });
  });

  it('rejects codes that could inject markup or another host', () => {
    for (const bad of ['evil.com/x', 'a b', '"><script>', '-start', 'end-', 'x'.repeat(60), 'a.b']) {
      expect(isValidGoatCounterCode(bad), bad).toBe(false);
      expect(resolveAnalyticsConfig({ PUBLIC_GOATCOUNTER_CODE: bad })).toMatchObject({ enabled: false, reason: 'invalid-code' });
    }
    expect(isValidGoatCounterCode('abc-123')).toBe(true);
  });

  it('can be switched off with a flag even when a code is set', () => {
    for (const flag of ['false', '0', 'off', 'FALSE']) {
      expect(resolveAnalyticsConfig({ PUBLIC_GOATCOUNTER_CODE: 'x', PUBLIC_ANALYTICS_ENABLED: flag })).toMatchObject({ enabled: false, reason: 'disabled-by-flag' });
    }
  });

  it('only ever loads the official script host', () => {
    expect(GOATCOUNTER_SCRIPT_SRC).toBe('https://gc.zgo.at/count.js');
  });
});
