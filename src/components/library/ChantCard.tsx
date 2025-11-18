import { Chant } from '../../types/chant'
import { Clock, BookOpen } from 'lucide-react'
import { motion } from 'framer-motion'

interface ChantCardProps {
  chant: Chant
  onClick: () => void
  index?: number
}

export const ChantCard = ({ chant, onClick, index = 0 }: ChantCardProps) => {
  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{ y: -4 }}
      className="
        group
        relative
        cursor-pointer
        bg-[var(--color-secondary)]
        border-l-4
        border-[var(--color-accent)]
        transition-all
        duration-700
        ease-out
        hover:border-l-8
        hover:shadow-2xl
        overflow-hidden
      "
    >
      {/* Atmospheric gradient overlay */}
      <div className="
        absolute
        inset-0
        bg-gradient-to-br
        from-[var(--color-accent)]/5
        to-transparent
        opacity-0
        group-hover:opacity-100
        transition-opacity
        duration-700
      " />

      {/* Decorative vertical line */}
      <div className="
        absolute
        right-0
        top-0
        bottom-0
        w-px
        bg-gradient-to-b
        from-transparent
        via-[var(--color-text-secondary)]/20
        to-transparent
      " />

      <div className="relative p-8 pr-12">
        {/* Top metadata bar */}
        <div className="flex items-start justify-between mb-6 gap-4">
          <div className="flex items-center gap-6 text-[var(--color-text-secondary)] text-sm font-mono tracking-wider uppercase">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5" strokeWidth={2.5} />
              <span>{chant.readingTime}min</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5" strokeWidth={2.5} />
              <span>经文</span>
            </div>
          </div>
        </div>

        {/* Title with distinctive typography */}
        <h2 className="
          text-3xl
          md:text-4xl
          font-serif
          font-bold
          mb-4
          text-[var(--color-text)]
          leading-tight
          tracking-tight
          transition-colors
          duration-500
          group-hover:text-[var(--color-accent)]
        ">
          {chant.title}
        </h2>

        {/* Description with editorial spacing */}
        <p className="
          text-[var(--color-text-secondary)]
          leading-relaxed
          text-lg
          max-w-2xl
          font-light
          tracking-wide
        ">
          {chant.description}
        </p>

        {/* Decorative corner accent */}
        <div className="
          absolute
          bottom-0
          right-0
          w-24
          h-24
          border-r-2
          border-b-2
          border-[var(--color-text-secondary)]/10
          transition-all
          duration-500
          group-hover:w-32
          group-hover:h-32
          group-hover:border-[var(--color-accent)]/30
        " />
      </div>

      {/* Bottom decorative line */}
      <div className="
        h-px
        bg-gradient-to-r
        from-[var(--color-accent)]
        via-[var(--color-text-secondary)]/30
        to-transparent
        transform
        scale-x-0
        group-hover:scale-x-100
        transition-transform
        duration-700
        origin-left
      " />
    </motion.div>
  )
}
