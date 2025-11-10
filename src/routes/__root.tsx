import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Navigation } from '../components/Navigation'
import { AppEffects } from '../components/AppEffects'

function RootComponent() {
  return (
    <div className="relative">
      <AppEffects />
      <Outlet />
      <Navigation />
      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </div>
  )
}

export const Route = createRootRoute({
  component: RootComponent,
})
