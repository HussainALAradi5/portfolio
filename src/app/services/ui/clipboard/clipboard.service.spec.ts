import { TestBed } from '@angular/core/testing';
import { ClipboardService } from './clipboard.service';

describe('ClipboardService', () => {
  const setClipboard = (clipboard: Partial<Clipboard> | undefined) =>
    Object.defineProperty(navigator, 'clipboard', { value: clipboard, configurable: true });

  afterEach(() => setClipboard(undefined));

  it('copies text and reports success', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    setClipboard({ writeText });
    expect(await TestBed.inject(ClipboardService).copy('hello')).toBe(true);
    expect(writeText).toHaveBeenCalledWith('hello');
  });

  it('reports failure when the browser refuses or has no clipboard', async () => {
    setClipboard({ writeText: vi.fn().mockRejectedValue(new Error('denied')) });
    expect(await TestBed.inject(ClipboardService).copy('hello')).toBe(false);
    setClipboard(undefined);
    expect(await TestBed.inject(ClipboardService).copy('hello')).toBe(false);
  });
});
