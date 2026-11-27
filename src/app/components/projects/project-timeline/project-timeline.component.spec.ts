import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { PROJECTS } from '../../../constants/projects/projects.constants';
import { APP_ICONS } from '../../../constants/ui/icons.constants';
import { ProjectSort } from '../../../enums/projects/project-sort.enum';
import { groupProjects } from '../../../utilities/projects/sort/sort-projects.utility';
import { ProjectTimelineComponent } from './project-timeline.component';

describe('ProjectTimelineComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectTimelineComponent],
      providers: [provideRouter([]), provideIcons(APP_ICONS)],
    }).compileComponents();
  });

  it('shows one heading per group and one linked entry per project, in order', async () => {
    const groups = groupProjects(PROJECTS, ProjectSort.Newest);
    const fixture = TestBed.createComponent(ProjectTimelineComponent);
    fixture.componentRef.setInput('groups', groups);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;

    expect([...element.querySelectorAll('h3')].map((heading) => heading.textContent?.trim())).toEqual(
      groups.map((group) => group.label),
    );
    const links = [...element.querySelectorAll<HTMLAnchorElement>('.timeline-entry a')];
    expect(links.map((link) => link.getAttribute('href'))).toEqual(
      groups.flatMap((group) => group.projects.map((project) => `/projects/${project.slug}`)),
    );
    expect(links[0].querySelectorAll('[data-slot="badge"]').length).toBeGreaterThanOrEqual(2);
  });
});
