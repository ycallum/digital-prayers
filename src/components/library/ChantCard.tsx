import { Chant } from '../../types/chant'
import { Clock } from 'lucide-react'
import { motion } from 'framer-motion'

interface ChantCardProps {
  chant: Chant
  onClick: () => void
}

export const ChantCard = ({ chant, onClick }: ChantCardProps) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="
        bg-[var(--color-secondary)]
        text-[var(--color-text)]
        rounded-2xl
        shadow-lg
        p-6
        cursor-pointer
        transition-all
        duration-500
        hover:shadow-xl
        relative
      "
    >
      <div className="absolute top-4 right-4 flex items-center gap-1 text-[var(--color-text-secondary)] text-sm">
        <Clock className="w-4 h-4" />
        <span>约{chant.readingTime}分钟</span>
      </div>

      <h2 className="text-2xl font-bold mb-3 pr-24">{chant.title}</h2>
      <p className="text-[var(--color-text-secondary)] leading-relaxed">
        {chant.description}
      </p>
    </motion.div>
  )
}
