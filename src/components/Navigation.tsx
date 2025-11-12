import { Link, useMatchRoute, useNavigate } from '@tanstack/react-router'
import { ArrowLeft, BookOpen, Calculator, Settings } from 'lucide-react'
import { FloatingDock } from './ui/floating-dock'
import { useApp } from '../context/AppContext'

export const Navigation = () => {
  const matchRoute = useMatchRoute()
  const navigate = useNavigate()
  const { dispatch } = useApp()

  // Type-safe route matching - no manual pathname checking
  const isLibrary = !!matchRoute({ to: '/library', fuzzy: true })
  const isCounter = !!matchRoute({ to: '/counter' })
  const isLibraryDetail = !!matchRoute({ to: '/library/$id' })

  return (
    <FloatingDock>
      {isLibraryDetail && (
        <button
          onClick={() => navigate({ to: '/library' })}
          className="touch-manipulation"
        >
          <div
            aria-label="返回"
            className="w-full h-full flex items-center justify-center rounded-full text-[var(--color-text-primary)] hover:bg-[var(--color-button-hover)] hover:text-[var(--color-accent-primary)] transition-all duration-200"
          >
            <ArrowLeft className="w-6 h-6" strokeWidth={2.5} />
          </div>
        </button>
      )}

      <Link to="/counter" className="touch-manipulation">
        <div
          aria-label="计数器"
          className={`w-full h-full flex items-center justify-center rounded-full transition-all duration-200 ${
            isCounter
              ? 'bg-[var(--color-accent-primary)] text-white shadow-md'
              : 'text-[var(--color-text-primary)] hover:bg-[var(--color-button-hover)] hover:text-[var(--color-accent-primary)]'
          }`}
        >
          <Calculator className="w-6 h-6" strokeWidth={2.5} />
        </div>
      </Link>

      <Link to="/library" className="touch-manipulation">
        <div
          aria-label="经文库"
          className={`w-full h-full flex items-center justify-center rounded-full transition-all duration-200 ${
            isLibrary
              ? 'bg-[var(--color-accent-primary)] text-white shadow-md'
              : 'text-[var(--color-text-primary)] hover:bg-[var(--color-button-hover)] hover:text-[var(--color-accent-primary)]'
          }`}
        >
          <BookOpen className="w-6 h-6" strokeWidth={2.5} />
        </div>
      </Link>

      <button
        onClick={() => dispatch({ type: 'TOGGLE_SETTINGS' })}
        className="touch-manipulation"
      >
        <div
          aria-label="设置"
          className="w-full h-full flex items-center justify-center rounded-full text-[var(--color-text-primary)] hover:bg-[var(--color-button-hover)] hover:text-[var(--color-accent-primary)] transition-all duration-200"
        >
          <Settings className="w-6 h-6" strokeWidth={2.5} />
        </div>
      </button>
    </FloatingDock>
  )
}
