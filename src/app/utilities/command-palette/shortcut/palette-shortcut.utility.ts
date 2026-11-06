import {
  APPLE_PLATFORM_PATTERN,
  PALETTE_SHORTCUT_KEY,
  PALETTE_SHORTCUT_LABEL,
} from '../../../constants/command-palette/command-palette.constants';

/** "⌘K" on Apple devices, "Ctrl K" elsewhere. */
export function paletteShortcutLabel(userAgent: string): string {
  return APPLE_PLATFORM_PATTERN.test(userAgent) ? PALETTE_SHORTCUT_LABEL.apple : PALETTE_SHORTCUT_LABEL.other;
}

/** True for Ctrl + K or Cmd + K, without Shift or Alt. */
export function isPaletteShortcut(event: KeyboardEvent): boolean {
  return (
    (event.ctrlKey || event.metaKey) &&
    !event.shiftKey &&
    !event.altKey &&
    event.key.toLowerCase() === PALETTE_SHORTCUT_KEY
  );
}
