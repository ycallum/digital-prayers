import { motion, MotionValue, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useRef } from "react"
import { cn } from "../../lib/utils"

interface FloatingDockProps {
  className?: string
  children: React.ReactNode
}

interface DockIconProps {
  mouseX: MotionValue
  children: React.ReactNode
  className?: string
}

const FloatingDock = ({ children, className }: FloatingDockProps) => {
  const mouseX = useMotionValue(Infinity)

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto flex h-16 items-end gap-4 rounded-2xl px-4 pb-3",
        "bg-[var(--color-button-background)] shadow-lg backdrop-blur-md",
        "fixed bottom-4 left-1/2 -translate-x-1/2 z-50",
        className
      )}
    >
      {Array.isArray(children)
        ? children.map((child, i) =>
            <DockIcon key={i} mouseX={mouseX}>{child}</DockIcon>
          )
        : <DockIcon mouseX={mouseX}>{children}</DockIcon>
      }
    </motion.div>
  )
}

const DockIcon = ({ mouseX, children, className }: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null)

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40])
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 })

  const heightSync = useTransform(distance, [-150, 0, 150], [40, 80, 40])
  const height = useSpring(heightSync, { mass: 0.1, stiffness: 150, damping: 12 })

  return (
    <motion.div
      ref={ref}
      style={{ width, height }}
      className={cn(
        "flex items-center justify-center rounded-full",
        "cursor-pointer transition-colors duration-200",
        className
      )}
    >
      {children}
    </motion.div>
  )
}

export { FloatingDock, DockIcon }
