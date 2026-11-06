import { TestBed } from '@angular/core/testing';
import { provideIcons } from '@ng-icons/core';
import { UI_TEXT } from '../../../constants/common/ui-text.constants';
import { APP_ICONS } from '../../../constants/ui/icons.constants';
import { CvDownloadService } from '../../../services/site/cv-download/cv-download.service';
import { CvDownloadButtonComponent } from './cv-download-button.component';

describe('CvDownloadButtonComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CvDownloadButtonComponent],
      providers: [provideIcons(APP_ICONS)],
    }).compileComponents();
  });

  const render = async () => {
    const fixture = TestBed.createComponent(CvDownloadButtonComponent);
    await fixture.whenStable();
    return { fixture, button: (fixture.nativeElement as HTMLElement).querySelector('button')! };
  };

  it('shows the download label and is enabled when idle', async () => {
    const { button } = await render();
    expect(button.textContent).toContain(UI_TEXT.cv.download);
    expect(button.disabled).toBe(false);
  });

  it('shows the preparing label and is disabled while downloading', async () => {
    TestBed.inject(CvDownloadService).isDownloading.set(true);
    const { fixture, button } = await render();
    fixture.detectChanges();
    expect(button.textContent).toContain(UI_TEXT.cv.preparing);
    expect(button.disabled).toBe(true);
    expect(button.getAttribute('aria-busy')).toBe('true');
  });
});
