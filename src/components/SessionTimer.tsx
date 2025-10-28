import { useState, useEffect } from 'react';
import { Timer, RotateCcw } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function SessionTimer() {
  const { state, dispatch } = useApp();
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!state.sessionStartTime) {
      setElapsed(0);
      return;
    }

    const interval = setInterval(() => {
      if (!state.sessionStartTime) return;
      const now = Date.now();
      const diff = Math.floor((now - state.sessionStartTime) / 1000);
      setElapsed(diff);
    }, 1000);

    return () => clearInterval(interval);
  }, [state.sessionStartTime]);

  const handleReset = () => {
    if (state.currentCount > 0 || state.isSessionActive) {
      const confirmed = confirm('确定要重置计数和计时器吗？\n\nReset count and timer?');
      if (confirmed) {
        dispatch({ type: 'RESET_SESSION' });
      }
    }
  };

  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;

  return (
    <div className="flex flex-col items-center gap-4 mt-8">
      {state.isSessionActive && (
        <div className="flex items-center justify-center gap-2 text-sm text-zen-500">
          <Timer className="w-4 h-4" />
          <span>
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </span>
        </div>
      )}

      <button
        onClick={handleReset}
        className="px-4 py-2 rounded-lg hover:bg-zen-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 text-zen-600 text-sm"
        aria-label="Reset count and timer"
        disabled={state.currentCount === 0 && !state.isSessionActive}
      >
        <RotateCcw className="w-4 h-4" />
        <span>重置</span>
      </button>
    </div>
  );
}
