export type PresetType = 'full' | 'half' | 'short' | 'custom';
export type BrightnessMode = 'normal' | 'dimmed';
export type VisualizationMode = 'ring' | 'beads';
export type ThemeType = 'default' | 'warm' | 'night';

export interface AppState {
  currentCount: number;
  totalBeads: number;
  currentRound: number;
  sessionStartTime: number | null;
  isSessionActive: boolean;
  audioEnabled: boolean;
  audioVolume: number;
  brightnessMode: BrightnessMode;
  selectedPreset: PresetType;
  customBeadCount: number;
  showSettings: boolean;
  isCompleting: boolean;
  visualizationMode: VisualizationMode;
  theme: ThemeType;
}

export type AppAction =
  | { type: 'INCREMENT_COUNT' }
  | { type: 'DECREMENT_COUNT' }
  | { type: 'RESET_COUNT' }
  | { type: 'RESET_SESSION' }
  | { type: 'SET_TOTAL_BEADS'; payload: number }
  | { type: 'SET_PRESET'; payload: PresetType }
  | { type: 'TOGGLE_AUDIO' }
  | { type: 'SET_VOLUME'; payload: number }
  | { type: 'SET_BRIGHTNESS'; payload: BrightnessMode }
  | { type: 'START_SESSION' }
  | { type: 'END_SESSION' }
  | { type: 'COMPLETE_ROUND' }
  | { type: 'TOGGLE_SETTINGS' }
  | { type: 'SET_VISUALIZATION_MODE'; payload: VisualizationMode }
  | { type: 'SET_THEME'; payload: ThemeType }
  | { type: 'LOAD_STATE'; payload: Partial<AppState> };

export interface StoredState {
  version: string;
  state: AppState;
  lastUpdated: number;
}
