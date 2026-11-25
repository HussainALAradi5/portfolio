import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { SITE_PROFILE } from '../../../config/site/site.config';
import { UI_TEXT } from '../../../constants/common/ui-text.constants';
import { PROJECTS } from '../../../constants/projects/projects.constants';
import { CommandGroup } from '../../../enums/command-palette/command-group.enum';
import { FeedbackKind } from '../../../enums/ui/feedback-kind.enum';
import { ThemeMode } from '../../../enums/ui/theme-mode.enum';
import { CvDownloadService } from '../../site/cv-download/cv-download.service';
import { ClipboardService } from '../clipboard/clipboard.service';
import { FeedbackService } from '../feedback/feedback.service';
import { ThemeService } from '../theme/theme.service';
import { CommandPaletteService } from './command-palette.service';

describe('CommandPaletteService', () => {
  const download = vi.fn();
  const copy = vi.fn<(text: string) => Promise<boolean>>();
  const notify = vi.fn();

  beforeEach(() => {
    download.mockReset();
    copy.mockReset();
    notify.mockReset();
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: CvDownloadService, useValue: { download } },
        { provide: ClipboardService, useValue: { copy } },
        { provide: FeedbackService, useValue: { notify } },
      ],
    });
  });

  const service = () => TestBed.inject(CommandPaletteService);
  const find = (id: string) =>
    service()
      .commands()
      .find((command) => command.id === id)!;

  it('offers every page, every project and the actions', () => {
    const groups = service()
      .commands()
      .map((command) => command.group);
    expect(groups.filter((group) => group === CommandGroup.Pages)).toHaveLength(4);
    expect(groups.filter((group) => group === CommandGroup.Projects)).toHaveLength(PROJECTS.length);
    expect(groups.filter((group) => group === CommandGroup.Actions)).toHaveLength(3);
  });

  it('navigates to a project and downloads the CV', () => {
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    find(`project-${PROJECTS[0].slug}`).run();
    expect(navigate).toHaveBeenCalledWith(['/', 'projects', PROJECTS[0].slug]);
    find('download-cv').run();
    expect(download).toHaveBeenCalledOnce();
  });

  it('copies the email address and confirms it', async () => {
    copy.mockResolvedValue(true);

    find('copy-email').run();
    await vi.waitFor(() => expect(notify).toHaveBeenCalled());

    expect(copy).toHaveBeenCalledWith(SITE_PROFILE.email);
    expect(notify).toHaveBeenCalledWith(FeedbackKind.Success, UI_TEXT.palette.emailCopied);
  });

  it('shows the email address when it cannot be copied', async () => {
    copy.mockResolvedValue(false);

    find('copy-email').run();
    await vi.waitFor(() => expect(notify).toHaveBeenCalled());

    expect(notify).toHaveBeenCalledWith(FeedbackKind.Error, `${UI_TEXT.palette.copyFailed} ${SITE_PROFILE.email}`);
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
