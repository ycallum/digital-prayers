import type { AppState, StoredState } from '../types';

const STORAGE_KEY = 'digital-mala-state';
const VERSION = '1.0.0';

/**
 * Storage utility for persisting application state to localStorage
 * Handles versioning and error recovery automatically
 */
export const storage = {
  /**
   * Persists application state to localStorage
   * @param state - The current application state
   */
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

  /**
   * Loads application state from localStorage
   * Validates version compatibility and clears invalid data
   * @returns Partial application state or null if none exists/invalid
   */
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

  /**
   * Clears all persisted state from localStorage
   */
  clear: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear state:', error);
    }
  },
};

/**
 * Creates a debounced function that delays execution until after wait milliseconds
 * Useful for preventing excessive function calls during rapid updates
 *
 * @template T - Tuple type representing function arguments
 * @param func - The function to debounce
 * @param wait - Delay in milliseconds before executing the function
 * @returns Debounced version of the input function
 *
 * @example
 * const saveData = debounce<[string]>((data) => api.save(data), 500);
 * saveData('hello'); // Will only execute after 500ms of no further calls
 */
export function debounce<T extends unknown[]>(
  func: (...args: T) => void,
  wait: number
): (...args: T) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: T) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
