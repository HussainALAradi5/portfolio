import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';

/** Copies text to the system clipboard; resolves to false when the browser refuses. */
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
