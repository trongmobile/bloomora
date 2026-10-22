import { THEME_STORAGE_KEY } from '../config/site';

/**
 * Inline script run in <head> before first paint.
 *  - applies the stored theme or prefers-color-scheme, so there is no flash and the
 *    client scripts never have to change the theme on load (no hydration mismatch);
 *  - flags low-performance devices so heavy glass effects can be dropped.
 * Must stay tiny and dependency-free. Everything is wrapped in try/catch because
 * storage can throw (private mode, blocked cookies).
 */
export const HEAD_INIT_SCRIPT = `(function(){try{var d=document.documentElement,s=null;try{s=localStorage.getItem('${THEME_STORAGE_KEY}')}catch(e){}var t=s==='light'||s==='dark'?s:(window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');d.setAttribute('data-theme',t);var n=navigator,c=n.connection;if((n.deviceMemory&&n.deviceMemory<=2)||(n.hardwareConcurrency&&n.hardwareConcurrency<=2)||(c&&c.saveData))d.setAttribute('data-perf','low')}catch(e){}})();`;
