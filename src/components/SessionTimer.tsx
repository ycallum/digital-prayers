import { useState, useEffect } from 'react';
import { Timer, RotateCcw } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getThemeClasses } from '../lib/theme';
import { motion } from 'framer-motion';

export function SessionTimer() {
  const { state, dispatch } = useApp();
  const theme = getThemeClasses();
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="flex flex-col items-center gap-6 mt-12 relative z-20"
    >
      {/* Zen timer display - clean and minimal */}
      <div className={`
        flex
        items-center
        justify-center
        gap-3
        px-6
        py-3
        ${theme.text.secondary}
        ${theme.transition}
      `}>
        <Timer className="w-5 h-5" strokeWidth={2} />
        <span className="text-2xl font-light tracking-wider">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </span>
      </div>

      {/* Zen reset button - subtle and elegant */}
      <motion.button
        onClick={handleReset}
        disabled={state.currentCount === 0 && !state.isSessionActive}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`
          px-6
          py-2.5
          rounded-lg
          ${theme.button.hover}
          ${theme.transition}
          disabled:opacity-40
          disabled:cursor-not-allowed
          flex
          items-center
          gap-2
          ${theme.text.tertiary}
          text-sm
          font-light
          tracking-wide
        `}
        aria-label="Reset count and timer"
      >
        <RotateCcw className="w-4 h-4" strokeWidth={2} />
        <span>重置</span>
      </motion.button>
    </motion.div>
  );
}
