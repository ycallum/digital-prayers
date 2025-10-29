import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { getThemeColors } from '../lib/theme';

interface CountDisplayProps {
  current: number;
  total: number;
  round: number;
}

export function CountDisplay({ current, total, round }: CountDisplayProps) {
  const { state } = useApp();
  const themeColors = getThemeColors(state.theme);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
      <motion.div
        key={current}
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className={`text-6xl md:text-7xl font-bold ${themeColors.text.primary} transition-colors duration-500`}
      >
        {current}
      </motion.div>
      <div className="flex items-center gap-2 mt-1">
        <div className={`h-px w-12 ${themeColors.text.secondary} transition-colors duration-500`} />
      </div>
      <div className={`text-2xl ${themeColors.text.secondary} mt-1 transition-colors duration-500`}>{total}</div>
      <div className={`text-sm ${themeColors.text.secondary} mt-4 transition-colors duration-500`}>Round {round}</div>
    </div>
  );
}
