/**
 * Generic analytics abstraction layer.
 *
 * IMPORTANT: Both PostHog and Mixpanel JS SDKs auto-append page context
 * properties (url, pathname, referrer, browser, OS, screen, etc.) to every
 * event. We do NOT need to manually send these. This module only sends
 * custom business properties (locale, page_type, exercise, dest, etc.).
 *
 * Auto-collected by PostHog SDK (from posthog-js source: getEventProperties):
 *   $current_url, $pathname, $host, $referrer, $referring_domain,
 *   $browser, $browser_version, $browser_language, $os, $os_version,
 *   $device, $device_type, $screen_height, $screen_width,
 *   $viewport_height, $viewport_width, $timezone, $lib, $lib_version,
 *   $raw_user_agent, $insert_id, $time
 *
 * Auto-collected by Mixpanel SDK:
 *   $current_url, $browser, $browser_version, $os, $screen_height,
 *   $screen_width, $referrer, $initial_referrer, $initial_referring_domain,
 *   $search_engine, $device, $device_id, mp_lib, $lib_version,
 *   utm_source/medium/campaign/content/term, mp_country_code, $city, $region
 *
 * Adding a new provider requires:
 *   1. Add SDK script to Layout.astro <head>
 *   2. Add a provider entry to the `providers` array below
 *   3. Add a provider entry to Analytics.astro (for inline pageview/click tracking)
 *   4. Declare the SDK on the Window interface
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Provider adapter — encapsulates SDK-specific calling conventions. */
interface AnalyticsProvider {
  name: string;
  /** Return true if the SDK is loaded and ready. */
  isReady: () => boolean;
  /** Send a named event with custom properties. */
  track: (event: string, properties: Record<string, unknown>) => void;
  /** The event name this provider uses for pageviews. */
  pageviewEvent: string;
}

// ---------------------------------------------------------------------------
// Window type extensions for all supported SDKs
// ---------------------------------------------------------------------------

declare global {
  interface Window {
    posthog?: {
      capture: (event: string, properties?: Record<string, unknown>) => void;
      identify: (distinctId: string, properties?: Record<string, unknown>) => void;
      register: (properties: Record<string, unknown>) => void;
    };
    mixpanel?: {
      track: (event: string, properties?: Record<string, unknown>) => void;
      identify: (distinctId: string) => void;
      people: { set: (properties: Record<string, unknown>) => void };
      register: (properties: Record<string, unknown>) => void;
    };
    // Uncomment when adding:
    // amplitude?: { track: (event: string, properties?: Record<string, unknown>) => void };
    // gtag?: (...args: unknown[]) => void;
    // pendo?: { track: (event: string, properties?: Record<string, unknown>) => void };
    // DD_RUM?: { addAction: (name: string, context?: Record<string, unknown>) => void };
  }
}

// ---------------------------------------------------------------------------
// Provider registry
// ---------------------------------------------------------------------------

const providers: AnalyticsProvider[] = [
  {
    name: 'PostHog',
    isReady: () => typeof window !== 'undefined' && !!window.posthog,
    track: (event, props) => window.posthog!.capture(event, props),
    pageviewEvent: '$pageview',
  },
  {
    name: 'Mixpanel',
    isReady: () => typeof window !== 'undefined' && !!window.mixpanel,
    track: (event, props) => window.mixpanel!.track(event, props),
    pageviewEvent: 'Page View',
  },
  // --- Future providers ---
  // {
  //   name: 'Amplitude',
  //   isReady: () => typeof window !== 'undefined' && !!window.amplitude,
  //   track: (event, props) => window.amplitude!.track(event, props),
  //   pageviewEvent: 'Page Viewed',
  // },
  // {
  //   name: 'GA4',
  //   isReady: () => typeof window !== 'undefined' && !!window.gtag,
  //   track: (event, props) => window.gtag!('event', event, props),
  //   pageviewEvent: 'page_view',
  // },
  // {
  //   name: 'Pendo',
  //   isReady: () => typeof window !== 'undefined' && !!window.pendo,
  //   track: (event, props) => window.pendo!.track(event, props),
  //   pageviewEvent: 'pageview',
  // },
  // {
  //   name: 'Datadog RUM',
  //   isReady: () => typeof window !== 'undefined' && !!window.DD_RUM,
  //   track: (event, props) => window.DD_RUM!.addAction(event, props),
  //   pageviewEvent: 'pageview',
  // },
];

// ---------------------------------------------------------------------------
// Internal
// ---------------------------------------------------------------------------

function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Track a named event to all registered providers.
 *
 * Only pass custom/business properties — the SDKs auto-collect page context
 * ($current_url, $pathname, $referrer, $browser, $os, $screen_*, etc.).
 *
 * @example
 *   trackEvent('book_purchase_click', { locale: 'en', dest: 'eslite' });
 *   trackEvent('exercise_pdf_download', { exercise: 'visa-memo', locale: 'zh-tw' });
 */
export function trackEvent(name: string, properties?: Record<string, unknown>) {
  if (!isBrowser()) return;

  for (const provider of providers) {
    if (provider.isReady()) {
      provider.track(name, properties ?? {});
    }
  }
}

/**
 * Track a pageview to all registered providers.
 * Each provider receives its own pageview event name
 * (e.g. '$pageview' for PostHog, 'Page View' for Mixpanel).
 *
 * Only pass custom/business properties (locale, page_type).
 * URL, referrer, browser, etc. are auto-collected by the SDKs.
 *
 * @example
 *   trackPageView({ locale: 'en', page_type: 'home' });
 */
export function trackPageView(properties?: Record<string, unknown>) {
  if (!isBrowser()) return;

  for (const provider of providers) {
    if (provider.isReady()) {
      provider.track(provider.pageviewEvent, properties ?? {});
    }
  }
}
