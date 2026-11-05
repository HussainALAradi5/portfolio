import { TechLayer } from '../../../enums/projects/tech-layer.enum';
import { ProjectTech } from '../../../interfaces/projects/project-tech.interface';
import { TechGroup } from '../../../interfaces/projects/tech-group.interface';

/** Groups stack items by layer in the given order, skipping empty layers. */
export function groupTechByLayer(tech: readonly ProjectTech[], order: readonly TechLayer[]): readonly TechGroup[] {
  const byLayer = new Map<TechLayer, string[]>();
  for (const item of tech) {
    const items = byLayer.get(item.layer) ?? [];
    items.push(item.name);
    byLayer.set(item.layer, items);
  }
  return order.filter((layer) => byLayer.has(layer)).map((layer) => ({ layer, items: byLayer.get(layer)! }));
}
