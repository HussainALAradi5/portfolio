import { CommandGroup } from '../../enums/command-palette/command-group.enum';

/** Groups in the order the palette lists them. */
export const COMMAND_GROUP_LABELS: Record<CommandGroup, string> = {
  [CommandGroup.Pages]: 'Pages',
  [CommandGroup.Projects]: 'Projects',
  [CommandGroup.Actions]: 'Actions',
};

/** Ctrl + K, or Cmd + K on Apple devices, opens the palette. */
export const PALETTE_SHORTCUT_KEY = 'k';

export const PALETTE_SHORTCUT_LABEL = {
  apple: '⌘K',
  other: 'Ctrl K',
} as const;

/** User-agent fragments that mean an Apple keyboard, where the shortcut uses Cmd. */
export const APPLE_PLATFORM_PATTERN = /Mac|iPhone|iPad|iPod/i;
