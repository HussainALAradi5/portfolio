/** Media query for visitors who asked the system for less motion; every scripted animation checks it. */
export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

/** Set on <html> while project cards glide between layouts, so styles.css times that transition. */
export const LAYOUT_TRANSITION_CLASS = 'layout-transition';

/** How long a number takes to count up from zero. CSS motion tokens live in styles.css. */
export const COUNT_UP_DURATION_MS = 900;

/** Extra wait after the count's duration before the final value is shown anyway (frames can be paused). */
export const COUNT_UP_SAFETY_MS = 300;
