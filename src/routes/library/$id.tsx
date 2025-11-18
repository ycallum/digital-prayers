import { createFileRoute, notFound, Link } from '@tanstack/react-router'
import { getChantById } from '../../data/chants'
import { BackgroundWords } from '../../components/BackgroundWords'
import { useApp } from '../../context/AppContext'
import { getThemeClasses } from '../../lib/theme'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, BookOpen, Quote } from 'lucide-react'

export const Route = createFileRoute('/library/$id')({
  loader: ({ params }) => {
    const chant = getChantById(params.id)
    if (!chant) {
      throw notFound()
    }
    return { chant }
  },
  component: ChantDetailComponent,
  notFoundComponent: () => {
    const themeClasses = getThemeClasses()
    return (
      <div className={`min-h-screen ${themeClasses.background} flex items-center justify-center`}>
        <p className={themeClasses.text.primary}>经文未找到</p>
      </div>
    )
  },
})

function ChantDetailComponent() {
  const { chant } = Route.useLoaderData()
  const { state } = useApp()
  const themeClasses = getThemeClasses()

  // Split content into paragraphs for better typography
  const paragraphs = chant.content.split('\n\n').filter(p => p.trim())

  return (
    <div
      className={`min-h-screen h-screen ${themeClasses.background} ${themeClasses.transition} relative overflow-y-auto ${
        state.brightnessMode === 'dimmed' ? 'brightness-75' : ''
      }`}
      style={{
        minHeight: '-webkit-fill-available',
      }}
    >
      <BackgroundWords />

      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-50" />

      <div className="relative z-10 pb-32 px-4 pt-8 max-w-4xl mx-auto">
        {/* Back navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <Link
            to="/library"
            className={`
              inline-flex
              items-center
              gap-2
              text-sm
              font-mono
              uppercase
              tracking-widest
              ${themeClasses.text.secondary}
              hover:text-[var(--color-accent)]
              transition-colors
              duration-300
              group
            `}
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 duration-300" strokeWidth={2.5} />
            <span>返回经文库</span>
          </Link>
        </motion.div>

        {/* Header section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          {/* Metadata bar */}
          <div className="flex items-center gap-6 mb-8 text-[var(--color-text-secondary)] text-sm font-mono uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" strokeWidth={2.5} />
              <span>{chant.readingTime} 分钟阅读</span>
            </div>
            <div className="w-px h-4 bg-[var(--color-text-secondary)]/30" />
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" strokeWidth={2.5} />
              <span>经文</span>
            </div>
          </div>

          {/* Title with decorative elements */}
          <div className="relative">
            {/* Decorative quote mark */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
              animate={{ opacity: 0.05, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="absolute -left-4 md:-left-12 -top-4 md:-top-8"
            >
              <Quote className={`w-16 h-16 md:w-24 md:h-24 ${themeClasses.text.secondary}`} strokeWidth={1.5} />
            </motion.div>

            <h1 className={`
              text-4xl
              md:text-5xl
              lg:text-6xl
              font-serif
              font-bold
              ${themeClasses.text.primary}
              mb-6
              leading-tight
              tracking-tight
              relative
            `}>
              {chant.title}
            </h1>

            {/* Decorative underline */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="h-1 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)]/50 to-transparent w-32 origin-left"
            />
          </div>

          {/* Description */}
          <p className={`
            text-xl
            md:text-2xl
            ${themeClasses.text.secondary}
            font-light
            leading-relaxed
            mt-8
            tracking-wide
            max-w-3xl
          `}>
            {chant.description}
          </p>
        </motion.div>

        {/* Decorative divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-16 flex items-center gap-4"
        >
          <div className="h-px flex-1 bg-gradient-to-r from-[var(--color-text-secondary)]/30 to-transparent" />
          <div className="w-2 h-2 rotate-45 bg-[var(--color-accent)]/50" />
          <div className="h-px flex-1 bg-gradient-to-l from-[var(--color-text-secondary)]/30 to-transparent" />
        </motion.div>

        {/* Content with enhanced typography */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Decorative left border */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--color-accent)] via-[var(--color-accent)]/30 to-transparent" />

          <div className="pl-8 md:pl-12 space-y-8">
            {paragraphs.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.7 + (index * 0.1),
                  ease: [0.22, 1, 0.36, 1]
                }}
                className={`
                  ${themeClasses.text.primary}
                  text-lg
                  md:text-xl
                  leading-loose
                  md:leading-loose
                  tracking-wide
                  whitespace-pre-wrap
                  select-text
                  font-light
                  ${paragraph.includes('回向') || paragraph.includes('愿') ? 'font-serif text-2xl md:text-3xl' : ''}
                  ${paragraph.length < 20 ? 'text-center font-bold text-2xl md:text-3xl' : ''}
                `}
                style={{
                  textShadow: '0 1px 2px rgba(0,0,0,0.05)'
                }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {/* Decorative end mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-16 flex justify-center"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rotate-45 bg-[var(--color-accent)]" />
              <div className="w-2 h-2 rotate-45 bg-[var(--color-accent)]/60" />
              <div className="w-2 h-2 rotate-45 bg-[var(--color-accent)]/30" />
            </div>
          </motion.div>
        </motion.article>
      </div>
    </div>
  )
}
