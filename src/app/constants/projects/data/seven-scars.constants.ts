import { ProjectStatus } from '../../../enums/projects/project-status.enum';
import { ProjectTier } from '../../../enums/projects/project-tier.enum';
import { TechLayer } from '../../../enums/projects/tech-layer.enum';
import { Project } from '../../../interfaces/projects/project.interface';
import { PROJECT_IMAGE_BASE } from '../project-paths.constants';

const IMAGES = `${PROJECT_IMAGE_BASE}/seven-scars`;

/**
 * In beta. The code stays private and the Android version will be a paid Google Play app,
 * so only the free web beta is linked and no repositories are listed.
 */
export const SEVEN_SCARS_PROJECT: Project = {
  slug: 'seven-scars',
  name: 'Seven Scars',
  tagline: 'Cinematic 2D action brawler, playable in the browser (beta)',
  domain: 'Game',
  icon: 'lucideSwords',
  tier: ProjectTier.Game,
  status: ProjectStatus.InProgress,
  period: '2026',
  summary:
    'An original side-scrolling brawler told like a comic: eight chapters of street fights, chases and hazard runs, ' +
    'bosses with their own arena tricks, a ride in every chapter and a story with choices and several endings. ' +
    'It runs in the browser on desktop, tablet and phone with no server, and an Android version is being prepared for Google Play.',
  highlights: [
    'Eight playable chapters with upper and lower routes, secret rooms, challenge doors and sealed gates to hidden bosses.',
    'Combat with combos, heavy attacks, guns, dodges, grabs, throws and executions, plus 20 unlockable weapons and 8 abilities.',
    '23 bosses (main, mini and hidden) with phases and arena tricks that are hinted less on harder difficulties.',
    'A ride in every chapter: speedboat, motorbike, locomotive, gunboat, exosuit, gyrocopter, war horse and dragon.',
    'Story told in comic-panel cutscenes, with Finish-or-Spare choices, three endings and a true ending.',
    'Three art styles (Comic, Pixel and Noir) that restyle the whole screen, menus and HUD included.',
    'Four difficulties that change enemies, bosses, ammo and drops, plus Boss Rush, Endless and Daily modes.',
    'Keyboard, gamepad and touch controls; installable as an app (PWA); all sound and music generated in code.',
  ],
  tech: [
    { layer: TechLayer.Frontend, name: 'Phaser 3' },
    { layer: TechLayer.Frontend, name: 'React 18' },
    { layer: TechLayer.Frontend, name: 'TypeScript' },
    { layer: TechLayer.Frontend, name: 'Vite' },
    { layer: TechLayer.Frontend, name: 'PWA' },
    { layer: TechLayer.Mobile, name: 'Flutter' },
    { layer: TechLayer.Mobile, name: 'Flame' },
    { layer: TechLayer.Data, name: 'Local storage saves' },
  ],
  repositories: [],
  links: [{ label: 'Play the beta', url: 'https://hussainalaradi5.github.io/seven-scars-play/' }],
  // Concept art from the game's design repository: the store key art, chapter covers and ride spreads.
  screenshots: [
    { src: `${IMAGES}/01-key-art.webp`, caption: 'Key art' },
    { src: `${IMAGES}/02-cover-burning-docks.webp`, caption: 'Chapter 1 cover: The Burning Docks' },
    { src: `${IMAGES}/03-cover-chapter-2.webp`, caption: 'Chapter 2 cover' },
    { src: `${IMAGES}/04-ride-speedboat.webp`, caption: 'Ride spread: speedboat escape' },
    { src: `${IMAGES}/05-ride-motorbike.webp`, caption: 'Ride spread: motorbike chase' },
    { src: `${IMAGES}/06-ride-train-roof.webp`, caption: 'Ride spread: train-roof fight' },
  ],
};
