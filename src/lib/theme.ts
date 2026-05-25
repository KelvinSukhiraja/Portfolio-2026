export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "portfolio-theme";

export const DEFAULT_THEME: Theme = "dark";

export function getStoredTheme(): Theme | null {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  return stored === "light" || stored === "dark" ? stored : null;
}

export function resolveTheme(): Theme {
  return getStoredTheme() ?? DEFAULT_THEME;
}

export function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
}
