import { motion } from 'framer-motion';

interface CompletionEffectProps {
  isVisible: boolean;
}

export function CompletionEffect({ isVisible }: CompletionEffectProps) {
  if (!isVisible) return null;

  const petals = Array.from({ length: 6 });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.05, 0] }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-white"
      />

      {petals.map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: '50%',
            y: '50%',
            opacity: 1,
            rotate: 0,
            scale: 0.5,
          }}
          animate={{
            x: `${50 + (Math.random() - 0.5) * 100}%`,
            y: '-50%',
            opacity: 0,
            rotate: 360,
            scale: 1,
          }}
          transition={{
            duration: 2,
            ease: 'easeOut',
            delay: i * 0.1,
          }}
          className="absolute w-4 h-4 rounded-full bg-gold opacity-80"
          style={{
            left: '50%',
            top: '50%',
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: [0, 1, 1, 0], scale: [0.8, 1, 1, 1.2] }}
        transition={{ duration: 1.5, times: [0, 0.2, 0.8, 1] }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <span className="text-4xl font-bold text-gold">圆满！</span>
      </motion.div>
    </div>
  );
}
