import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { HlmBadge } from '@spartan-ng/helm/badge';
import { TECH_LAYER_LABELS, TECH_LAYER_ORDER } from '../../../constants/projects/project-labels.constants';
import { ProjectTech } from '../../../interfaces/projects/project-tech.interface';
import { groupTechByLayer } from '../../../utilities/projects/tech/group-tech-by-layer.utility';

@Component({
  selector: 'app-project-tech-groups',
  imports: [HlmBadge],
  templateUrl: './project-tech-groups.component.html',
  styleUrl: './project-tech-groups.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectTechGroupsComponent {
  readonly tech = input.required<readonly ProjectTech[]>();

  protected readonly labels = TECH_LAYER_LABELS;
  protected readonly groups = computed(() => groupTechByLayer(this.tech(), TECH_LAYER_ORDER));
}
