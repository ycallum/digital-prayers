import { motion } from 'framer-motion';
import { getThemeClasses } from '../lib/theme';

interface CountDisplayProps {
  current: number;
  total: number;
  round: number;
}

export function CountDisplay({ current, total, round }: CountDisplayProps) {
  const theme = getThemeClasses();

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
      <motion.div
        key={current}
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className={`text-6xl md:text-7xl font-bold ${theme.text.primary} ${theme.transition}`}
      >
        {current}
      </motion.div>
      <div className="flex items-center gap-2 mt-1">
        <div className={`h-px w-12 ${theme.text.secondary} ${theme.transition}`} style={{ backgroundColor: 'var(--color-text-secondary)' }} />
      </div>
      <div className={`text-2xl ${theme.text.secondary} mt-1 ${theme.transition}`}>{total}</div>
      <div className={`text-sm ${theme.text.secondary} mt-4 ${theme.transition}`}>Round {round}</div>
    </div>
  );
}
