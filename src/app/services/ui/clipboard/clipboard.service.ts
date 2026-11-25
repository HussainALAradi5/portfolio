import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';

/** Copies text to the clipboard; resolves to false where the browser refuses or has no clipboard. */
@Injectable({ providedIn: 'root' })
export class ClipboardService {
  private readonly document = inject(DOCUMENT);

  async copy(text: string): Promise<boolean> {
    const clipboard = this.document.defaultView?.navigator.clipboard;
    if (!clipboard) {
      return false;
    }
    try {
      await clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }
}
