import { createFileRoute, Link } from '@tanstack/react-router'
import { chants } from '../../data/chants'
import { Chant } from '../../types/chant'
import { ChantCard } from '../../components/library/ChantCard'

export const Route = createFileRoute('/library/')({
  loader: () => {
    // Loader runs before component - no useEffect needed
    return { chants }
  },
  component: LibraryIndexComponent,
})

function LibraryIndexComponent() {
  const { chants } = Route.useLoaderData()

  return (
    <div className="min-h-screen bg-[var(--color-background)] pb-24 px-4 pt-8 md:px-8 md:max-w-3xl md:mx-auto lg:max-w-4xl">
      <h1 className="text-3xl font-bold text-[var(--color-text)] mb-8">经文库</h1>

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
        <p className="text-center text-[var(--color-text-secondary)] mt-8">
          更多经文即将到来
        </p>
      )}
    </div>
  )
}
