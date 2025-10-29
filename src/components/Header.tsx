import { Volume2, VolumeX, Sun, Moon, Settings } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getThemeClasses } from '../lib/theme';

export function Header() {
  const { state, dispatch } = useApp();
  const theme = getThemeClasses();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 pointer-events-none">
      <div className={`w-full max-w-5xl ${theme.background} bg-opacity-80 backdrop-blur-md border ${theme.border} rounded-full shadow-lg px-6 py-3 flex items-center justify-between pointer-events-auto ${theme.transition}`}>
        <div className="flex items-center gap-2">
          <h1 className={`text-lg font-semibold ${theme.text.primary} tracking-wide ${theme.transition}`}>电子念珠</h1>
        </div>

        <div className={`flex items-center gap-1 ${theme.backgroundDark} bg-opacity-40 rounded-full px-1 py-1 ${theme.transition}`}>
          <button
            onClick={() => dispatch({ type: 'TOGGLE_AUDIO' })}
            className={`p-2 rounded-full ${theme.button.hover} transition-all duration-200`}
            aria-label={state.audioEnabled ? 'Mute audio' : 'Unmute audio'}
          >
            {state.audioEnabled ? (
              <Volume2 className={`w-5 h-5 ${theme.text.tertiary} ${theme.transition}`} />
            ) : (
              <VolumeX className={`w-5 h-5 ${theme.text.secondary} ${theme.transition}`} />
            )}
          </button>

          <button
            onClick={() =>
              dispatch({
                type: 'SET_BRIGHTNESS',
                payload: state.brightnessMode === 'normal' ? 'dimmed' : 'normal',
              })
            }
            className={`p-2 rounded-full ${theme.button.hover} transition-all duration-200`}
            aria-label={`Switch to ${state.brightnessMode === 'normal' ? 'dimmed' : 'normal'} mode`}
          >
            {state.brightnessMode === 'normal' ? (
              <Sun className={`w-5 h-5 ${theme.text.tertiary} ${theme.transition}`} />
            ) : (
              <Moon className={`w-5 h-5 ${theme.text.tertiary} ${theme.transition}`} />
            )}
          </button>

          <button
            onClick={() => dispatch({ type: 'TOGGLE_SETTINGS' })}
            className={`p-2 rounded-full ${theme.button.hover} transition-all duration-200`}
            aria-label="Open settings"
          >
            <Settings className={`w-5 h-5 ${theme.text.tertiary} ${theme.transition}`} />
          </button>
        </div>
      </div>
    </header>
  );
}
