import { SITE_TITLE } from '../../../constants/routes/page-titles.constants';
import { formatPageTitle } from './format-page-title.utility';

describe('formatPageTitle', () => {
  it('puts the page name before the site title', () => {
    expect(formatPageTitle('Experience')).toBe(`Experience · ${SITE_TITLE}`);
  });
});
