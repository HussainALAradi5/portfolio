import { ProjectStatus } from '../../../enums/projects/project-status.enum';
import { ProjectTier } from '../../../enums/projects/project-tier.enum';
import { RepositoryRole } from '../../../enums/projects/repository-role.enum';
import { TechLayer } from '../../../enums/projects/tech-layer.enum';
import { Project } from '../../../interfaces/projects/project.interface';
import { PROJECT_IMAGE_BASE } from '../project-paths.constants';

const IMAGES = `${PROJECT_IMAGE_BASE}/duck-street`;

export const DUCK_STREET_PROJECT: Project = {
  slug: 'duck-street',
  name: 'Duck Street',
  tagline: 'Arcade road-crossing game in the browser',
  domain: 'Game',
  icon: 'lucideGamepad2',
  tier: ProjectTier.Early,
  status: ProjectStatus.Live,
  period: 'May 2024',
  summary:
    'A Frogger-inspired browser game built with plain JavaScript, HTML and CSS: guide a duck across busy lanes of traffic to reach the water. ' +
    'It was my first General Assembly project, built to practise DOM manipulation, timers and keyboard events.',
  highlights: [
    'Arrow-key movement across a grid of lanes, with collision checks against every car.',
    'Three levels: cars all drive one way, then lanes alternate direction and speed up.',
    'Cars spawn in random colours and move on intervals; a hit resets the duck to the start.',
    'Winning and death scores, a rules page and a dark mode toggle.',
    'Deployed as a static site on Surge.',
  ],
  tech: [
    { layer: TechLayer.Frontend, name: 'JavaScript' },
    { layer: TechLayer.Frontend, name: 'HTML' },
    { layer: TechLayer.Frontend, name: 'CSS' },
  ],
  repositories: [{ role: RepositoryRole.Application, name: 'Duck-Street', stack: 'JavaScript' }],
  links: [{ label: 'Play the game', url: 'https://undesirable-science.surge.sh/' }],
  screenshots: [
    { src: `${IMAGES}/board.webp`, caption: 'Cars crossing the road' },
    { src: `${IMAGES}/scoreboard.webp`, caption: 'Board with winning and death scores' },
    { src: `${IMAGES}/rules.webp`, caption: 'Rules page' },
  ],
};
