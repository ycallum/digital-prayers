import type { ThemeType } from '../types';

export interface ThemeColors {
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
    light: string;
  };
  progress: string;
  progressGlow: string;
  ring: string;
  ringBackground: string;
  button: {
    background: string;
    hover: string;
    text: string;
  };
  bead: {
    inactive: string;
    active: string;
    glow: string;
  };
}

export const themes: Record<ThemeType, ThemeColors> = {
  default: {
    background: 'bg-parchment',
    backgroundDark: 'bg-parchment-dark',
    text: {
      primary: 'text-zen-800',
      secondary: 'text-zen-500',
      tertiary: 'text-zen-600',
    },
    accent: {
      primary: 'text-jade-300',
      secondary: 'text-wood',
      light: 'text-jade-100',
    },
    progress: 'text-jade-300',
    progressGlow: 'text-gold',
    ring: 'stroke-jade-300',
    ringBackground: 'stroke-wood-light',
    button: {
      background: 'bg-zen-100',
      hover: 'hover:bg-zen-200',
      text: 'text-zen-800',
    },
    bead: {
      inactive: 'bg-wood-dark',
      active: 'bg-gold',
      glow: 'shadow-gold',
    },
  },
  warm: {
    background: 'bg-cream-50',
    backgroundDark: 'bg-cream-100',
    text: {
      primary: 'text-peach-900',
      secondary: 'text-peach-600',
      tertiary: 'text-peach-700',
    },
    accent: {
      primary: 'text-peach-500',
      secondary: 'text-cream-800',
      light: 'text-peach-200',
    },
    progress: 'text-peach-400',
    progressGlow: 'text-amber',
    ring: 'stroke-peach-400',
    ringBackground: 'stroke-cream-400',
    button: {
      background: 'bg-cream-200',
      hover: 'hover:bg-cream-300',
      text: 'text-peach-900',
    },
    bead: {
      inactive: 'bg-cream-700',
      active: 'bg-amber',
      glow: 'shadow-amber',
    },
  },
  night: {
    background: 'bg-slate-900',
    backgroundDark: 'bg-slate-800',
    text: {
      primary: 'text-slate-100',
      secondary: 'text-slate-400',
      tertiary: 'text-slate-300',
    },
    accent: {
      primary: 'text-slate-400',
      secondary: 'text-navy',
      light: 'text-slate-500',
    },
    progress: 'text-slate-400',
    progressGlow: 'text-slate-300',
    ring: 'stroke-slate-400',
    ringBackground: 'stroke-slate-700',
    button: {
      background: 'bg-slate-800',
      hover: 'hover:bg-slate-700',
      text: 'text-slate-100',
    },
    bead: {
      inactive: 'bg-slate-700',
      active: 'bg-slate-300',
      glow: 'shadow-slate-300',
    },
  },
};

export function getThemeColors(theme: ThemeType): ThemeColors {
  return themes[theme];
}
