import { createFileRoute, Link } from '@tanstack/react-router'
import { chants } from '../../data/chants'
import { Chant } from '../../types/chant'
import { ChantCard } from '../../components/library/ChantCard'
import { BackgroundWords } from '../../components/BackgroundWords'
import { useApp } from '../../context/AppContext'
import { getThemeClasses } from '../../lib/theme'
import { motion } from 'framer-motion'
import { Library, Scroll } from 'lucide-react'

export const Route = createFileRoute('/library/')({
  loader: () => {
    // Loader runs before component - no useEffect needed
    return { chants }
  },
  component: LibraryIndexComponent,
})

function LibraryIndexComponent() {
  const { chants } = Route.useLoaderData()
  const { state } = useApp()
  const themeClasses = getThemeClasses()

  return (
    <div
      className={`min-h-screen-safe h-screen ${themeClasses.background} ${themeClasses.transition} relative overflow-y-auto ${
        state.brightnessMode === 'dimmed' ? 'brightness-75' : ''
      }`}
    >
      <BackgroundWords />

      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-50" />

      <div className="relative z-10 pb-24 px-4 pt-12 md:px-8 md:max-w-4xl md:mx-auto lg:max-w-5xl">
        {/* Header section with editorial layout */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 relative"
        >
          {/* Decorative accent element */}
          <div className="absolute -left-4 top-0 bottom-0 w-1 bg-[var(--color-accent)]" />

          <div className="flex items-start justify-between gap-8 mb-6">
            <div className="flex-1">
              {/* Eyebrow text */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center gap-3 mb-4 text-[var(--color-text-secondary)] text-sm font-mono uppercase tracking-widest"
              >
                <Library className="w-4 h-4" strokeWidth={2.5} />
                <span>Sacred Texts Collection</span>
              </motion.div>

              {/* Main title with distinctive typography */}
              <h1 className={`
                text-5xl
                md:text-6xl
                lg:text-7xl
                font-serif
                font-bold
                ${themeClasses.text.primary}
                mb-4
                leading-none
                tracking-tighter
              `}>
                经文库
              </h1>

              {/* Subtitle */}
              <p className={`
                text-xl
                md:text-2xl
                ${themeClasses.text.secondary}
                font-light
                leading-relaxed
                max-w-2xl
                tracking-wide
              `}>
                收藏用于冥想、忏悔和心灵净化的神圣经文
              </p>
            </div>

            {/* Decorative icon element */}
            <motion.div
              initial={{ opacity: 0, rotate: -45, scale: 0.5 }}
              animate={{ opacity: 0.1, rotate: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="hidden md:block"
            >
              <Scroll className={`w-24 h-24 ${themeClasses.text.secondary}`} strokeWidth={1} />
            </motion.div>
          </div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-8 pt-6 border-t border-[var(--color-text-secondary)]/20"
          >
            <div className="text-sm font-mono text-[var(--color-text-secondary)]">
              <span className="text-2xl font-bold text-[var(--color-accent)] mr-2">
                {chants.length}
              </span>
              <span className="uppercase tracking-wider">经文可用</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Chants grid with staggered animations */}
        <div className="space-y-6">
          {chants.map((chant: Chant, index: number) => (
            <Link
              key={chant.id}
              to="/library/$id"
              params={{ id: chant.id }}
            >
              <ChantCard
                chant={chant}
                onClick={() => {}}
                index={index}
              />
            </Link>
          ))}
        </div>

        {chants.length === 1 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className={`text-center ${themeClasses.text.secondary} mt-16 text-lg font-light tracking-wide`}
          >
            更多经文即将到来
          </motion.p>
        )}
      </div>
    </div>
  )
}
