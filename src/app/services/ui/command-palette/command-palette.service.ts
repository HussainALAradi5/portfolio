import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { UI_TEXT } from '../../../constants/common/ui-text.constants';
import { ROUTE_PATHS } from '../../../constants/routes/route-paths.constants';
import { ICON } from '../../../constants/ui/icons.constants';
import { CommandGroup } from '../../../enums/command-palette/command-group.enum';
import { ThemeMode } from '../../../enums/ui/theme-mode.enum';
import { PaletteCommand } from '../../../interfaces/command-palette/palette-command.interface';
import { ProjectService } from '../../projects/project/project.service';
import { CvDownloadService } from '../../site/cv-download/cv-download.service';
import { ThemeService } from '../theme/theme.service';

/** Open state of the command palette and the commands it can run: pages, projects and actions. */
@Injectable({ providedIn: 'root' })
export class CommandPaletteService {
  private readonly router = inject(Router);
  private readonly theme = inject(ThemeService);
  private readonly cvDownload = inject(CvDownloadService);
  private readonly projects = inject(ProjectService).findAll();

  readonly isOpen = signal(false);

  private readonly pageCommands: readonly PaletteCommand[] = [
    this.pageCommand('home', UI_TEXT.palette.home, ICON.home, ROUTE_PATHS.home),
    this.pageCommand('projects', UI_TEXT.palette.projects, 'lucideLayers', ROUTE_PATHS.projects),
    this.pageCommand('experience', UI_TEXT.palette.experience, 'lucideBriefcase', ROUTE_PATHS.experience),
    this.pageCommand('skills', UI_TEXT.palette.skills, 'lucideStar', ROUTE_PATHS.skills),
  ];

  private readonly projectCommands: readonly PaletteCommand[] = this.projects.map((project) => ({
    id: `project-${project.slug}`,
    label: project.name,
    hint: project.tagline,
    group: CommandGroup.Projects,
    icon: project.icon,
    keywords: [project.domain, ...project.tech.map((tech) => tech.name)],
    run: () => void this.router.navigate(['/', ROUTE_PATHS.projects, project.slug]),
  }));

  /** Actions are computed so the theme command names the theme it will switch to. */
  private readonly actionCommands = computed<readonly PaletteCommand[]>(() => [
    {
      id: 'download-cv',
      label: UI_TEXT.palette.downloadCv,
      group: CommandGroup.Actions,
      icon: ICON.download,
      keywords: ['resume', 'cv', 'pdf'],
      run: () => void this.cvDownload.download(),
    },
    {
      id: 'toggle-theme',
      label: this.theme.mode() === ThemeMode.Dark ? UI_TEXT.palette.switchToLight : UI_TEXT.palette.switchToDark,
      group: CommandGroup.Actions,
      icon: ICON.theme,
      keywords: ['theme', 'dark', 'light', 'mode'],
      run: () => this.theme.toggle(),
    },
  ]);

  readonly commands = computed<readonly PaletteCommand[]>(() => [
    ...this.pageCommands,
    ...this.projectCommands,
    ...this.actionCommands(),
  ]);

  open(): void {
    this.isOpen.set(true);
  }

  close(): void {
    this.isOpen.set(false);
  }

  toggle(): void {
    this.isOpen.update((isOpen) => !isOpen);
  }

  private pageCommand(id: string, label: string, icon: PaletteCommand['icon'], path: string): PaletteCommand {
    return {
      id: `page-${id}`,
      label,
      group: CommandGroup.Pages,
      icon,
      keywords: ['page'],
      run: () => void this.router.navigateByUrl(`/${path}`),
    };
  }
}
