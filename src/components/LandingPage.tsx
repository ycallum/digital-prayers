import { motion } from 'framer-motion'
import { useNavigate } from '@tanstack/react-router'

// Leaf SVG component
const Leaf = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M10 2C10 2 6 6 6 10C6 12.2091 7.79086 14 10 14C12.2091 14 14 12.2091 14 10C14 6 10 2 10 2Z"
      fill="currentColor"
      opacity="0.6"
    />
  </svg>
)

export const LandingPage = () => {
  const navigate = useNavigate()

  // Generate random falling leaves - increased for fuller garden effect
  const leaves = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 8, // Spread out the delays more
    duration: 8 + Math.random() * 6, // More varied fall speeds
    swing: Math.random() * 50 - 25, // Slightly more swing variation
  }))

  return (
    <div className="relative min-h-screen-safe overflow-hidden bg-theme flex items-center justify-center">
      {/* Falling leaves animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {leaves.map((leaf) => (
          <motion.div
            key={leaf.id}
            className="absolute text-theme-accent"
            style={{ left: leaf.left, top: '-20px' }}
            initial={{ y: -20, x: 0, rotate: 0, opacity: 0 }}
            animate={{
              y: '110vh',
              x: [0, leaf.swing, 0, -leaf.swing, 0],
              rotate: [0, 180, 360, 540, 720],
              opacity: [0, 0.6, 0.6, 0.6, 0],
            }}
            transition={{
              duration: leaf.duration,
              delay: leaf.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Leaf />
          </motion.div>
        ))}
      </div>

      {/* Subtle paper texture background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating organic shapes - zen garden atmosphere */}
      <motion.div
        className="absolute top-20 left-[15%] w-32 h-32 rounded-full bg-theme-accent"
        style={{
          opacity: 0.08,
          filter: 'blur(40px)',
        }}
        animate={{
          y: [0, -20, 0],
          opacity: [0.06, 0.1, 0.06],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-32 right-[20%] w-48 h-48 rounded-full bg-theme-accent-secondary"
        style={{
          opacity: 0.06,
          filter: 'blur(50px)',
        }}
        animate={{
          y: [0, 25, 0],
          opacity: [0.04, 0.08, 0.04],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-[40%] right-[10%] w-24 h-24 rounded-full bg-theme-accent"
        style={{
          opacity: 0.05,
          filter: 'blur(30px)',
        }}
        animate={{
          y: [0, -15, 0],
          opacity: [0.03, 0.07, 0.03],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 max-w-2xl mx-auto px-8 text-center">
        {/* Decorative element - zen circle */}
        <motion.div
          className="mx-auto mb-12 w-24 h-24 relative"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            duration: 1.2,
            ease: [0.34, 1.56, 0.64, 1],
            delay: 0.2,
          }}
        >
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full"
            style={{ filter: 'drop-shadow(0 4px 12px rgba(139, 161, 130, 0.15))' }}
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              className="stroke-theme-accent"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="283"
              strokeDashoffset="15"
              style={{
                transform: 'rotate(-90deg)',
                transformOrigin: 'center',
              }}
            />
            <circle
              cx="50"
              cy="50"
              r="35"
              fill="none"
              className="stroke-theme-accent-secondary"
              strokeWidth="1.5"
              opacity="0.5"
            />
          </svg>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="mb-6 text-6xl md:text-7xl font-serif text-theme-primary leading-tight tracking-tight"
          style={{ fontFamily: "'Noto Sans SC', serif" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          静心
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mb-6 text-xl text-theme-secondary font-light"
          style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          一个冥想与静修的空间
        </motion.p>

        {/* Description */}
        <motion.p
          className="mb-6 text-base text-theme-tertiary max-w-md mx-auto leading-relaxed"
          style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          
        </motion.p>

        {/* CTA Button */}
        <motion.button
          onClick={() => navigate({ to: '/counter' })}
          className="group relative px-12 py-4 rounded-full overflow-hidden transition-theme"
          style={{
            fontFamily: "'Noto Sans SC', sans-serif",
            background: 'var(--color-accent-secondary)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15), 0 4px 12px rgba(0, 0, 0, 0.1)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          whileHover={{
            scale: 1.05,
            boxShadow: '0 14px 40px rgba(0, 0, 0, 0.2), 0 6px 16px rgba(0, 0, 0, 0.12)',
          }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Shine effect on hover */}
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />

          <span className="relative text-white font-medium text-lg tracking-wide drop-shadow-sm">
            进入花园
          </span>
        </motion.button>

        {/* Subtle hint text */}
        <motion.p
          className="mt-6 text-sm text-theme-tertiary font-light"
          style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1,
            delay: 1.5,
          }}
        >
          在当下找到宁静
        </motion.p>
      </div>

      {/* Bottom decorative gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none opacity-50"
        style={{
          background: 'linear-gradient(to top, var(--color-accent-primary), transparent)',
          opacity: 0.05,
        }}
      />
    </div>
  )
}
