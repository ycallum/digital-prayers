import { createFileRoute, notFound } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { getChantById } from '../../data/chants'
import { BackgroundWords } from '../../components/BackgroundWords'
import { useApp } from '../../context/AppContext'
import { getThemeClasses } from '../../lib/theme'

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
  const navigate = Route.useNavigate()
  const { state } = useApp()
  const themeClasses = getThemeClasses()

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
      <div className="relative z-10 pb-24">
        {/* Header */}
        <div className={`sticky top-0 ${themeClasses.background} border-b border-theme z-10`}>
          <div className="px-4 py-4 flex items-center gap-4 max-w-2xl mx-auto">
            <button
              onClick={() => navigate({ to: '/library' })}
              className={`${themeClasses.accent.primary} hover:opacity-80 transition-opacity`}
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className={`text-lg font-semibold ${themeClasses.text.primary} truncate`}>
              {chant.title}
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-8 max-w-2xl mx-auto">
          <h2 className={`text-3xl font-bold ${themeClasses.text.primary} text-center mb-8`}>
            {chant.title}
          </h2>

          <div className={`${themeClasses.text.primary} leading-loose text-lg whitespace-pre-wrap select-text`}>
            {chant.content}
          </div>
        </div>
      </div>
    </div>
  )
}
