import { PROJECTS } from '../../../constants/projects/projects.constants';
import { findProjectNeighbours } from './find-project-neighbours.utility';

describe('findProjectNeighbours', () => {
  it('has no previous project for the first one', () => {
    const first = findProjectNeighbours(PROJECTS, PROJECTS[0].slug);
    expect(first.previous).toBeUndefined();
    expect(first.next).toBe(PROJECTS[1]);
  });

  it('has no next project for the last one', () => {
    expect(findProjectNeighbours(PROJECTS, PROJECTS[PROJECTS.length - 1].slug).next).toBeUndefined();
  });

  it('returns nothing for an unknown slug', () => {
    expect(findProjectNeighbours(PROJECTS, 'missing')).toEqual({});
  });
});
