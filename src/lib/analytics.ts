/**
 * Analytics abstraction layer — dispatches events to both PostHog and Mixpanel.
 *
 * All functions are safe to call during SSR (they no-op when window is undefined)
 * and gracefully degrade if either SDK fails to load.
 *
 * Event naming convention:
 *   - Pageviews:   '$pageview' (PostHog) / 'Page View' (Mixpanel)
 *   - Conversions: 'book_purchase_click', 'coffee_chat_book', 'exercise_pdf_download', etc.
 *   - Engagement:  'language_switch', 'exercise_start', 'social_click', etc.
 *   - Journey:     page_type property on every event enables Sankey/Flows in both tools
 */

declare global {
  interface Window {
    posthog?: {
      capture: (event: string, properties?: Record<string, unknown>) => void;
      identify: (distinctId: string, properties?: Record<string, unknown>) => void;
    };
    mixpanel?: {
      track: (event: string, properties?: Record<string, unknown>) => void;
      identify: (distinctId: string) => void;
      people: { set: (properties: Record<string, unknown>) => void };
    };
  }
}

function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Track a named event to both PostHog and Mixpanel.
 * Every event automatically includes page context for user journey analysis.
 */
export function trackEvent(name: string, properties?: Record<string, unknown>) {
  if (!isBrowser()) return;

  const context: Record<string, unknown> = {
    url: window.location.href,
    path: window.location.pathname,
    referrer: document.referrer,
    title: document.title,
    ...properties,
  };

  window.posthog?.capture(name, context);
  window.mixpanel?.track(name, context);
}

/**
 * Track a pageview with enriched metadata.
 * Called once per page load from Analytics.astro.
 * Provides the data needed for retention cohorts and Sankey/user flow analysis.
 */
export function trackPageView(properties: {
  locale: string;
  page_type: string;
  [key: string]: unknown;
}) {
  if (!isBrowser()) return;

  const context = {
    url: window.location.href,
    path: window.location.pathname,
    referrer: document.referrer,
    title: document.title,
    ...properties,
  };

  // PostHog uses '$pageview' as the canonical pageview event
  window.posthog?.capture('$pageview', context);
  // Mixpanel uses a custom 'Page View' event
  window.mixpanel?.track('Page View', context);
}
