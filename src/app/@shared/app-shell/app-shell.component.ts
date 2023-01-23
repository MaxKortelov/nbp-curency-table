import { Component, OnInit } from '@angular/core';

import { initialThemes, themeList, Themes } from '../../models/app-shell';
import { ThemeService } from '../../services/theme-service';

@Component({
  selector: 'app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss']
})
export class AppShellComponent implements OnInit {
  themes: Themes[] = [];
  selectedTheme: Themes = initialThemes()[0];

  constructor(private themeService: ThemeService) {
    this.themes = initialThemes();
  }

  ngOnInit(): void {
    this.handleChangeTheme(this.selectedTheme.value);
  }

  handleChangeTheme(theme: themeList): void {
    this.themeService.switchTheme(theme);
  }
}
