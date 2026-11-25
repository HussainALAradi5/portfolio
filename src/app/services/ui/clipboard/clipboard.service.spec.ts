import { TestBed } from '@angular/core/testing';
import { ClipboardService } from './clipboard.service';

describe('ClipboardService', () => {
  const installClipboard = (clipboard: Partial<Clipboard> | undefined) =>
    Object.defineProperty(navigator, 'clipboard', { value: clipboard, configurable: true });

  afterEach(() => installClipboard(undefined));

  it('copies the text', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    installClipboard({ writeText });

    await expect(TestBed.inject(ClipboardService).copy('hello')).resolves.toBe(true);
    expect(writeText).toHaveBeenCalledWith('hello');
  });

  it('reports failure when the browser refuses', async () => {
    installClipboard({ writeText: vi.fn().mockRejectedValue(new Error('denied')) });

    await expect(TestBed.inject(ClipboardService).copy('hello')).resolves.toBe(false);
  });

  it('reports failure when there is no clipboard', async () => {
    installClipboard(undefined);

    await expect(TestBed.inject(ClipboardService).copy('hello')).resolves.toBe(false);
  });
});
