/** Timing of the top progress bar shown while a route loads. */
export const ROUTE_PROGRESS = {
  /** Wait before showing, so fast navigations don't flicker. */
  showDelayMs: 150,
  /** How often the bar creeps forward while waiting. */
  trickleIntervalMs: 200,
  /** Share of the remaining distance added on each trickle. */
  trickleRatio: 0.15,
  /** The bar never passes this value until the route finishes. */
  maxWhileLoading: 90,
  startValue: 10,
  doneValue: 100,
  /** How long the full bar stays before fading out. */
  hideDelayMs: 250,
} as const;
