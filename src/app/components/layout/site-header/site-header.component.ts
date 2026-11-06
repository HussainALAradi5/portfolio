import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmTooltip } from '@spartan-ng/helm/tooltip';
import { SITE_PROFILE } from '../../../config/site/site.config';
import { UI_TEXT } from '../../../constants/common/ui-text.constants';
import { ROUTE_PATHS } from '../../../constants/routes/route-paths.constants';
import { ICON } from '../../../constants/ui/icons.constants';
import { ThemeMode } from '../../../enums/ui/theme-mode.enum';
import { CommandPaletteService } from '../../../services/ui/command-palette/command-palette.service';
import { ThemeService } from '../../../services/ui/theme/theme.service';
import { paletteShortcutLabel } from '../../../utilities/command-palette/shortcut/palette-shortcut.utility';

@Component({
  selector: 'app-site-header',
  imports: [RouterLink, RouterLinkActive, NgIcon, HlmButton, HlmTooltip],
  templateUrl: './site-header.component.html',
  styleUrl: './site-header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteHeaderComponent {
  private readonly theme = inject(ThemeService);
  private readonly palette = inject(CommandPaletteService);

  protected readonly text = UI_TEXT;
  protected readonly profile = SITE_PROFILE;
  protected readonly icon = ICON;
  protected readonly homePath = `/${ROUTE_PATHS.home}`;
  protected readonly projectsPath = `/${ROUTE_PATHS.projects}`;
  protected readonly experiencePath = `/${ROUTE_PATHS.experience}`;
  protected readonly skillsPath = `/${ROUTE_PATHS.skills}`;
  protected readonly shortcutLabel = paletteShortcutLabel(inject(DOCUMENT).defaultView?.navigator.userAgent ?? '');
  protected readonly themeIcon = computed(() => (this.theme.mode() === ThemeMode.Dark ? ICON.sun : ICON.moon));

  protected openPalette(): void {
    this.palette.open();
  }

  protected toggleTheme(): void {
    this.theme.toggle();
  }
}
