import { TECH_LAYER_ORDER } from '../../../constants/projects/project-labels.constants';
import { TechLayer } from '../../../enums/projects/tech-layer.enum';
import { groupTechByLayer } from './group-tech-by-layer.utility';

describe('groupTechByLayer', () => {
  it('groups in layer order and skips empty layers', () => {
    const groups = groupTechByLayer(
      [
        { layer: TechLayer.Data, name: 'MongoDB' },
        { layer: TechLayer.Frontend, name: 'React' },
        { layer: TechLayer.Frontend, name: 'CSS' },
      ],
      TECH_LAYER_ORDER,
    );
    expect(groups).toEqual([
      { layer: TechLayer.Frontend, items: ['React', 'CSS'] },
      { layer: TechLayer.Data, items: ['MongoDB'] },
    ]);
  });

  it('returns nothing for an empty stack', () => {
    expect(groupTechByLayer([], TECH_LAYER_ORDER)).toEqual([]);
  });
});
