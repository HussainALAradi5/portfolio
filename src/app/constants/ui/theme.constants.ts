export const THEME_STORAGE_KEY = 'portfolio-theme';
export const DARK_THEME_CLASS = 'dark';
export const DARK_SCHEME_QUERY = '(prefers-color-scheme: dark)';
export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

/** Set on <html> while the theme switch animates, so styles.css plays the reveal instead of the page transition. */
export const THEME_TRANSITION_CLASS = 'theme-transition';
/** Where the reveal circle starts, read by the theme-reveal keyframes in styles.css. */
export const THEME_REVEAL_X_VAR = '--theme-reveal-x';
export const THEME_REVEAL_Y_VAR = '--theme-reveal-y';
