import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

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

interface AnimatedBead {
  id: string;
  position: number;
  isActive: boolean;
  isTransitioning?: boolean;
}

let beadIdCounter = 100;

export function BeadArc({ current, isCompleting = false }: BeadArcProps) {
  const [beads, setBeads] = useState<AnimatedBead[]>([]);
  const [animationQueue, setAnimationQueue] = useState<number[]>([]);
  const isAnimating = useRef(false);
  const previousCount = useRef(current);

  const getArcPositions = (): BeadPosition[] => {
    const positions: BeadPosition[] = [];
    const startAngle = Math.PI * 0.75;
    const endAngle = Math.PI * 2.25;

    const centerX = 50;
    const centerY = 50;
    const radiusX = 42;
    const radiusY = 42;

    const leftStackSize = 7;
    const rightStackSize = 7;
    const leftStackSpacing = 0.08;
    const rightStackSpacing = 0.08;

    for (let i = 0; i < leftStackSize; i++) {
      const normalizedPosition = i * leftStackSpacing;
      const angle = startAngle + normalizedPosition;

      const x = centerX + radiusX * Math.cos(angle);
      const y = centerY + radiusY * Math.sin(angle);

      positions.push({ x, y, angle });
    }

    const transitionSteps = 20;
    const lastLeftAngle = startAngle + (leftStackSize - 1) * leftStackSpacing;
    const firstRightAngle = endAngle;
    const angleRange = firstRightAngle - lastLeftAngle;

    for (let i = 0; i < transitionSteps; i++) {
      const t = (i + 1) / (transitionSteps + 1);
      const angle = lastLeftAngle + angleRange * t;

      const x = centerX + radiusX * Math.cos(angle);
      const y = centerY + radiusY * Math.sin(angle);

      positions.push({ x, y, angle });
    }

    for (let i = rightStackSize - 1; i >= 0; i--) {
      const normalizedPosition = i * rightStackSpacing;
      const angle = endAngle - normalizedPosition;

      const x = centerX + radiusX * Math.cos(angle);
      const y = centerY + radiusY * Math.sin(angle);

      positions.push({ x, y, angle });
    }

    return positions;
  };

  const arcPositions = getArcPositions();

  const LEFT_STACK_SIZE = 7;
  const TRANSITION_STEPS = 20;
  const RIGHT_STACK_START = LEFT_STACK_SIZE + TRANSITION_STEPS;

  useEffect(() => {
    const initialBeads: AnimatedBead[] = [];

    for (let i = 0; i < LEFT_STACK_SIZE; i++) {
      initialBeads.push({
        id: `bead-${i}`,
        position: i,
        isActive: i === 6,
      });
    }

    for (let i = 0; i < LEFT_STACK_SIZE; i++) {
      initialBeads.push({
        id: `bead-${i + LEFT_STACK_SIZE}`,
        position: RIGHT_STACK_START + i,
        isActive: false,
      });
    }

    setBeads(initialBeads);
  }, []);

  useEffect(() => {
    if (current > previousCount.current) {
      setAnimationQueue(prev => [...prev, current]);
    }
    previousCount.current = current;
  }, [current]);

  useEffect(() => {
    if (animationQueue.length > 0 && !isAnimating.current) {
      isAnimating.current = true;

      setTimeout(() => {
        setBeads(prevBeads => {
          const activeBead = prevBeads.find(b => b.isActive);
          if (!activeBead) return prevBeads;

          const newBeads = prevBeads.map(bead => {
            if (bead.isActive) {
              return {
                ...bead,
                position: RIGHT_STACK_START,
                isActive: true,
                isTransitioning: true,
              };
            }
            return bead;
          });

          return newBeads;
        });

        setTimeout(() => {
          setBeads(prevBeads => {
            const leftBeads = prevBeads.filter(b => b.position < LEFT_STACK_SIZE && !b.isActive);
            const activeBead = prevBeads.find(b => b.isActive);
            const rightBeads = prevBeads.filter(b => b.position >= RIGHT_STACK_START && !b.isActive);

            const rebalancedBeads: AnimatedBead[] = [];

            const newBead: AnimatedBead = {
              id: `bead-${beadIdCounter++}`,
              position: 0,
              isActive: false,
            };
            rebalancedBeads.push(newBead);

            leftBeads.forEach((bead, idx) => {
              rebalancedBeads.push({
                ...bead,
                position: idx + 1,
                isActive: false,
              });
            });

            if (activeBead) {
              rightBeads.push({ ...activeBead, isTransitioning: false });
            }

            rightBeads.slice(0, 6).forEach((bead, idx) => {
              rebalancedBeads.push({
                ...bead,
                position: RIGHT_STACK_START + idx,
                isActive: false,
              });
            });

            const leftStackCount = rebalancedBeads.filter(b => b.position < LEFT_STACK_SIZE).length;
            if (leftStackCount > 0) {
              const lastLeftIndex = rebalancedBeads.findIndex(b => b.position === leftStackCount - 1);
              if (lastLeftIndex >= 0) {
                rebalancedBeads[lastLeftIndex].isActive = true;
              }
            }

            return rebalancedBeads;
          });

          setTimeout(() => {
            isAnimating.current = false;
            setAnimationQueue(prev => prev.slice(1));
          }, 400);
        }, 800);
      }, 50);
    }
  }, [animationQueue, LEFT_STACK_SIZE, RIGHT_STACK_START]);

  const beadSize = 'w-6 h-6 md:w-7 md:h-7';

  const getArcPath = (fromPos: number, toPos: number): { x: number; y: number }[] => {
    const path: { x: number; y: number }[] = [];
    const step = fromPos < toPos ? 1 : -1;

    for (let i = fromPos; step > 0 ? i <= toPos : i >= toPos; i += step) {
      if (i >= 0 && i < arcPositions.length) {
        path.push({ x: arcPositions[i].x, y: arcPositions[i].y });
      }
    }

    return path;
  };

  const renderBead = (bead: AnimatedBead, actualPosition: number, isActive: boolean) => {
    if (actualPosition < 0 || actualPosition >= arcPositions.length) return null;

    const pos = arcPositions[actualPosition];

    const animateProps: any = {
      left: `${pos.x}%`,
      top: `${pos.y}%`,
      opacity: 1,
      scale: isCompleting && isActive ? [1, 1.25, 1] : 1,
    };

    let transitionProps: any = {
      opacity: { duration: 0.3 },
      scale: isCompleting && isActive
        ? { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
        : { duration: 0.3 },
    };

    if (bead.isTransitioning) {
      const pathPoints = getArcPath(6, RIGHT_STACK_START);
      const keyframes = pathPoints.map(p => `${p.x}%`);
      const keyframesY = pathPoints.map(p => `${p.y}%`);

      animateProps.left = keyframes;
      animateProps.top = keyframesY;

      transitionProps = {
        ...transitionProps,
        left: {
          duration: 0.8,
          ease: [0.4, 0.0, 0.2, 1],
          times: keyframes.map((_, i) => i / (keyframes.length - 1))
        },
        top: {
          duration: 0.8,
          ease: [0.4, 0.0, 0.2, 1],
          times: keyframesY.map((_, i) => i / (keyframesY.length - 1))
        },
      };
    } else {
      transitionProps.left = { type: 'spring', damping: 20, stiffness: 120, duration: 0.5 };
      transitionProps.top = { type: 'spring', damping: 20, stiffness: 120, duration: 0.5 };
    }

    return (
      <motion.div
        key={bead.id}
        className={`absolute ${beadSize} rounded-full`}
        initial={{
          left: `${pos.x}%`,
          top: `${pos.y}%`,
          opacity: 0,
          scale: 0.5,
        }}
        animate={animateProps}
        exit={{
          opacity: 0,
          scale: 0.5,
          transition: { duration: 0.3 }
        }}
        transition={transitionProps}
        style={{
          transform: 'translate(-50%, -50%)',
          zIndex: isActive ? 10 : 9,
        }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: isActive
              ? 'radial-gradient(circle at 30% 30%, #f9e79f, #f4d03f 35%, #d4af37 60%, #8b6914 85%, #4a3508)'
              : 'radial-gradient(circle at 30% 30%, #d4af37, #b8941f 45%, #8b6914 75%, #4a3508)',
            boxShadow: isActive
              ? `
                0 3px 6px rgba(0, 0, 0, 0.3),
                0 5px 12px rgba(0, 0, 0, 0.2),
                inset 0 2px 3px rgba(255, 255, 255, 0.4),
                inset 0 -2px 4px rgba(0, 0, 0, 0.4),
                ${isCompleting ? '0 0 20px rgba(244, 208, 63, 0.8), 0 0 40px rgba(212, 175, 55, 0.4)' : '0 0 15px rgba(244, 208, 63, 0.5)'}
              `
              : `
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
            top: isActive ? '18%' : '20%',
            left: isActive ? '22%' : '25%',
            width: isActive ? '40%' : '35%',
            height: isActive ? '40%' : '35%',
            opacity: isActive ? 0.6 : 0.4,
            filter: isActive ? 'blur(4px)' : 'blur(3px)',
          }}
        />
        {isActive && (
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
        )}
      </motion.div>
    );
  };

  const renderArcLine = () => {
    const leftEndPos = arcPositions[6];
    const rightEndPos = arcPositions[RIGHT_STACK_START];

    if (!leftEndPos || !rightEndPos) return null;

    const points: string[] = [];
    for (let i = 6; i <= RIGHT_STACK_START; i++) {
      const pos = arcPositions[i];
      if (pos) {
        points.push(`${pos.x},${pos.y}`);
      }
    }

    const pathData = `M ${points.join(' L ')}`;

    return (
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path
          d={pathData}
          stroke="rgba(139, 111, 71, 0.6)"
          strokeWidth="0.5"
          fill="none"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    );
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {renderArcLine()}

      <AnimatePresence mode="popLayout">
        {beads.map((bead) => renderBead(bead, bead.position, bead.isActive))}
      </AnimatePresence>
    </div>
  );
}
