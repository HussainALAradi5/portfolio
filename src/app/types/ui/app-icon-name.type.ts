import type { APP_ICONS } from '../../constants/ui/icons.constants';

/** Name of an icon registered in APP_ICONS; a typo fails the build instead of rendering a blank icon. */
export type AppIconName = keyof typeof APP_ICONS;
