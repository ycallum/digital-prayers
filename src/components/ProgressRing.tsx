import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { getThemeClasses } from '../lib/theme';

interface ProgressRingProps {
  current: number;
  total: number;
  size?: number;
  isCompleting?: boolean;
}

export const ProgressRing = memo(function ProgressRing({
  current,
  total,
  size = 320,
  isCompleting = false
}: ProgressRingProps) {
  const theme = getThemeClasses();

  const { strokeWidth, radius, circumference, strokeDashoffset, segments, activeSegment } = useMemo(() => {
    const strokeWidth = 8;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const progress = current / total;
    const strokeDashoffset = circumference * (1 - progress);
    const segments = 12;
    const activeSegment = Math.floor(progress * segments);

    return { strokeWidth, radius, circumference, strokeDashoffset, segments, activeSegment };
  }, [current, total, size]);

  const segmentElements = useMemo(() => {
    const elements = [];
    const segmentAngle = 360 / segments;

    for (let i = 0; i < segments; i++) {
      const angle = (i * segmentAngle * Math.PI) / 180;
      const x = size / 2 + radius * Math.cos(angle);
      const y = size / 2 + radius * Math.sin(angle);
      const isActive = i === activeSegment && current > 0 && current < total;

      elements.push(
        <motion.circle
          key={i}
          cx={x}
          cy={y}
          r={isActive ? 4 : 3}
          fill="currentColor"
          className={`${isActive ? theme.progressGlow : theme.accent.secondary} ${theme.transition}`}
          initial={false}
          animate={
            isActive
              ? {
                  scale: [1, 1.2, 1],
                  opacity: [0.8, 1, 0.8],
                }
              : { scale: 1, opacity: 0.6 }
          }
          transition={
            isActive
              ? {
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
              : { duration: 0.3 }
          }
          style={{ willChange: isActive ? 'transform, opacity' : 'auto' }}
        />
      );
    }

    return elements;
  }, [segments, size, radius, activeSegment, current, total, theme]);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
        viewBox={`0 0 ${size} ${size}`}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className={`${theme.accent.secondary} opacity-30 ${theme.transition}`}
        />

        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={`${isCompleting ? theme.progressGlow : theme.progress} ${theme.transition}`}
          initial={false}
          animate={{
            strokeDashoffset,
            filter: isCompleting
              ? ['drop-shadow(0 0 8px rgba(212, 175, 55, 0.6))', 'drop-shadow(0 0 16px rgba(212, 175, 55, 0.8))', 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.6))']
              : 'drop-shadow(0 0 0px rgba(0, 0, 0, 0))',
          }}
          transition={{
            strokeDashoffset: { duration: 0.3, ease: 'easeOut' },
            filter: isCompleting ? { duration: 1, repeat: Infinity } : { duration: 0 },
          }}
          style={{ willChange: isCompleting ? 'filter' : 'auto' }}
        />

        {segmentElements}
      </svg>
    </div>
  );
});
