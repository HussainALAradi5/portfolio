export interface CvFile {
  /** Path relative to the base href, so it works under the GitHub Pages subpath. */
  url: string;
  /** Name the browser saves the file as. */
  fileName: string;
}
