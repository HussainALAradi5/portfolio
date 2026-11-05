import { TechLayer } from '../../enums/projects/tech-layer.enum';

export interface TechGroup {
  layer: TechLayer;
  items: readonly string[];
}
