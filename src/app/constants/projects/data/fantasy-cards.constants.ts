import { ProjectStatus } from '../../../enums/projects/project-status.enum';
import { ProjectTier } from '../../../enums/projects/project-tier.enum';
import { RepositoryRole } from '../../../enums/projects/repository-role.enum';
import { TechLayer } from '../../../enums/projects/tech-layer.enum';
import { Project } from '../../../interfaces/projects/project.interface';
import { GITHUB_BASE_URL, PROJECT_IMAGE_BASE } from '../project-paths.constants';

const IMAGES = `${PROJECT_IMAGE_BASE}/fantasy-cards`;

export const FANTASY_CARDS_PROJECT: Project = {
  slug: 'fantasy-cards',
  name: 'Fantasy Cards',
  tagline: 'Card memory game for all ages',
  domain: 'Game',
  icon: 'lucideSparkles',
  tier: ProjectTier.Early,
  status: ProjectStatus.Live,
  period: 'Aug 2024',
  summary:
    'A small memory game inspired by the traditional card-matching game, built with React to practise state, effects and UI animation. ' +
    'It has easy and normal difficulties and is playable online.',
  highlights: [
    'Easy and normal difficulties with different board sizes.',
    'Card flip animation and match tracking with React state.',
    'Intro screen and a layout that works on different screen sizes.',
    'Deployed as a static site on Surge.',
  ],
  tech: [
    { layer: TechLayer.Frontend, name: 'React' },
    { layer: TechLayer.Frontend, name: 'JavaScript' },
    { layer: TechLayer.Frontend, name: 'CSS' },
  ],
  repositories: [
    { role: RepositoryRole.Application, name: 'Fantasy_Cards', stack: 'React', url: `${GITHUB_BASE_URL}/Fantasy_Cards` },
  ],
  links: [{ label: 'Play the game', url: 'https://fantasy_cards.surge.sh/' }],
  screenshots: [
    { src: `${IMAGES}/intro.png`, caption: 'Intro screen' },
    { src: `${IMAGES}/easy.png`, caption: 'Easy mode' },
    { src: `${IMAGES}/normal.png`, caption: 'Normal mode' },
  ],
};
