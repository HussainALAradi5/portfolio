import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ExperienceTimelineComponent } from '../../../components/experience/experience-timeline/experience-timeline.component';
import { HeroSectionComponent } from '../../../components/home/hero-section/hero-section.component';
import { ProjectsSectionComponent } from '../../../components/projects/projects-section/projects-section.component';
import { SkillsSectionComponent } from '../../../components/skills/skills-section/skills-section.component';
import { ProjectService } from '../../../services/projects/project/project.service';

/** Everything at once: the hero, projects, experience and skills. */
@Component({
  selector: 'app-home-page',
  imports: [HeroSectionComponent, ProjectsSectionComponent, ExperienceTimelineComponent, SkillsSectionComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  protected readonly allProjects = inject(ProjectService).findAll();
}
