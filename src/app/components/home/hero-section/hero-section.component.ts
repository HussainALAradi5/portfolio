import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { HlmButton } from '@spartan-ng/helm/button';
import { CvDownloadButtonComponent } from '../../common/cv-download-button/cv-download-button.component';
import { SITE_PROFILE } from '../../../config/site/site.config';
import { UI_TEXT } from '../../../constants/common/ui-text.constants';
import { HeroStat } from '../../../interfaces/home/hero-stat.interface';
import { Project } from '../../../interfaces/projects/project.interface';
import { countLiveDemos } from '../../../utilities/projects/stats/count-live-demos.utility';
import { countRepositories } from '../../../utilities/projects/stats/count-repositories.utility';

@Component({
  selector: 'app-hero-section',
  imports: [NgIcon, HlmButton, CvDownloadButtonComponent],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSectionComponent {
  readonly projects = input.required<readonly Project[]>();

  protected readonly text = UI_TEXT;
  protected readonly profile = SITE_PROFILE;

  protected readonly stats = computed<readonly HeroStat[]>(() => [
    { label: UI_TEXT.hero.stats.projects, value: this.projects().length },
    { label: UI_TEXT.hero.stats.repositories, value: countRepositories(this.projects()) },
    { label: UI_TEXT.hero.stats.liveDemos, value: countLiveDemos(this.projects()) },
  ]);
}
