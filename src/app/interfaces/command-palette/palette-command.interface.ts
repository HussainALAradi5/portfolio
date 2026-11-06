import { CommandGroup } from '../../enums/command-palette/command-group.enum';
import { AppIconName } from '../../types/ui/app-icon-name.type';

export interface PaletteCommand {
  id: string;
  label: string;
  /** Short grey text after the label, such as a project's tagline. */
  hint?: string;
  group: CommandGroup;
  icon: AppIconName;
  /** Extra words that should find this command, such as a project's technologies. */
  keywords: readonly string[];
  run: () => void;
}
