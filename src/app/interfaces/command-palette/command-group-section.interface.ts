import { CommandGroup } from '../../enums/command-palette/command-group.enum';
import { PaletteCommand } from './palette-command.interface';

export interface CommandGroupSection {
  group: CommandGroup;
  label: string;
  commands: readonly PaletteCommand[];
}
