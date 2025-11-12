import { Link, useMatchRoute, useNavigate } from '@tanstack/react-router'
import { Home, BookOpen, Calculator, Settings } from 'lucide-react'
import { FloatingDock } from './ui/floating-dock'
import { useApp } from '../context/AppContext'

export const Navigation = () => {
  const matchRoute = useMatchRoute()
  const navigate = useNavigate()
  const { dispatch } = useApp()

  // Type-safe route matching - no manual pathname checking
  const isLibrary = !!matchRoute({ to: '/library', fuzzy: true })
  const isCounter = !!matchRoute({ to: '/counter' })
  const isHome = isCounter // Counter is the home page

  return (
    <FloatingDock>
      <button
        onClick={() => navigate({ to: '/counter' })}
        aria-label="主页"
        className={`w-full h-full flex items-center justify-center rounded-full touch-manipulation transition-all duration-200 active:scale-90 ${
          isHome
            ? 'bg-[var(--color-accent-secondary)] text-white shadow-lg'
            : 'text-[var(--color-text-primary)] hover:bg-[var(--color-button-hover)] hover:text-[var(--color-accent-secondary)]'
        }`}
      >
        <Home className="w-5 h-5" strokeWidth={2.5} />
      </button>

      <Link
        to="/counter"
        aria-label="计数器"
        className={`w-full h-full flex items-center justify-center rounded-full touch-manipulation transition-all duration-200 active:scale-90 ${
          isCounter
            ? 'bg-[var(--color-accent-secondary)] text-white shadow-lg'
            : 'text-[var(--color-text-primary)] hover:bg-[var(--color-button-hover)] hover:text-[var(--color-accent-secondary)]'
        }`}
      >
        <Calculator className="w-5 h-5" strokeWidth={2.5} />
      </Link>

      <Link
        to="/library"
        aria-label="经文库"
        className={`w-full h-full flex items-center justify-center rounded-full touch-manipulation transition-all duration-200 active:scale-90 ${
          isLibrary
            ? 'bg-[var(--color-accent-secondary)] text-white shadow-lg'
            : 'text-[var(--color-text-primary)] hover:bg-[var(--color-button-hover)] hover:text-[var(--color-accent-secondary)]'
        }`}
      >
        <BookOpen className="w-5 h-5" strokeWidth={2.5} />
      </Link>

      <button
        onClick={() => dispatch({ type: 'TOGGLE_SETTINGS' })}
        aria-label="设置"
        className="w-full h-full flex items-center justify-center rounded-full touch-manipulation transition-all duration-200 text-[var(--color-text-primary)] hover:bg-[var(--color-button-hover)] hover:text-[var(--color-accent-secondary)] active:scale-90"
      >
        <Settings className="w-5 h-5" strokeWidth={2.5} />
      </button>
    </FloatingDock>
  )
}
