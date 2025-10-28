import { Volume2, VolumeX, Sun, Moon, Settings } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function Header() {
  const { state, dispatch } = useApp();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 pointer-events-none">
      <div className="w-full max-w-5xl bg-parchment/80 backdrop-blur-md border border-zen-200/60 rounded-full shadow-lg shadow-zen-900/5 px-6 py-3 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold text-zen-800 tracking-wide">电子念珠</h1>
        </div>

        <div className="flex items-center gap-1 bg-parchment-dark/40 rounded-full px-1 py-1">
          <button
            onClick={() => dispatch({ type: 'TOGGLE_AUDIO' })}
            className="p-2 rounded-full hover:bg-zen-100/80 transition-all duration-200"
            aria-label={state.audioEnabled ? 'Mute audio' : 'Unmute audio'}
          >
            {state.audioEnabled ? (
              <Volume2 className="w-5 h-5 text-zen-600" />
            ) : (
              <VolumeX className="w-5 h-5 text-zen-400" />
            )}
          </button>

          <button
            onClick={() =>
              dispatch({
                type: 'SET_BRIGHTNESS',
                payload: state.brightnessMode === 'normal' ? 'dimmed' : 'normal',
              })
            }
            className="p-2 rounded-full hover:bg-zen-100/80 transition-all duration-200"
            aria-label={`Switch to ${state.brightnessMode === 'normal' ? 'dimmed' : 'normal'} mode`}
          >
            {state.brightnessMode === 'normal' ? (
              <Sun className="w-5 h-5 text-zen-600" />
            ) : (
              <Moon className="w-5 h-5 text-zen-600" />
            )}
          </button>

          <button
            onClick={() => dispatch({ type: 'TOGGLE_SETTINGS' })}
            className="p-2 rounded-full hover:bg-zen-100/80 transition-all duration-200"
            aria-label="Open settings"
          >
            <Settings className="w-5 h-5 text-zen-600" />
          </button>
        </div>
      </div>
    </header>
  );
}
