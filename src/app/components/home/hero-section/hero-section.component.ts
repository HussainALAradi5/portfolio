import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { HlmButton } from '@spartan-ng/helm/button';
import { SITE_PROFILE } from '../../../config/site/site.config';
import { UI_TEXT } from '../../../constants/common/ui-text.constants';
import { ROUTE_PATHS } from '../../../constants/routes/route-paths.constants';
import { ICON } from '../../../constants/ui/icons.constants';
import { Project } from '../../../interfaces/projects/project.interface';
import { countLiveDemos, countRepositories } from '../../../utilities/projects/project.utility';

@Component({
  selector: 'app-hero-section',
  imports: [RouterLink, NgIcon, HlmButton],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSectionComponent {
  readonly projects = input.required<readonly Project[]>();

  protected readonly text = UI_TEXT;
  protected readonly profile = SITE_PROFILE;
  protected readonly icon = ICON;
  protected readonly projectsFragment = ROUTE_PATHS.projectsAnchor;

  protected readonly stats = computed(() => [
    { label: UI_TEXT.hero.stats.projects, value: this.projects().length },
    { label: UI_TEXT.hero.stats.repositories, value: countRepositories(this.projects()) },
    { label: UI_TEXT.hero.stats.liveDemos, value: countLiveDemos(this.projects()) },
  ]);
}
