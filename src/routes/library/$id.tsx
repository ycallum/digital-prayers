import { createFileRoute, notFound } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { getChantById } from '../../data/chants'

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
    return (
      <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
        <p className="text-[var(--color-text)]">经文未找到</p>
      </div>
    )
  },
})

function ChantDetailComponent() {
  const { chant } = Route.useLoaderData()
  const navigate = Route.useNavigate()

  return (
    <div className="min-h-screen bg-[var(--color-background)] pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-[var(--color-background)] border-b border-[var(--color-border)] z-10">
        <div className="px-4 py-4 flex items-center gap-4 max-w-2xl mx-auto">
          <button
            onClick={() => navigate({ to: '/library' })}
            className="text-[var(--color-primary)] hover:opacity-80 transition-opacity"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold text-[var(--color-text)] truncate">
            {chant.title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-8 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-[var(--color-text)] text-center mb-8">
          {chant.title}
        </h2>

        <div className="text-[var(--color-text)] leading-loose text-lg whitespace-pre-wrap select-text">
          {chant.content}
        </div>
      </div>
    </div>
  )
}
