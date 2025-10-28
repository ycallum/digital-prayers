import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import type { AppState, AppAction, PresetType } from '../types';
import { storage, debounce } from '../lib/storage';

const PRESET_COUNTS: Record<PresetType, number> = {
  full: 108,
  half: 54,
  short: 27,
  custom: 108,
};

const initialState: AppState = {
  currentCount: 0,
  totalBeads: 108,
  currentRound: 1,
  sessionStartTime: null,
  isSessionActive: false,
  audioEnabled: true,
  audioVolume: 70,
  brightnessMode: 'normal',
  selectedPreset: 'full',
  customBeadCount: 108,
  showSettings: false,
  isCompleting: false,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'INCREMENT_COUNT': {
      const newCount = state.currentCount + 1;

      if (newCount >= state.totalBeads) {
        return {
          ...state,
          currentCount: state.totalBeads,
          isCompleting: true,
        };
      }

      return {
        ...state,
        currentCount: newCount,
        isSessionActive: true,
        sessionStartTime: state.sessionStartTime || Date.now(),
      };
    }

    case 'DECREMENT_COUNT':
      return {
        ...state,
        currentCount: Math.max(0, state.currentCount - 1),
      };

    case 'RESET_COUNT':
      return {
        ...state,
        currentCount: 0,
      };

    case 'RESET_SESSION':
      return {
        ...state,
        currentCount: 0,
        currentRound: 1,
        sessionStartTime: null,
        isSessionActive: false,
      };

    case 'SET_TOTAL_BEADS':
      return {
        ...state,
        totalBeads: action.payload,
        currentCount: 0,
      };

    case 'SET_PRESET': {
      const preset = action.payload;
      const totalBeads = preset === 'custom' ? state.customBeadCount : PRESET_COUNTS[preset];
      return {
        ...state,
        selectedPreset: preset,
        totalBeads,
        currentCount: 0,
      };
    }

    case 'TOGGLE_AUDIO':
      return {
        ...state,
        audioEnabled: !state.audioEnabled,
      };

    case 'SET_VOLUME':
      return {
        ...state,
        audioVolume: Math.max(0, Math.min(100, action.payload)),
      };

    case 'SET_BRIGHTNESS':
      return {
        ...state,
        brightnessMode: action.payload,
      };

    case 'START_SESSION':
      return {
        ...state,
        isSessionActive: true,
        sessionStartTime: state.sessionStartTime || Date.now(),
      };

    case 'END_SESSION':
      return {
        ...state,
        isSessionActive: false,
      };

    case 'COMPLETE_ROUND':
      return {
        ...state,
        currentCount: 0,
        currentRound: state.currentRound + 1,
        isCompleting: false,
      };

    case 'TOGGLE_SETTINGS':
      return {
        ...state,
        showSettings: !state.showSettings,
      };

    case 'LOAD_STATE':
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

const debouncedSave = debounce<[AppState]>((state: AppState) => {
  storage.save(state);
}, 500);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const savedState = storage.load();
    if (savedState) {
      dispatch({ type: 'LOAD_STATE', payload: savedState });
    }
  }, []);

  useEffect(() => {
    debouncedSave(state);
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
