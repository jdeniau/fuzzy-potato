import * as dracula from '../theme/dracula.json';
import * as visualStudio from '../theme/visualStudio.json';

const THEME_LIST_AS_ARRAY = [dracula, visualStudio];

export let THEME_LIST = {};
THEME_LIST_AS_ARRAY.forEach(t => {
  THEME_LIST[t.name] = t;
});

export const DEFAULT_THEME = THEME_LIST_AS_ARRAY[0];

interface TmTheme {
  readonly name: string;
  readonly author?: string;
  readonly settings: TmThemeSetting[];
}

interface TmThemeSetting {
  readonly scope?: string | string[];
  readonly settings: Object;
}

interface TmThemeScopedSetting extends TmThemeSetting {
  readonly scope: string | string[];
}

interface TmThemeGlobalSetting extends TmThemeSetting {
  readonly scope: undefined;
}

function isScopedSetting(o: { scope?: any; settings?: any }): boolean {
  return o.scope && o.settings;
}

function isUnscopedSetting(o: { scope?: any; settings?: any }): boolean {
  return !o.scope && o.settings;
}

export function getColor(
  currentTheme: TmTheme,
  scopeToFind: string,
  settingToFind: string
): string {
  // if (!currentTheme || !currentTheme.settings) {
  //   return '';
  // }

  const item = <TmThemeScopedSetting>(
    currentTheme.settings
      .filter(isScopedSetting)
      .find(({ scope }: TmThemeSetting) => {
        if (Array.isArray(scope)) {
          return scope.includes(scopeToFind);
        }
        return scope === scopeToFind;
      })
  );

  if (!item) {
    throw new Error(`color not found for scope "${scopeToFind}"`);
  }

  return item.settings[settingToFind];
}

export function getSetting(currentTheme: TmTheme, key: string): string {
  const settings = <TmThemeGlobalSetting[]>(
    currentTheme.settings.filter(isUnscopedSetting)
  );

  if (!settings) {
    throw new Error(`color not found settings`);
  }

  return settings[0].settings[key];
}
