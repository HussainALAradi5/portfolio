import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { provideSpartanHlm } from '@spartan-ng/helm/utils';

import { routes } from './app.routes';
import { APP_ICONS } from './constants/ui/icons.constants';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withInMemoryScrolling({ scrollPositionRestoration: 'top', anchorScrolling: 'enabled' }),
      // Pages cross-fade as the route changes; the animation itself is in styles.css.
      withViewTransitions({ skipInitialTransition: true }),
    ),
    provideSpartanHlm(),
    provideIcons(APP_ICONS),
  ],
};
