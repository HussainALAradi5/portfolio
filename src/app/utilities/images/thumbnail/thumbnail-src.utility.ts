import { THUMBNAIL_SUFFIX } from '../../../constants/projects/project-paths.constants';

/** Path of the small copy made by `npm run images:optimize`: `a/b.webp` becomes `a/b.thumb.webp`. */
export function thumbnailSrc(src: string): string {
  const dot = src.lastIndexOf('.');
  return dot < 0 ? src : `${src.slice(0, dot)}${THUMBNAIL_SUFFIX}${src.slice(dot)}`;
}
