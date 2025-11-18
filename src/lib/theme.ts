import type { ThemeType } from '../types';

/**
 * Theme background colors for meta theme-color tag
 * These match the --color-background values in index.css
 */
const THEME_COLORS: Record<ThemeType, string> = {
  default: '#F5F1E8',
  warm: '#FFFCF7',
  night: '#0F172A',
};

/**
 * Returns the CSS class name for the current theme
 * This class is applied to the root element to activate theme-specific CSS variables
 */
export function getThemeClassName(theme: ThemeType): string {
  return `theme-${theme}`;
}

/**
 * Returns the background color for the given theme
 * Used for meta theme-color tag
 */
export function getThemeColor(theme: ThemeType): string {
  return THEME_COLORS[theme];
}

/**
 * Applies the theme class to the document root element
 * This triggers the CSS custom property updates defined in index.css
 * Also updates the meta theme-color tag for mobile browser chrome
 */
export function applyTheme(theme: ThemeType): void {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  const allThemes: ThemeType[] = ['default', 'warm', 'night'];

  // Update theme class
  allThemes.forEach((t) => {
    root.classList.remove(`theme-${t}`);
  });
  root.classList.add(`theme-${theme}`);

  // Update meta theme-color for mobile browser chrome
  let metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (!metaThemeColor) {
    metaThemeColor = document.createElement('meta');
    metaThemeColor.setAttribute('name', 'theme-color');
    document.head.appendChild(metaThemeColor);
  }
  metaThemeColor.setAttribute('content', getThemeColor(theme));
}

/**
 * Returns utility class names that reference CSS custom properties
 * These classes are defined in index.css and use var(--color-*) values
 */
export interface ThemeClasses {
  background: string;
  backgroundDark: string;
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  accent: {
    primary: string;
    secondary: string;
  };
  progress: string;
  progressGlow: string;
  ring: string;
  ringBackground: string;
  button: {
    background: string;
    hover: string;
  };
  bead: {
    inactive: string;
    active: string;
  };
  border: string;
  transition: string;
}

/**
 * Returns consistent utility class names that work with all themes
 * The actual colors are controlled by CSS variables set by the theme class
 */
export function getThemeClasses(): ThemeClasses {
  return {
    background: 'bg-theme',
    backgroundDark: 'bg-theme-dark',
    text: {
      primary: 'text-theme-primary',
      secondary: 'text-theme-secondary',
      tertiary: 'text-theme-tertiary',
    },
    accent: {
      primary: 'text-theme-accent',
      secondary: 'text-theme-accent-secondary',
    },
    progress: 'text-theme-progress',
    progressGlow: 'text-theme-progress-glow',
    ring: 'stroke-theme-ring',
    ringBackground: 'stroke-theme-ring-bg',
    button: {
      background: 'bg-theme-button',
      hover: 'hover:bg-theme-button-hover',
    },
    bead: {
      inactive: 'bg-theme-bead-inactive',
      active: 'bg-theme-bead-active',
    },
    border: 'border-theme',
    transition: 'transition-theme',
  };
}
