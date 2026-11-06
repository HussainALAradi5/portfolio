import { TestBed } from '@angular/core/testing';
import { SITE_PROFILE } from '../../../config/site/site.config';
import { CvDownloadService } from './cv-download.service';

describe('CvDownloadService', () => {
  let service: CvDownloadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CvDownloadService);
    vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:cv');
    vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => undefined);
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => undefined);
  });

  afterEach(() => vi.restoreAllMocks());

  it('is busy while the file is fetched and idle afterwards', async () => {
    let finishFetch!: (response: Response) => void;
    vi.spyOn(globalThis, 'fetch').mockReturnValue(new Promise((resolve) => (finishFetch = resolve)));

    const download = service.download();
    expect(service.isDownloading()).toBe(true);

    finishFetch(new Response(new Blob(['pdf'])));
    await download;
    expect(service.isDownloading()).toBe(false);
    expect(HTMLAnchorElement.prototype.click).toHaveBeenCalledOnce();
  });

  it('ignores clicks while a download is running', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(new Blob(['pdf'])));

    await Promise.all([service.download(), service.download()]);

    expect(fetchSpy).toHaveBeenCalledOnce();
    expect(fetchSpy).toHaveBeenCalledWith(SITE_PROFILE.cv.url);
  });

  it('opens the file directly when the fetch fails', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(null, { status: 404 }));
    const openSpy = vi.spyOn(window, 'open').mockReturnValue(null);

    await service.download();

    expect(openSpy).toHaveBeenCalledWith(SITE_PROFILE.cv.url, '_blank', 'noopener');
    expect(service.isDownloading()).toBe(false);
  });
});
