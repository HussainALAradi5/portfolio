import { Project } from '../../interfaces/projects/project.interface';
import { BOOKS_BUILD_MINDS_PROJECT } from './data/books-build-minds.constants';
import { CARE_TRACK_PROJECT } from './data/care-track.constants';
import { DUCK_STREET_PROJECT } from './data/duck-street.constants';
import { E_CLINIC_PROJECT } from './data/e-clinic.constants';
import { FANTASY_CARDS_PROJECT } from './data/fantasy-cards.constants';
import { FUN_TRAVELS_TOUR_PROJECT } from './data/fun-travels-tour.constants';
import { STUDIUM_PROJECT } from './data/studium.constants';
import { TASK_FLOW_PROTO_PROJECT } from './data/task-flow-proto.constants';
import { VIDEOS_WAVES_PROJECT } from './data/videos-waves.constants';

/** Display order of the portfolio. */
export const PROJECTS: readonly Project[] = [
  CARE_TRACK_PROJECT,
  E_CLINIC_PROJECT,
  FUN_TRAVELS_TOUR_PROJECT,
  BOOKS_BUILD_MINDS_PROJECT,
  TASK_FLOW_PROTO_PROJECT,
  VIDEOS_WAVES_PROJECT,
  STUDIUM_PROJECT,
  FANTASY_CARDS_PROJECT,
  DUCK_STREET_PROJECT,
];
