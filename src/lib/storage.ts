import type { AppState, StoredState } from '../types';

const STORAGE_KEY = 'digital-mala-state';
const VERSION = '1.0.0';

export const storage = {
  save: (state: AppState): void => {
    try {
      const storedState: StoredState = {
        version: VERSION,
        state,
        lastUpdated: Date.now(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(storedState));
    } catch (error) {
      console.error('Failed to save state:', error);
    }
  },

  load: (): Partial<AppState> | null => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return null;

      const parsed: StoredState = JSON.parse(stored);

      if (parsed.version !== VERSION) {
        console.warn('State version mismatch, resetting...');
        storage.clear();
        return null;
      }

      return parsed.state;
    } catch (error) {
      console.error('Failed to load state:', error);
      storage.clear();
      return null;
    }
  },

  clear: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear state:', error);
    }
  },
};

export const debounce = <T extends unknown[]>(
  func: (...args: T) => void,
  wait: number
): ((...args: T) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: T) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
