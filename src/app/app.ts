import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommandPaletteComponent } from './components/layout/command-palette/command-palette.component';
import { RouteProgressBarComponent } from './components/layout/route-progress-bar/route-progress-bar.component';
import { SiteFooterComponent } from './components/layout/site-footer/site-footer.component';
import { SiteHeaderComponent } from './components/layout/site-header/site-header.component';
import { ThemeService } from './services/ui/theme/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommandPaletteComponent, RouteProgressBarComponent, SiteHeaderComponent, SiteFooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  // Injected here so the stored or system theme applies before the first paint.
  private readonly theme = inject(ThemeService);
}
