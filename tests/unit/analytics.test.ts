import { describe, expect, it } from 'vitest';
import { FLOWERS } from '../../src/data';
import {
  FLOWER_CLICK_EVENT_PREFIX,
  GOATCOUNTER_SCRIPT_SRC,
  flowerClickEventName,
  isValidGoatCounterCode,
  resolveAnalyticsConfig,
} from '../../src/config/analytics';

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

describe('flower card click event', () => {
  it('is named after the language-neutral flower id', () => {
    expect(flowerClickEventName('sunflower')).toBe('click/flower/sunflower');
    expect(FLOWER_CLICK_EVENT_PREFIX).toBe('click/flower/');
  });

  it('gives every species its own name, safe to put in an attribute and a dashboard row', () => {
    const names = FLOWERS.map((f) => flowerClickEventName(f.id));
    expect(new Set(names).size).toBe(FLOWERS.length);
    for (const name of names) expect(name).toMatch(/^click\/flower\/[a-z0-9-]+$/);
  });
});
