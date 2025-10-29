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
}

export function BeadArc({ current, total, isCompleting = false }: BeadArcProps) {
  const theme = getThemeClasses();

  const displayBeadCount = Math.min(total, 33);
  const beadsToShow = displayBeadCount;

  const getBeadPositions = (): BeadPosition[] => {
    const positions: BeadPosition[] = [];
    const centerX = 50;
    const radiusX = 45;
    const radiusY = 25;

    const startAngle = Math.PI * 0.15;
    const endAngle = Math.PI * 0.85;
    const angleRange = endAngle - startAngle;

    const activeCount = Math.floor((current / total) * beadsToShow);

    for (let i = 0; i < beadsToShow; i++) {
      const isActive = i < activeCount;

      const normalizedPosition = i / (beadsToShow - 1);
      const angle = startAngle + (normalizedPosition * angleRange);

      const x = centerX - radiusX * Math.cos(angle);
      const y = radiusY * Math.sin(angle);

      positions.push({
        x,
        y: isActive ? 100 - y : y,
        isActive,
      });
    }

    return positions;
  };

  const beadPositions = getBeadPositions();

  const getBeadSize = () => {
    if (beadsToShow <= 27) return 'w-5 h-5 md:w-6 md:h-6';
    if (beadsToShow <= 54) return 'w-4 h-4 md:w-5 md:h-5';
    return 'w-3 h-3 md:w-4 md:h-4';
  };

  const beadSize = getBeadSize();

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {beadPositions.map((pos, i) => {
        const isGlowing = isCompleting && pos.isActive;

        return (
          <motion.div
            key={i}
            className={`absolute rounded-full ${beadSize} ${
              pos.isActive ? theme.bead.active : theme.bead.inactive
            } shadow-lg ${theme.transition}`}
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            initial={false}
            animate={{
              x: 0,
              y: 0,
              scale: isGlowing ? [1, 1.15, 1] : 1,
              boxShadow: isGlowing
                ? [
                    '0 4px 8px rgba(0, 0, 0, 0.3)',
                    '0 0 20px rgba(255, 193, 7, 0.6), 0 4px 12px rgba(0, 0, 0, 0.4)',
                    '0 4px 8px rgba(0, 0, 0, 0.3)',
                  ]
                : pos.isActive
                ? '0 0 12px rgba(255, 193, 7, 0.4), 0 4px 10px rgba(0, 0, 0, 0.3)'
                : '0 4px 8px rgba(0, 0, 0, 0.3)',
            }}
            transition={{
              type: 'spring',
              damping: 20,
              stiffness: 100,
              duration: 0.5,
              scale: isGlowing ? { duration: 1.5, repeat: Infinity } : { duration: 0.3 },
              boxShadow: isGlowing ? { duration: 1.5, repeat: Infinity } : { duration: 0.3 },
            }}
          >
            <div
              className={`absolute inset-0 rounded-full ${
                pos.isActive ? 'bg-gradient-to-br from-amber-light to-amber-dark' : 'bg-gradient-to-br from-gray-700 to-gray-900'
              }`}
              style={{
                boxShadow: pos.isActive
                  ? 'inset -2px -2px 4px rgba(0, 0, 0, 0.3), inset 2px 2px 4px rgba(255, 255, 255, 0.2)'
                  : 'inset -2px -2px 4px rgba(0, 0, 0, 0.5), inset 2px 2px 4px rgba(255, 255, 255, 0.1)',
              }}
            />
            {pos.isActive && (
              <div
                className="absolute top-[20%] left-[25%] w-[30%] h-[30%] rounded-full bg-white opacity-40 blur-sm"
              />
            )}
          </motion.div>
        );
      })}

      {total > displayBeadCount && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs opacity-50 pointer-events-auto">
          <span className={`${theme.text.secondary} ${theme.transition}`}>
            Showing {displayBeadCount} of {total} beads
          </span>
        </div>
      )}
    </div>
  );
}
