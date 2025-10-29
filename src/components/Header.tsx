import { Volume2, VolumeX, Sun, Moon, Settings } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getThemeColors } from '../lib/theme';

export function Header() {
  const { state, dispatch } = useApp();
  const themeColors = getThemeColors(state.theme);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 pointer-events-none">
      <div className={`w-full max-w-5xl ${themeColors.background}/80 backdrop-blur-md border ${themeColors.text.secondary}/30 rounded-full shadow-lg px-6 py-3 flex items-center justify-between pointer-events-auto transition-colors duration-500`}>
        <div className="flex items-center gap-2">
          <h1 className={`text-lg font-semibold ${themeColors.text.primary} tracking-wide transition-colors duration-500`}>电子念珠</h1>
        </div>

        <div className={`flex items-center gap-1 ${themeColors.backgroundDark}/40 rounded-full px-1 py-1 transition-colors duration-500`}>
          <button
            onClick={() => dispatch({ type: 'TOGGLE_AUDIO' })}
            className={`p-2 rounded-full ${themeColors.button.hover} transition-all duration-200`}
            aria-label={state.audioEnabled ? 'Mute audio' : 'Unmute audio'}
          >
            {state.audioEnabled ? (
              <Volume2 className={`w-5 h-5 ${themeColors.text.tertiary}`} />
            ) : (
              <VolumeX className={`w-5 h-5 ${themeColors.text.secondary}`} />
            )}
          </button>

          <button
            onClick={() =>
              dispatch({
                type: 'SET_BRIGHTNESS',
                payload: state.brightnessMode === 'normal' ? 'dimmed' : 'normal',
              })
            }
            className={`p-2 rounded-full ${themeColors.button.hover} transition-all duration-200`}
            aria-label={`Switch to ${state.brightnessMode === 'normal' ? 'dimmed' : 'normal'} mode`}
          >
            {state.brightnessMode === 'normal' ? (
              <Sun className={`w-5 h-5 ${themeColors.text.tertiary}`} />
            ) : (
              <Moon className={`w-5 h-5 ${themeColors.text.tertiary}`} />
            )}
          </button>

          <button
            onClick={() => dispatch({ type: 'TOGGLE_SETTINGS' })}
            className={`p-2 rounded-full ${themeColors.button.hover} transition-all duration-200`}
            aria-label="Open settings"
          >
            <Settings className={`w-5 h-5 ${themeColors.text.tertiary}`} />
          </button>
        </div>
      </div>
    </header>
  );
}
