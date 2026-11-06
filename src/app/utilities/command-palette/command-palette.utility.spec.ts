import { CommandGroup } from '../../enums/command-palette/command-group.enum';
import { PaletteCommand } from '../../interfaces/command-palette/palette-command.interface';
import { filterCommands } from './filter/filter-commands.utility';
import { isPaletteShortcut, paletteShortcutLabel } from './shortcut/palette-shortcut.utility';

const command = (label: string, keywords: string[] = [], hint?: string): PaletteCommand => ({
  id: label,
  label,
  hint,
  keywords,
  group: CommandGroup.Projects,
  icon: 'lucideCode',
  run: () => undefined,
});

describe('command palette utilities', () => {
  const commands = [
    command('CareTrack', ['Spring Boot', 'Angular'], 'Multi-hospital care management platform'),
    command('Duck Street', ['JavaScript'], 'Arcade road-crossing game'),
    command('Download CV', ['resume']),
  ];

  it('returns every command for an empty query', () => {
    expect(filterCommands(commands, '   ')).toEqual(commands);
  });

  it('matches labels, hints and keywords, ignoring case, and needs every word', () => {
    expect(filterCommands(commands, 'duck').map((c) => c.label)).toEqual(['Duck Street']);
    expect(filterCommands(commands, 'spring')).toHaveLength(1);
    expect(filterCommands(commands, 'hospital angular').map((c) => c.label)).toEqual(['CareTrack']);
    expect(filterCommands(commands, 'RESUME').map((c) => c.label)).toEqual(['Download CV']);
    expect(filterCommands(commands, 'duck angular')).toHaveLength(0);
  });

  it('labels the shortcut for the platform', () => {
    expect(paletteShortcutLabel('Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0)')).toBe('⌘K');
    expect(paletteShortcutLabel('Mozilla/5.0 (Windows NT 10.0; Win64; x64)')).toBe('Ctrl K');
  });

  it('recognises Ctrl + K and Cmd + K only', () => {
    expect(isPaletteShortcut(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }))).toBe(true);
    expect(isPaletteShortcut(new KeyboardEvent('keydown', { key: 'K', metaKey: true }))).toBe(true);
    expect(isPaletteShortcut(new KeyboardEvent('keydown', { key: 'k' }))).toBe(false);
    expect(isPaletteShortcut(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, shiftKey: true }))).toBe(false);
  });
});
