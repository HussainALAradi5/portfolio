import { PaletteCommand } from '../../../interfaces/command-palette/palette-command.interface';

/**
 * Commands whose label, hint or keywords contain every word of the query, ignoring case.
 * An empty query returns every command.
 */
export function filterCommands(commands: readonly PaletteCommand[], query: string): readonly PaletteCommand[] {
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) {
    return commands;
  }
  return commands.filter((command) => {
    const haystack = [command.label, command.hint ?? '', ...command.keywords].join(' ').toLowerCase();
    return words.every((word) => haystack.includes(word));
  });
}
