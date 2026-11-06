import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { UI_TEXT } from '../../../constants/common/ui-text.constants';
import { PROJECTS } from '../../../constants/projects/projects.constants';
import { CommandGroup } from '../../../enums/command-palette/command-group.enum';
import { ThemeMode } from '../../../enums/ui/theme-mode.enum';
import { CvDownloadService } from '../../site/cv-download/cv-download.service';
import { ThemeService } from '../theme/theme.service';
import { CommandPaletteService } from './command-palette.service';

describe('CommandPaletteService', () => {
  const download = vi.fn();

  beforeEach(() => {
    download.mockReset();
    TestBed.configureTestingModule({
      providers: [provideRouter([]), { provide: CvDownloadService, useValue: { download } }],
    });
  });

  const service = () => TestBed.inject(CommandPaletteService);
  const find = (id: string) => service().commands().find((command) => command.id === id)!;

  it('offers every page, every project and the actions', () => {
    const groups = service().commands().map((command) => command.group);
    expect(groups.filter((group) => group === CommandGroup.Pages)).toHaveLength(4);
    expect(groups.filter((group) => group === CommandGroup.Projects)).toHaveLength(PROJECTS.length);
    expect(groups.filter((group) => group === CommandGroup.Actions)).toHaveLength(2);
  });

  it('navigates to a project and downloads the CV', () => {
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    find(`project-${PROJECTS[0].slug}`).run();
    expect(navigate).toHaveBeenCalledWith(['/', 'projects', PROJECTS[0].slug]);
    find('download-cv').run();
    expect(download).toHaveBeenCalledOnce();
  });

  it('names the theme it will switch to, and switches it', () => {
    const theme = TestBed.inject(ThemeService);
    theme.mode.set(ThemeMode.Light);
    expect(find('toggle-theme').label).toBe(UI_TEXT.palette.switchToDark);
    find('toggle-theme').run();
    expect(theme.mode()).toBe(ThemeMode.Dark);
    expect(find('toggle-theme').label).toBe(UI_TEXT.palette.switchToLight);
  });

  it('opens, closes and toggles', () => {
    service().open();
    expect(service().isOpen()).toBe(true);
    service().toggle();
    expect(service().isOpen()).toBe(false);
  });
});
