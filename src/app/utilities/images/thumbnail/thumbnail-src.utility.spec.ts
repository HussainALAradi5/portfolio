import { thumbnailSrc } from './thumbnail-src.utility';

describe('thumbnailSrc', () => {
  it('inserts the thumbnail suffix before the extension', () => {
    expect(thumbnailSrc('images/projects/e-clinic/journal.webp')).toBe('images/projects/e-clinic/journal.thumb.webp');
  });

  it('leaves a path without an extension unchanged', () => {
    expect(thumbnailSrc('images/file')).toBe('images/file');
  });
});
