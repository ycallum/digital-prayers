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
      {/* Main counter with smooth scale */}
      <motion.div
        key={current}
        initial={{ scale: 1, opacity: 1 }}
        animate={{
          scale: [1, 1.08, 1],
          opacity: [1, 0.95, 1]
        }}
        transition={{
          duration: 0.3,
          ease: [0.22, 1, 0.36, 1]
        }}
        className={`
          text-8xl
          md:text-9xl
          font-bold
          font-mono
          ${theme.text.primary}
          ${theme.transition}
          tracking-tighter
          relative
        `}
        style={{
          textShadow: '0 1px 2px rgba(0,0,0,0.08)'
        }}
      >
        {current}
      </motion.div>

      {/* Subtle separator with soft circle */}
      <div className="flex items-center gap-3 mt-3 mb-2">
        <div className="w-10 h-px bg-gradient-to-r from-transparent via-[var(--color-text-secondary)]/30 to-transparent" />
        <div className="w-1 h-1 rounded-full bg-[var(--color-accent)]/50" />
        <div className="w-10 h-px bg-gradient-to-l from-transparent via-[var(--color-text-secondary)]/30 to-transparent" />
      </div>

      {/* Total beads with elegant serif */}
      <div className={`
        text-3xl
        font-light
        ${theme.text.secondary}
        ${theme.transition}
        tracking-wide
        font-serif
      `}>
        {total}
      </div>

      {/* Round indicator with soft presentation */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-6 flex flex-col items-center gap-1"
      >
        <div className={`
          text-xs
          font-light
          tracking-wider
          ${theme.text.secondary}
          ${theme.transition}
          opacity-60
        `}>
          Round
        </div>
        <div className={`
          text-xl
          font-light
          ${theme.text.primary}
          ${theme.transition}
        `}>
          {round}
        </div>
      </motion.div>
    </div>
  );
});
