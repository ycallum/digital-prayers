import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <div className="relative">
      <Outlet />
      {/* Navigation will be added in Task 7 */}
      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </div>
  ),
})
