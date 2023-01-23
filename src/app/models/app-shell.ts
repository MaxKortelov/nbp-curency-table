export interface Themes {
  name: string;
  value: themeList;
}

export enum themeList {
  LIGHT = 'light',
  DARK = 'dark'
}

export function initialThemes(): Themes[] {
  return [
    { name: 'Ciemny', value: themeList.DARK },
    { name: 'Jasny', value: themeList.LIGHT }
  ];
}
