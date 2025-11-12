import { createFileRoute, notFound } from '@tanstack/react-router'
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
      <div className="relative z-10 pb-24 px-6 pt-8 max-w-2xl mx-auto">
        <h1 className={`text-3xl font-bold ${themeClasses.text.primary} text-center mb-8`}>
          {chant.title}
        </h1>

        <div className={`${themeClasses.text.primary} leading-loose text-lg whitespace-pre-wrap select-text`}>
          {chant.content}
        </div>
      </div>
    </div>
  )
}
