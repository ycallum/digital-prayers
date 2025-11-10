import { Link, useMatchRoute } from '@tanstack/react-router'
import { BookOpen, Calculator, Settings } from 'lucide-react'
import { Dock, DockIcon } from './ui/dock'
import { useApp } from '../context/AppContext'

export const Navigation = () => {
  const matchRoute = useMatchRoute()
  const { dispatch } = useApp()

  // Type-safe route matching - no manual pathname checking
  const isLibrary = !!matchRoute({ to: '/library', fuzzy: true })
  const isCounter = !!matchRoute({ to: '/counter' })

  return (
    <Dock>
      <Link to="/counter">
        <DockIcon
          className={
            isCounter
              ? 'bg-[var(--color-accent-primary)] text-white'
              : 'text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)]'
          }
        >
          <div
            aria-label="计数器"
            className="w-full h-full flex items-center justify-center"
          >
            <Calculator className="w-6 h-6" />
          </div>
        </DockIcon>
      </Link>

      <Link to="/library">
        <DockIcon
          className={
            isLibrary
              ? 'bg-[var(--color-accent-primary)] text-white'
              : 'text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)]'
          }
        >
          <div
            aria-label="经文库"
            className="w-full h-full flex items-center justify-center"
          >
            <BookOpen className="w-6 h-6" />
          </div>
        </DockIcon>
      </Link>

      <button onClick={() => dispatch({ type: 'TOGGLE_SETTINGS' })}>
        <DockIcon
          className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)]"
        >
          <div
            aria-label="设置"
            className="w-full h-full flex items-center justify-center"
          >
            <Settings className="w-6 h-6" />
          </div>
        </DockIcon>
      </button>
    </Dock>
  )
}
