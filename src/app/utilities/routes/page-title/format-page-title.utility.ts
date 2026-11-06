import { PAGE_TITLE_SEPARATOR, SITE_TITLE } from '../../../constants/routes/page-titles.constants';

/** "Experience · Hussain Al Aradi" */
export function formatPageTitle(pageName: string): string {
  return `${pageName}${PAGE_TITLE_SEPARATOR}${SITE_TITLE}`;
}
