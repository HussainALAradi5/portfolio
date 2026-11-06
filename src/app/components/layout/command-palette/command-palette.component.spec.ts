import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { APP_ICONS } from '../../../constants/ui/icons.constants';
import { KEY } from '../../../constants/ui/keyboard.constants';
import { CommandPaletteService } from '../../../services/ui/command-palette/command-palette.service';
import { CommandPaletteComponent } from './command-palette.component';

describe('CommandPaletteComponent', () => {
  beforeEach(async () => {
    // jsdom has no modal dialogs; mimic the browser: open, then close and fire "close".
    HTMLDialogElement.prototype.showModal = function (this: HTMLDialogElement) {
      this.open = true;
    };
    HTMLDialogElement.prototype.close = function (this: HTMLDialogElement) {
      this.open = false;
      this.dispatchEvent(new Event('close'));
    };
    await TestBed.configureTestingModule({
      imports: [CommandPaletteComponent],
      providers: [provideRouter([]), provideIcons(APP_ICONS)],
    }).compileComponents();
  });

  const render = async () => {
    const fixture = TestBed.createComponent(CommandPaletteComponent);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    const dialog = element.querySelector('dialog')!;
    const input = element.querySelector('input')!;
    const settle = () => fixture.whenStable();
    const press = async (key: string, target: EventTarget = input, init: KeyboardEventInit = {}) => {
      target.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, ...init }));
      await settle();
    };
    const type = async (value: string) => {
      input.value = value;
      input.dispatchEvent(new Event('input'));
      await settle();
    };
    const options = () => [...element.querySelectorAll<HTMLElement>('[role="option"]')];
    const active = () => element.querySelector('[role="option"][aria-selected="true"]')?.textContent?.trim();
    return { dialog, press, type, options, active };
  };

  it('opens with Ctrl + K and closes with it again', async () => {
    const { dialog, press } = await render();
    await press('k', document, { ctrlKey: true });
    expect(dialog.open).toBe(true);
    await press('k', document, { ctrlKey: true });
    expect(dialog.open).toBe(false);
  });

  it('filters as you type and says when nothing matches', async () => {
    const { dialog, press, type, options } = await render();
    await press('k', document, { metaKey: true });
    await type('duck');
    expect(options().map((option) => option.textContent)).toEqual([expect.stringContaining('Duck Street')]);
    await type('zzzz');
    expect(options()).toHaveLength(0);
    expect(dialog.textContent).toContain('zzzz');
  });

  it('moves the highlight with the arrows and runs it with Enter, closing the palette', async () => {
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigateByUrl').mockResolvedValue(true);
    const { dialog, press, active } = await render();
    TestBed.inject(CommandPaletteService).open();
    await press(KEY.arrowDown);
    expect(active()).toContain('Projects');
    await press(KEY.arrowUp);
    expect(active()).toContain('Home');
    await press(KEY.enter);
    expect(navigate).toHaveBeenCalledWith('/');
    expect(dialog.open).toBe(false);
  });

  it('closes when the dialog closes itself, such as on Escape', async () => {
    const { dialog } = await render();
    const palette = TestBed.inject(CommandPaletteService);
    palette.open();
    await TestBed.inject(Router).navigateByUrl('/').catch(() => undefined);
    dialog.close();
    expect(palette.isOpen()).toBe(false);
  });
});
