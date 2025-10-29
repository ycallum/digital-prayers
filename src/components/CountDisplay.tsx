import { memo } from 'react';
import { motion } from 'framer-motion';
import { getThemeClasses } from '../lib/theme';

interface CountDisplayProps {
  current: number;
  total: number;
  round: number;
}

export const CountDisplay = memo(function CountDisplay({ current, total, round }: CountDisplayProps) {
  const theme = getThemeClasses();

  return (
    <div className="flex flex-col items-center justify-center pointer-events-none relative z-20">
      <motion.div
        key={current}
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className={`text-7xl md:text-8xl font-bold ${theme.text.primary} ${theme.transition}`}
      >
        {current}
      </motion.div>
      <div className="flex items-center gap-2 mt-2">
        <div className={`h-px w-16 ${theme.text.secondary} ${theme.transition}`} style={{ backgroundColor: 'var(--color-text-secondary)' }} />
      </div>
      <div className={`text-3xl ${theme.text.secondary} mt-2 ${theme.transition}`}>{total}</div>
      <div className={`text-xs ${theme.text.secondary} mt-6 opacity-60 ${theme.transition}`}>Round {round}</div>
    </div>
  );
});
