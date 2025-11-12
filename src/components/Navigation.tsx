import { Link, useMatchRoute } from '@tanstack/react-router'
import { BookOpen, Calculator, Settings } from 'lucide-react'
import { FloatingDock } from './ui/floating-dock'
import { useApp } from '../context/AppContext'

export const Navigation = () => {
  const matchRoute = useMatchRoute()
  const { dispatch } = useApp()

  // Type-safe route matching - no manual pathname checking
  const isLibrary = !!matchRoute({ to: '/library', fuzzy: true })
  const isCounter = !!matchRoute({ to: '/counter' })

  return (
    <FloatingDock>
      <Link to="/counter">
        <div
          aria-label="计数器"
          className={`w-full h-full flex items-center justify-center rounded-full ${
            isCounter
              ? 'bg-[var(--color-accent-primary)] text-white'
              : 'text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)]'
          }`}
        >
          <Calculator className="w-6 h-6" />
        </div>
      </Link>

      <Link to="/library">
        <div
          aria-label="经文库"
          className={`w-full h-full flex items-center justify-center rounded-full ${
            isLibrary
              ? 'bg-[var(--color-accent-primary)] text-white'
              : 'text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)]'
          }`}
        >
          <BookOpen className="w-6 h-6" />
        </div>
      </Link>

      <button onClick={() => dispatch({ type: 'TOGGLE_SETTINGS' })}>
        <div
          aria-label="设置"
          className="w-full h-full flex items-center justify-center rounded-full text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)]"
        >
          <Settings className="w-6 h-6" />
        </div>
      </button>
    </FloatingDock>
  )
}
