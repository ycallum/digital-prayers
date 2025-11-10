import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Navigation } from '../components/Navigation'
import { AppEffects } from '../components/AppEffects'
import { SettingsDrawer } from '../components/SettingsDrawer'

function RootComponent() {
  return (
    <div className="relative">
      <AppEffects />
      <Outlet />
      <Navigation />
      <SettingsDrawer />
      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </div>
  )
}

export const Route = createRootRoute({
  component: RootComponent,
})
