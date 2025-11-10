import { createFileRoute, Link } from '@tanstack/react-router'
import { chants } from '../../data/chants'
import { Chant } from '../../types/chant'
import { ChantCard } from '../../components/library/ChantCard'
import { BackgroundWords } from '../../components/BackgroundWords'
import { useApp } from '../../context/AppContext'
import { getThemeClasses } from '../../lib/theme'

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
      className={`min-h-screen ${themeClasses.background} ${themeClasses.transition} relative ${
        state.brightnessMode === 'dimmed' ? 'brightness-75' : ''
      }`}
      style={{
        minHeight: '-webkit-fill-available',
      }}
    >
      <BackgroundWords />
      <div className="relative z-10 pb-24 px-4 pt-8 md:px-8 md:max-w-3xl md:mx-auto lg:max-w-4xl">
        <h1 className={`text-3xl font-bold ${themeClasses.textPrimary} mb-8`}>经文库</h1>

      <div className="space-y-4">
        {chants.map((chant: Chant) => (
          <Link
            key={chant.id}
            to="/library/$id"
            params={{ id: chant.id }}
          >
            <ChantCard
              chant={chant}
              onClick={() => {}}
            />
          </Link>
        ))}
      </div>

        {chants.length === 1 && (
          <p className={`text-center ${themeClasses.textSecondary} mt-8`}>
            更多经文即将到来
          </p>
        )}
      </div>
    </div>
  )
}
