import { motion } from 'framer-motion';
import { getThemeClasses } from '../lib/theme';

interface BeadArcProps {
  current: number;
  total: number;
  isCompleting?: boolean;
}

interface BeadPosition {
  x: number;
  y: number;
  isActive: boolean;
  angle: number;
}

export function BeadArc({ current, total, isCompleting = false }: BeadArcProps) {
  const theme = getThemeClasses();

  const displayBeadCount = Math.min(total, 33);
  const beadsToShow = displayBeadCount;

  const getBeadPositions = (): BeadPosition[] => {
    const positions: BeadPosition[] = [];

    const startAngle = Math.PI * 0.85;
    const endAngle = Math.PI * 2.15;
    const angleRange = endAngle - startAngle;

    const activeCount = Math.floor((current / total) * beadsToShow);

    for (let i = 0; i < beadsToShow; i++) {
      const isActive = i < activeCount;
      const normalizedPosition = i / (beadsToShow - 1);
      const angle = startAngle + (normalizedPosition * angleRange);

      const padding = 8;
      const centerX = 50;
      const centerY = 50;
      const radiusX = 48 - padding;
      const radiusY = 48 - padding;

      const x = centerX + radiusX * Math.cos(angle);
      const y = centerY + radiusY * Math.sin(angle);

      positions.push({
        x,
        y,
        isActive,
        angle,
      });
    }

    return positions;
  };

  const beadPositions = getBeadPositions();

  const getBeadSize = () => {
    if (beadsToShow <= 27) return { className: 'w-5 h-5 md:w-6 md:h-6', size: 20 };
    if (beadsToShow <= 54) return { className: 'w-4 h-4 md:w-5 md:h-5', size: 16 };
    return { className: 'w-3 h-3 md:w-4 md:h-4', size: 12 };
  };

  const beadSize = getBeadSize();

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {beadPositions.map((pos, i) => {
        const isGlowing = isCompleting && pos.isActive;
        const nextPos = beadPositions[i + 1];

        return (
          <div key={i}>
            {nextPos && (
              <svg
                className="absolute inset-0 w-full h-full"
                style={{ zIndex: 0 }}
              >
                <line
                  x1={`${pos.x}%`}
                  y1={`${pos.y}%`}
                  x2={`${nextPos.x}%`}
                  y2={`${nextPos.y}%`}
                  stroke={pos.isActive && nextPos.isActive ? 'rgba(212, 175, 55, 0.3)' : 'rgba(110, 88, 54, 0.3)'}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            )}

            <motion.div
              className={`absolute ${beadSize.className} rounded-full ${theme.transition}`}
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: 1,
              }}
              initial={false}
              animate={{
                scale: isGlowing ? [1, 1.2, 1] : 1,
              }}
              transition={{
                type: 'spring',
                damping: 20,
                stiffness: 100,
                duration: 0.5,
                scale: isGlowing ? { duration: 1.5, repeat: Infinity } : { duration: 0.3 },
              }}
            >
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: pos.isActive
                    ? 'radial-gradient(circle at 30% 30%, #f4e4b8, #d4af37 45%, #8b6914 75%, #4a3508)'
                    : 'radial-gradient(circle at 30% 30%, #5a4a3a, #3e3020 45%, #2d2416 75%, #1a150d)',
                  boxShadow: pos.isActive
                    ? `
                        0 2px 4px rgba(0, 0, 0, 0.3),
                        0 4px 8px rgba(0, 0, 0, 0.2),
                        inset 0 1px 2px rgba(255, 255, 255, 0.3),
                        inset 0 -1px 2px rgba(0, 0, 0, 0.4)
                      `
                    : `
                        0 2px 4px rgba(0, 0, 0, 0.4),
                        0 3px 6px rgba(0, 0, 0, 0.3),
                        inset 0 1px 1px rgba(255, 255, 255, 0.1),
                        inset 0 -1px 2px rgba(0, 0, 0, 0.6)
                      `,
                  filter: isGlowing ? 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.6))' : 'none',
                }}
              />

              <div
                className="absolute rounded-full bg-white"
                style={{
                  top: '20%',
                  left: '25%',
                  width: '35%',
                  height: '35%',
                  opacity: pos.isActive ? 0.5 : 0.25,
                  filter: 'blur(3px)',
                }}
              />

              {pos.isActive && (
                <div
                  className="absolute rounded-full"
                  style={{
                    top: '15%',
                    left: '20%',
                    width: '25%',
                    height: '25%',
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 70%)',
                  }}
                />
              )}
            </motion.div>
          </div>
        );
      })}

      {total > displayBeadCount && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-xs opacity-50 pointer-events-auto">
          <span className={`${theme.text.secondary} ${theme.transition}`}>
            Showing {displayBeadCount} of {total} beads
          </span>
        </div>
      )}
    </div>
  );
}
