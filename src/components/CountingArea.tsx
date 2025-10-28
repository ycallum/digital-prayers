import { useRef, useState, useEffect } from 'react';
import { ProgressRing } from './ProgressRing';
import { CountDisplay } from './CountDisplay';
import { CompletionEffect } from './CompletionEffect';
import { useApp } from '../context/AppContext';
import { haptics } from '../lib/haptics';
import { audioManager } from '../lib/audio';

export function CountingArea() {
  const { state, dispatch } = useApp();
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const longPressTimer = useRef<number | null>(null);
  const [showInstruction, setShowInstruction] = useState(true);

  useEffect(() => {
    if (state.currentCount > 0) {
      setShowInstruction(false);
    }
  }, [state.currentCount]);

  useEffect(() => {
    if (state.isCompleting) {
      if (state.audioEnabled) {
        audioManager.play('bell', state.audioVolume / 100);
      }
      haptics.success();

      const timer = setTimeout(() => {
        dispatch({ type: 'COMPLETE_ROUND' });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [state.isCompleting, state.audioEnabled, state.audioVolume, dispatch]);

  const handleIncrement = () => {
    if (state.isCompleting) return;

    dispatch({ type: 'INCREMENT_COUNT' });

    if (state.audioEnabled && state.currentCount + 1 < state.totalBeads) {
      audioManager.play('click', state.audioVolume / 100);
    }
    haptics.light();
  };

  const handleDecrement = () => {
    if (state.isCompleting || state.currentCount === 0) return;

    dispatch({ type: 'DECREMENT_COUNT' });
    haptics.light();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;

    longPressTimer.current = window.setTimeout(() => {
      haptics.medium();
    }, 800);
  };

  const handleTouchMove = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartX.current;
    const deltaY = touch.clientY - touchStartY.current;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        handleIncrement();
      } else {
        handleDecrement();
      }
    } else if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
      handleIncrement();
    }
  };

  return (
    <div className="relative px-4">
      <div
        className="relative cursor-pointer touch-none select-none"
        onClick={handleIncrement}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        role="button"
        tabIndex={0}
        aria-label={`Tap to increment count. Current count: ${state.currentCount} of ${state.totalBeads}`}
      >
        <ProgressRing
          current={state.currentCount}
          total={state.totalBeads}
          size={320}
          isCompleting={state.isCompleting}
        />
        <CountDisplay
          current={state.currentCount}
          total={state.totalBeads}
          round={state.currentRound}
        />
        <CompletionEffect isVisible={state.isCompleting} />
      </div>

      {showInstruction && state.currentCount === 0 && (
        <div className="absolute -bottom-16 left-0 right-0 text-center">
          <p className="text-xs text-zen-400">轻触屏幕开始计数</p>
        </div>
      )}
    </div>
  );
}
