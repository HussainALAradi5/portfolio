import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HlmButton } from '@spartan-ng/helm/button';
import { UI_TEXT } from '../../../constants/common/ui-text.constants';
import { ROUTE_PATHS } from '../../../constants/routes/route-paths.constants';

@Component({
  selector: 'app-not-found-page',
  imports: [RouterLink, HlmButton],
  templateUrl: './not-found-page.component.html',
  styleUrl: './not-found-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPageComponent {
  protected readonly text = UI_TEXT.notFound;
  protected readonly homePath = `/${ROUTE_PATHS.home}`;
}
