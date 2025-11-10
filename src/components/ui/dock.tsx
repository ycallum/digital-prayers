import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useRef } from "react"
import { cn } from "../../lib/utils"

interface DockProps {
  className?: string
  children: React.ReactNode
}

interface DockIconProps {
  children: React.ReactNode
  className?: string
}

const Dock = ({ children, className }: DockProps) => {
  return (
    <motion.div
      className={cn(
        "mx-auto flex h-16 items-center gap-4 rounded-2xl px-4",
        "bg-[var(--color-button-background)] shadow-lg backdrop-blur-md",
        "fixed bottom-4 left-1/2 -translate-x-1/2 z-50",
        className
      )}
    >
      {children}
    </motion.div>
  )
}

const DockIcon = ({ children, className }: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(Infinity)

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 60, 40])
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 })

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className={cn(
        "flex aspect-square items-center justify-center rounded-full",
        "cursor-pointer transition-colors duration-500",
        className
      )}
    >
      {children}
    </motion.div>
  )
}

export { Dock, DockIcon }
