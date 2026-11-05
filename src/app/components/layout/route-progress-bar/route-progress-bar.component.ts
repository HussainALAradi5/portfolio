import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HlmProgressImports } from '@spartan-ng/helm/progress';
import { UI_TEXT } from '../../../constants/common/ui-text.constants';
import { RouteProgressService } from '../../../services/ui/route-progress/route-progress.service';

/** Thin bar across the top of the page while a route loads. */
@Component({
  selector: 'app-route-progress-bar',
  imports: [HlmProgressImports],
  templateUrl: './route-progress-bar.component.html',
  styleUrl: './route-progress-bar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouteProgressBarComponent {
  protected readonly progress = inject(RouteProgressService);
  protected readonly label = UI_TEXT.nav.loading;
}
