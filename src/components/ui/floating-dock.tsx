import { motion, MotionValue, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { cn } from "../../lib/utils"

interface FloatingDockProps {
  className?: string
  children: React.ReactNode
}

interface DockIconProps {
  mouseX: MotionValue
  children: React.ReactNode
  className?: string
  isMobile: boolean
}

const FloatingDock = ({ children, className }: FloatingDockProps) => {
  const mouseX = useMotionValue(Infinity)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if device is mobile/tablet (touch-based)
    const checkMobile = () => {
      const mobile = window.matchMedia("(max-width: 768px)").matches ||
                     ('ontouchstart' in window)
      setIsMobile(mobile)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Filter out null/undefined children (e.g., conditional back button)
  const childrenArray = Array.isArray(children)
    ? children.filter(child => child != null)
    : children ? [children] : []

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        damping: 25,
        stiffness: 200,
        delay: 0.2
      }}
      onMouseMove={!isMobile ? (e) => mouseX.set(e.pageX) : undefined}
      onMouseLeave={!isMobile ? () => mouseX.set(Infinity) : undefined}
      className={cn(
        "mx-auto flex items-center gap-3 rounded-2xl px-3 py-2.5",
        // Zen aesthetic - clean and minimal
        "bg-[var(--color-button-background)]",
        "border border-[var(--color-border)]",
        "shadow-[0_10px_20px_rgba(0,0,0,0.15),0_3px_6px_rgba(0,0,0,0.10)]",
        "backdrop-blur-md",
        // Position
        "fixed bottom-4 left-1/2 -translate-x-1/2 z-50",
        // Smooth transitions
        "transition-all duration-300",
        className
      )}
    >
      {childrenArray.map((child, i) =>
        <DockIcon key={i} mouseX={mouseX} isMobile={isMobile}>{child}</DockIcon>
      )}
    </motion.div>
  )
}

const DockIcon = ({ mouseX, children, className, isMobile }: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null)

  // Only apply magnification effect on desktop
  const distance = useTransform(mouseX, (val) => {
    if (isMobile) return 999 // Disable effect on mobile
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  // Mobile: consistent 48px (touch-friendly), Desktop: 44-64px with magnification
  const size = isMobile ? 48 : 44
  const maxSize = isMobile ? 48 : 64

  const widthSync = useTransform(
    distance,
    [-150, 0, 150],
    [size, maxSize, size]
  )
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 })

  const heightSync = useTransform(
    distance,
    [-150, 0, 150],
    [size, maxSize, size]
  )
  const height = useSpring(heightSync, { mass: 0.1, stiffness: 150, damping: 12 })

  return (
    <motion.div
      ref={ref}
      style={isMobile ? { width: size, height: size } : { width, height }}
      className={cn(
        "flex items-center justify-center rounded-full flex-shrink-0",
        className
      )}
    >
      {children}
    </motion.div>
  )
}

export { FloatingDock, DockIcon }
