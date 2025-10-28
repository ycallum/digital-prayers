import { motion } from 'framer-motion';

interface ProgressRingProps {
  current: number;
  total: number;
  size?: number;
  isCompleting?: boolean;
}

export function ProgressRing({ current, total, size = 320, isCompleting = false }: ProgressRingProps) {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = current / total;
  const strokeDashoffset = circumference * (1 - progress);

  const segments = 12;
  const segmentAngle = 360 / segments;
  const activeSegment = Math.floor((current / total) * segments);

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
          className="text-wood-light opacity-30"
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
          className={isCompleting ? 'text-gold' : 'text-jade-300'}
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
        />

        {Array.from({ length: segments }).map((_, i) => {
          const angle = (i * segmentAngle * Math.PI) / 180;
          const x = size / 2 + radius * Math.cos(angle);
          const y = size / 2 + radius * Math.sin(angle);
          const isActive = i === activeSegment && current > 0 && current < total;

          return (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r={isActive ? 4 : 3}
              fill="currentColor"
              className={isActive ? 'text-gold' : 'text-wood'}
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
            />
          );
        })}
      </svg>
    </div>
  );
}
