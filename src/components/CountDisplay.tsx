import { motion } from 'framer-motion';

interface CountDisplayProps {
  current: number;
  total: number;
  round: number;
}

export function CountDisplay({ current, total, round }: CountDisplayProps) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
      <motion.div
        key={current}
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="text-6xl md:text-7xl font-bold text-zen-800"
      >
        {current}
      </motion.div>
      <div className="flex items-center gap-2 mt-1">
        <div className="h-px w-12 bg-zen-300" />
      </div>
      <div className="text-2xl text-zen-500 mt-1">{total}</div>
      <div className="text-sm text-zen-500 mt-4">Round {round}</div>
    </div>
  );
}
