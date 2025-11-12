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

  return (
    <motion.div
      onMouseMove={!isMobile ? (e) => mouseX.set(e.pageX) : undefined}
      onMouseLeave={!isMobile ? () => mouseX.set(Infinity) : undefined}
      className={cn(
        "mx-auto flex items-center gap-2 rounded-2xl px-4 py-3",
        // Better contrast with border and enhanced shadow
        "bg-[var(--color-button-background)] border-2 border-[var(--color-border)]",
        "shadow-[0_8px_16px_rgba(0,0,0,0.12),0_2px_4px_rgba(0,0,0,0.08)]",
        "backdrop-blur-md",
        // Position
        "fixed bottom-4 left-1/2 -translate-x-1/2 z-50",
        // Mobile-friendly height
        isMobile ? "h-auto" : "h-16",
        className
      )}
    >
      {Array.isArray(children)
        ? children.map((child, i) =>
            <DockIcon key={i} mouseX={mouseX} isMobile={isMobile}>{child}</DockIcon>
          )
        : <DockIcon mouseX={mouseX} isMobile={isMobile}>{children}</DockIcon>
      }
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

  // Mobile: consistent 48px (touch-friendly), Desktop: 40-70px with magnification
  const widthSync = useTransform(
    distance,
    [-150, 0, 150],
    isMobile ? [48, 48, 48] : [40, 70, 40]
  )
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 })

  const heightSync = useTransform(
    distance,
    [-150, 0, 150],
    isMobile ? [48, 48, 48] : [40, 70, 40]
  )
  const height = useSpring(heightSync, { mass: 0.1, stiffness: 150, damping: 12 })

  return (
    <motion.div
      ref={ref}
      style={isMobile ? { width: 48, height: 48 } : { width, height }}
      className={cn(
        "flex items-center justify-center rounded-full",
        "cursor-pointer active:scale-95 transition-transform duration-150",
        className
      )}
    >
      {children}
    </motion.div>
  )
}

export { FloatingDock, DockIcon }
