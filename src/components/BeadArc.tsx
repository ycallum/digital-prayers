import { motion } from 'framer-motion';

interface BeadArcProps {
  current: number;
  total: number;
  isCompleting?: boolean;
}

interface BeadPosition {
  x: number;
  y: number;
  angle: number;
}

export function BeadArc({ current, total, isCompleting = false }: BeadArcProps) {
  const displayBeadCount = Math.min(total, 33);

  const getArcPositions = (): BeadPosition[] => {
    const positions: BeadPosition[] = [];
    const startAngle = Math.PI * 0.75;
    const endAngle = Math.PI * 2.25;
    const angleRange = endAngle - startAngle;

    for (let i = 0; i < displayBeadCount; i++) {
      const normalizedPosition = i / (displayBeadCount - 1);
      const angle = startAngle + (normalizedPosition * angleRange);

      const centerX = 50;
      const centerY = 50;
      const radiusX = 42;
      const radiusY = 42;

      const x = centerX + radiusX * Math.cos(angle);
      const y = centerY + radiusY * Math.sin(angle);

      positions.push({ x, y, angle });
    }

    return positions;
  };

  const arcPositions = getArcPositions();
  const progressRatio = current / total;
  const currentBeadIndex = Math.floor(progressRatio * displayBeadCount);
  const beadsBehind = Math.max(0, currentBeadIndex - 2);

  const getBeadSize = () => {
    if (displayBeadCount <= 27) return 'w-6 h-6 md:w-7 md:h-7';
    if (displayBeadCount <= 54) return 'w-5 h-5 md:w-6 md:h-6';
    return 'w-4 h-4 md:w-5 md:h-5';
  };

  const beadSize = getBeadSize();

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <svg className="absolute inset-0 w-full h-full">
        {arcPositions.map((pos, i) => {
          const nextPos = arcPositions[i + 1];
          if (!nextPos) return null;

          return (
            <line
              key={`line-${i}`}
              x1={`${pos.x}%`}
              y1={`${pos.y}%`}
              x2={`${nextPos.x}%`}
              y2={`${nextPos.y}%`}
              stroke="rgba(139, 111, 71, 0.25)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          );
        })}
      </svg>

      {current > 0 && currentBeadIndex < displayBeadCount && (
        <motion.div
          className={`absolute ${beadSize} rounded-full`}
          initial={false}
          animate={{
            left: `${arcPositions[currentBeadIndex].x}%`,
            top: `${arcPositions[currentBeadIndex].y}%`,
            scale: isCompleting ? [1, 1.25, 1] : 1,
          }}
          transition={{
            left: { type: 'spring', damping: 25, stiffness: 150, duration: 0.6 },
            top: { type: 'spring', damping: 25, stiffness: 150, duration: 0.6 },
            scale: isCompleting
              ? { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
              : { duration: 0.2 },
          }}
          style={{
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
          }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #f9e79f, #f4d03f 35%, #d4af37 60%, #8b6914 85%, #4a3508)',
              boxShadow: `
                0 3px 6px rgba(0, 0, 0, 0.3),
                0 5px 12px rgba(0, 0, 0, 0.2),
                inset 0 2px 3px rgba(255, 255, 255, 0.4),
                inset 0 -2px 4px rgba(0, 0, 0, 0.4),
                ${isCompleting ? '0 0 20px rgba(244, 208, 63, 0.8), 0 0 40px rgba(212, 175, 55, 0.4)' : '0 0 15px rgba(244, 208, 63, 0.5)'}
              `,
            }}
          />
          <div
            className="absolute rounded-full bg-white"
            style={{
              top: '18%',
              left: '22%',
              width: '40%',
              height: '40%',
              opacity: 0.6,
              filter: 'blur(4px)',
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              top: '12%',
              left: '18%',
              width: '30%',
              height: '30%',
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 70%)',
            }}
          />
        </motion.div>
      )}

      {beadsBehind > 0 && Array.from({ length: Math.min(beadsBehind, 3) }).map((_, idx) => {
        const beadIndex = currentBeadIndex - (idx + 1);
        if (beadIndex < 0) return null;
        const opacity = 1 - (idx * 0.3);

        return (
          <motion.div
            key={`trail-${beadIndex}`}
            className={`absolute ${beadSize} rounded-full`}
            style={{
              left: `${arcPositions[beadIndex].x}%`,
              top: `${arcPositions[beadIndex].y}%`,
              transform: 'translate(-50%, -50%)',
              opacity,
              zIndex: 9 - idx,
            }}
          >
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle at 30% 30%, #d4af37, #b8941f 45%, #8b6914 75%, #4a3508)',
                boxShadow: `
                  0 2px 4px rgba(0, 0, 0, 0.3),
                  0 3px 8px rgba(0, 0, 0, 0.2),
                  inset 0 1px 2px rgba(255, 255, 255, 0.3),
                  inset 0 -1px 2px rgba(0, 0, 0, 0.4)
                `,
              }}
            />
            <div
              className="absolute rounded-full bg-white"
              style={{
                top: '20%',
                left: '25%',
                width: '35%',
                height: '35%',
                opacity: 0.4,
                filter: 'blur(3px)',
              }}
            />
          </motion.div>
        );
      })}

      {total > displayBeadCount && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-xs opacity-40 pointer-events-none">
          <span style={{ color: 'var(--color-text-secondary)' }}>
            Showing {displayBeadCount} of {total} beads
          </span>
        </div>
      )}
    </div>
  );
}
