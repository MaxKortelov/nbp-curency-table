import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { themeList } from '../models/app-shell';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  switchTheme(theme: themeList): void {
    let themeLink = this.document.getElementById('app-theme') as HTMLLinkElement;

    if (themeLink) {
      themeLink.href = theme + '.css';
    }
  }
}
