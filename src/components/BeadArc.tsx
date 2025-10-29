import { memo, useEffect, useRef, useState } from 'react';

interface BeadArcProps {
  current: number;
  total: number;
  isCompleting?: boolean;
}

interface Bead {
  id: number;
  side: 'left' | 'right';
  index: number;
}

const VISIBLE_BEADS_PER_SIDE = 7;

export const BeadArc = memo(function BeadArc({ current, isCompleting = false }: BeadArcProps) {
  const [beads, setBeads] = useState<Bead[]>(() => {
    const initial: Bead[] = [];
    for (let i = 0; i < VISIBLE_BEADS_PER_SIDE; i++) {
      initial.push({ id: i, side: 'left', index: i });
    }
    for (let i = 0; i < VISIBLE_BEADS_PER_SIDE; i++) {
      initial.push({ id: i + VISIBLE_BEADS_PER_SIDE, side: 'right', index: i });
    }
    return initial;
  });

  const [transitioningBead, setTransitioningBead] = useState<number | null>(null);
  const nextIdRef = useRef(VISIBLE_BEADS_PER_SIDE * 2);
  const previousCountRef = useRef(0);

  useEffect(() => {
    if (current <= previousCountRef.current || transitioningBead !== null) {
      previousCountRef.current = current;
      return;
    }

    previousCountRef.current = current;

    const topLeftBead = beads.find(b => b.side === 'left' && b.index === VISIBLE_BEADS_PER_SIDE - 1);
    if (!topLeftBead) return;

    setTransitioningBead(topLeftBead.id);

    const transitionTimer = setTimeout(() => {
      setBeads(prev => {
        const filtered = prev.filter(b => b.id !== topLeftBead.id);
        const leftBeads = filtered.filter(b => b.side === 'left');
        const rightBeads = filtered.filter(b => b.side === 'right');

        const rebalanced: Bead[] = [];

        if (leftBeads.length < VISIBLE_BEADS_PER_SIDE) {
          rebalanced.push({ id: nextIdRef.current++, side: 'left', index: 0 });
        }

        leftBeads.forEach((bead, idx) => {
          rebalanced.push({ ...bead, index: idx + (leftBeads.length < VISIBLE_BEADS_PER_SIDE ? 1 : 0) });
        });

        rightBeads.unshift({ id: topLeftBead.id, side: 'right', index: 0 });

        if (rightBeads.length > VISIBLE_BEADS_PER_SIDE) {
          rightBeads.pop();
        }

        rightBeads.forEach((bead, idx) => {
          rebalanced.push({ ...bead, index: idx });
        });

        return rebalanced;
      });

      setTransitioningBead(null);
    }, 800);

    return () => clearTimeout(transitionTimer);
  }, [current, beads, transitioningBead]);

  const getBeadPosition = (side: 'left' | 'right', index: number): { left: string; bottom: string } => {
    const spacing = 3.5;
    const startLeft = 12;
    const startRight = 88;

    if (side === 'left') {
      return {
        left: `${startLeft}%`,
        bottom: `${25 + index * spacing}%`,
      };
    } else {
      return {
        left: `${startRight}%`,
        bottom: `${25 + index * spacing}%`,
      };
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <svg
        className="absolute left-1/2 bottom-1/4 -translate-x-1/2"
        width="80%"
        height="60%"
        viewBox="0 0 100 60"
        style={{ maxWidth: '600px' }}
      >
        <path
          d="M 12 0 Q 50 -20, 88 0"
          stroke="rgba(139, 111, 71, 0.6)"
          strokeWidth="0.3"
          fill="none"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {beads.map((bead) => {
        const isTransitioning = bead.id === transitioningBead;
        const isActive = bead.side === 'left' && bead.index === VISIBLE_BEADS_PER_SIDE - 1 && !isTransitioning;
        const pos = getBeadPosition(bead.side, bead.index);

        return (
          <div
            key={bead.id}
            className="bead"
            data-transitioning={isTransitioning}
            data-active={isActive}
            data-completing={isCompleting && isActive}
            style={{
              ...pos,
              position: 'absolute',
              width: '28px',
              height: '28px',
              transform: 'translate(-50%, 50%)',
              transition: isTransitioning ? 'none' : 'all 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)',
              willChange: 'transform, opacity',
            }}
          >
            <div
              className="bead-inner"
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: isActive
                  ? 'radial-gradient(circle at 30% 30%, #f9e79f, #f4d03f 35%, #d4af37 60%, #8b6914 85%, #4a3508)'
                  : 'radial-gradient(circle at 30% 30%, #d4af37, #b8941f 45%, #8b6914 75%, #4a3508)',
                boxShadow: isActive
                  ? `0 3px 6px rgba(0, 0, 0, 0.3),
                     0 5px 12px rgba(0, 0, 0, 0.2),
                     inset 0 2px 3px rgba(255, 255, 255, 0.4),
                     inset 0 -2px 4px rgba(0, 0, 0, 0.4),
                     ${isCompleting ? '0 0 20px rgba(244, 208, 63, 0.8)' : '0 0 15px rgba(244, 208, 63, 0.5)'}`
                  : `0 2px 4px rgba(0, 0, 0, 0.3),
                     0 3px 8px rgba(0, 0, 0, 0.2),
                     inset 0 1px 2px rgba(255, 255, 255, 0.3),
                     inset 0 -1px 2px rgba(0, 0, 0, 0.4)`,
                transform: isActive ? 'scale(1.15)' : 'scale(1)',
                transition: 'all 0.3s ease',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: isActive ? '18%' : '20%',
                  left: isActive ? '22%' : '25%',
                  width: isActive ? '40%' : '35%',
                  height: isActive ? '40%' : '35%',
                  borderRadius: '50%',
                  background: 'white',
                  opacity: isActive ? 0.6 : 0.4,
                  filter: isActive ? 'blur(4px)' : 'blur(3px)',
                }}
              />
              {isActive && (
                <div
                  style={{
                    position: 'absolute',
                    top: '12%',
                    left: '18%',
                    width: '30%',
                    height: '30%',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 70%)',
                  }}
                />
              )}
            </div>
          </div>
        );
      })}

      <style>{`
        @keyframes beadTransition {
          0% {
            left: 12%;
            bottom: 46%;
          }
          50% {
            left: 50%;
            bottom: 60%;
          }
          100% {
            left: 88%;
            bottom: 46%;
          }
        }

        @keyframes completionPulse {
          0%, 100% {
            filter: drop-shadow(0 0 15px rgba(244, 208, 63, 0.5));
          }
          50% {
            filter: drop-shadow(0 0 25px rgba(244, 208, 63, 0.9));
          }
        }

        .bead[data-transitioning="true"] {
          animation: beadTransition 0.8s cubic-bezier(0.4, 0.0, 0.2, 1) forwards;
        }

        .bead[data-completing="true"] .bead-inner {
          animation: completionPulse 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
});
