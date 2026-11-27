/**
 * The view-transition name a project's card carries in both the grid and the timeline, so the browser can glide
 * it from one layout to the other. Slugs are already lowercase with hyphens, which are valid in the name.
 */
export function projectTransitionName(slug: string): string {
  return `project-${slug}`;
}
