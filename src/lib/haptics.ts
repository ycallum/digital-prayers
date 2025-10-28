export const haptics = {
  vibrate: (pattern: number | number[]): void => {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  },

  light: (): void => {
    haptics.vibrate(10);
  },

  medium: (): void => {
    haptics.vibrate(20);
  },

  success: (): void => {
    haptics.vibrate([50, 50, 50]);
  },
};
