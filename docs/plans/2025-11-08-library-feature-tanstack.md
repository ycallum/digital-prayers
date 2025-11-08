# Library Feature Implementation Plan (TanStack Router)

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a library mode to the digital prayer app for browsing and reading Buddhist chants, with separate navigation between library and counter modes.

**Architecture:** Transform single-screen counter app into two-mode PWA with bottom dock navigation (MagicUI). Library mode displays chants as cards (list view) with detail reading view. Counter mode remains unchanged. TanStack Router handles type-safe routing with file-based route structure, hardcoded chant data in TypeScript.

**Tech Stack:** React 19, TypeScript, TanStack Router v1, MagicUI (Dock), Tailwind CSS v4, Framer Motion

**Best Practices:**
- Type-safe routing with TanStack Router
- No useEffect - use loaders and React 19 patterns
- File-based routing for better code organization
- Declarative data loading with route loaders

---

## Task 1: Install Dependencies and Setup TanStack Router

**Files:**
- Modify: `package.json`
- Create: `src/routes/__root.tsx`
- Create: `src/routeTree.gen.ts`
- Modify: `src/main.tsx`
- Create: `vite.config.ts` (or modify if exists)

**Step 1: Install TanStack Router and dependencies**

Run:
```bash
npm install @tanstack/react-router
npm install -D @tanstack/router-vite-plugin @tanstack/router-devtools
npm install framer-motion clsx tailwind-merge
```

Expected: Packages installed successfully

**Step 2: Configure Vite plugin for TanStack Router**

Check if `vite.config.ts` exists, if not create it:
```tsx
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'

export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite(),
  ],
})
```

If it exists, add the TanStackRouterVite plugin to the plugins array.

**Step 3: Create root route**

Create `src/routes/__root.tsx`:
```tsx
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Navigation } from '../components/Navigation'

export const Route = createRootRoute({
  component: () => (
    <div className="relative">
      <Outlet />
      <Navigation />
      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </div>
  ),
})
```

**Step 4: Verify TypeScript compilation**

Run: `npm run build`
Expected: Build generates routeTree.gen.ts automatically

**Step 5: Commit**

```bash
git add package.json package-lock.json vite.config.ts src/routes/
git commit -m "feat: install tanstack router and configure vite plugin"
```

---

## Task 2: Create Chant Data Structure

**Files:**
- Create: `src/types/chant.ts`
- Create: `src/data/chants.ts`

**Step 1: Create TypeScript interface for chants**

Create `src/types/chant.ts`:
```tsx
export interface Chant {
  id: string
  title: string
  description: string
  readingTime: number // in minutes
  content: string
}
```

**Step 2: Create chants data file**

Create `src/data/chants.ts`:
```tsx
import { Chant } from '../types/chant'

export const chants: Chant[] = [
  {
    id: 'repentance-samadhi',
    title: '忏悔三昧讨债法',
    description: '业障忏悔与功德回向的修持方法',
    readingTime: 5,
    content: `忏悔三昧讨债法

无论是过去，现在，或是未来。因身，口，意的造作，被我伤害过的(因缘)众生。或因身，口，意的造作，所招感的诸多不顺和苦难不管是身体上的，还是精神上的。我都愿意接受(业果法则)。并惭愧的忏悔因为无明，因未闻四种真谛，无量劫来，我们彼此伤害，冤冤相报，枉受诸苦于六道中，无有出期。我们都希望解脱。

愿一切被我伤害过的众生，无精神的痛苦，无身体的痛苦，愿你们保持快乐。

愿一切与我有因缘的鬼道，非人众生，得闻佛法，投生善道，趋向解脱。

愿一切与我有因缘的人或非人众生，分享我善业的功德。

并回答 善哉!善哉!善哉!

愿一切众生分享我的功德。

回向: 愿以此功德回向给XXX，请尽虚空遍法界十方三世诸神佛、护法圣众加持他，愿他早消业障，顺缘俱足，福慧善根增长，离苦得厂往生净土。`
  }
]

// Helper function for route loaders
export function getChantById(id: string): Chant | undefined {
  return chants.find(c => c.id === id)
}
```

**Step 3: Verify TypeScript compilation**

Run: `npm run build`
Expected: Build succeeds without errors

**Step 4: Commit**

```bash
git add src/types/chant.ts src/data/chants.ts
git commit -m "feat: add chant data structure and repentance chant"
```

---

## Task 3: Create MagicUI Dock Component

**Files:**
- Create: `src/components/ui/dock.tsx`
- Create: `src/lib/utils.ts`

**Step 1: Create utils file for cn helper**

Create `src/lib/utils.ts`:
```tsx
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**Step 2: Create Dock component**

Create `src/components/ui/dock.tsx`:
```tsx
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useRef } from "react"
import { cn } from "../../lib/utils"

interface DockProps {
  className?: string
  children: React.ReactNode
}

interface DockIconProps {
  children: React.ReactNode
  className?: string
}

const Dock = ({ children, className }: DockProps) => {
  return (
    <motion.div
      className={cn(
        "mx-auto flex h-16 items-center gap-4 rounded-2xl px-4",
        "bg-[var(--color-surface)] shadow-lg backdrop-blur-md",
        "fixed bottom-4 left-1/2 -translate-x-1/2 z-50",
        className
      )}
    >
      {children}
    </motion.div>
  )
}

const DockIcon = ({ children, className }: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(Infinity)

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 60, 40])
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 })

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className={cn(
        "flex aspect-square items-center justify-center rounded-full",
        "cursor-pointer transition-colors duration-500",
        className
      )}
    >
      {children}
    </motion.div>
  )
}

export { Dock, DockIcon }
```

**Step 3: Verify TypeScript compilation**

Run: `npm run build`
Expected: Build succeeds without errors

**Step 4: Commit**

```bash
git add src/lib/utils.ts src/components/ui/dock.tsx
git commit -m "feat: add MagicUI dock component"
```

---

## Task 4: Create Library Routes with Loaders

**Files:**
- Create: `src/routes/library/index.tsx`
- Create: `src/routes/library/$id.tsx`
- Create: `src/components/library/ChantCard.tsx`

**Step 1: Create ChantCard component (no hooks needed)**

Create `src/components/library/ChantCard.tsx`:
```tsx
import { Chant } from '../../types/chant'
import { Clock } from 'lucide-react'
import { motion } from 'framer-motion'

interface ChantCardProps {
  chant: Chant
  onClick: () => void
}

export const ChantCard = ({ chant, onClick }: ChantCardProps) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="
        bg-[var(--color-secondary)]
        text-[var(--color-text)]
        rounded-2xl
        shadow-lg
        p-6
        cursor-pointer
        transition-all
        duration-500
        hover:shadow-xl
        relative
      "
    >
      <div className="absolute top-4 right-4 flex items-center gap-1 text-[var(--color-text-secondary)] text-sm">
        <Clock className="w-4 h-4" />
        <span>约{chant.readingTime}分钟</span>
      </div>

      <h2 className="text-2xl font-bold mb-3 pr-24">{chant.title}</h2>
      <p className="text-[var(--color-text-secondary)] leading-relaxed">
        {chant.description}
      </p>
    </motion.div>
  )
}
```

**Step 2: Create library index route with loader**

Create `src/routes/library/index.tsx`:
```tsx
import { createFileRoute, Link } from '@tanstack/react-router'
import { chants } from '../../data/chants'
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
        {chants.map((chant) => (
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
```

**Step 3: Create chant detail route with loader and validation**

Create `src/routes/library/$id.tsx`:
```tsx
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
```

**Step 4: Verify TypeScript compilation**

Run: `npm run build`
Expected: Build succeeds, routeTree.gen.ts updated automatically

**Step 5: Commit**

```bash
git add src/routes/library/ src/components/library/ChantCard.tsx
git commit -m "feat: add library routes with loaders"
```

---

## Task 5: Create Counter Route

**Files:**
- Create: `src/routes/counter/index.tsx`
- Modify: `src/App.tsx` (extract counter logic)

**Step 1: Create counter route**

Create `src/routes/counter/index.tsx`:
```tsx
import { createFileRoute } from '@tanstack/react-router'
import { Header } from '../../components/Header'
import { CountingArea } from '../../components/CountingArea'
import { ProgressRing } from '../../components/ProgressRing'
import { CountDisplay } from '../../components/CountDisplay'
import { SessionTimer } from '../../components/SessionTimer'
import { SettingsDrawer } from '../../components/SettingsDrawer'
import { BackgroundWords } from '../../components/BackgroundWords'
import { CompletionEffect } from '../../components/CompletionEffect'
import { useAppState } from '../../hooks/useAppState'

export const Route = createFileRoute('/counter/')({
  component: CounterComponent,
})

function CounterComponent() {
  const { state } = useAppState()

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      <div
        className="absolute inset-0 transition-all duration-500"
        style={{
          backgroundColor: `var(--color-background)`,
        }}
      >
        <BackgroundWords />

        <div className="relative z-10 h-full flex flex-col">
          <Header />

          <div className="flex-1 flex items-center justify-center relative">
            <ProgressRing
              current={state.count}
              total={state.beadCount}
            />
            <CountingArea />
            <CountDisplay
              count={state.count}
              total={state.beadCount}
              round={state.currentRound}
            />
          </div>

          <div className="pb-24">
            <SessionTimer />
          </div>
        </div>

        <SettingsDrawer />

        {state.showCompletion && <CompletionEffect />}
      </div>
    </div>
  )
}
```

**Step 2: Verify component imports exist**

Check that all imported components exist in their respective files.
Expected: No missing imports

**Step 3: Verify TypeScript compilation**

Run: `npm run build`
Expected: Build succeeds without errors

**Step 4: Commit**

```bash
git add src/routes/counter/
git commit -m "feat: add counter route component"
```

---

## Task 6: Create Index Route Redirect

**Files:**
- Create: `src/routes/index.tsx`

**Step 1: Create index route with redirect**

Create `src/routes/index.tsx`:
```tsx
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    throw redirect({ to: '/library' })
  },
})
```

**Step 2: Verify TypeScript compilation**

Run: `npm run build`
Expected: Build succeeds without errors

**Step 3: Commit**

```bash
git add src/routes/index.tsx
git commit -m "feat: add index route with redirect to library"
```

---

## Task 7: Create Navigation Component with Dock

**Files:**
- Create: `src/components/Navigation.tsx`

**Step 1: Create Navigation component using TanStack Router's useMatchRoute**

Create `src/components/Navigation.tsx`:
```tsx
import { Link, useMatchRoute } from '@tanstack/react-router'
import { BookOpen, Calculator } from 'lucide-react'
import { Dock, DockIcon } from './ui/dock'

export const Navigation = () => {
  const matchRoute = useMatchRoute()

  // Type-safe route matching - no manual pathname checking
  const isLibrary = !!matchRoute({ to: '/library', fuzzy: true })
  const isCounter = !!matchRoute({ to: '/counter' })

  return (
    <Dock>
      <Link to="/library">
        <DockIcon
          className={
            isLibrary
              ? 'bg-[var(--color-primary)] text-white'
              : 'text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]'
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

      <Link to="/counter">
        <DockIcon
          className={
            isCounter
              ? 'bg-[var(--color-primary)] text-white'
              : 'text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]'
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
    </Dock>
  )
}
```

**Step 2: Verify TypeScript compilation**

Run: `npm run build`
Expected: Build succeeds without errors

**Step 3: Commit**

```bash
git add src/components/Navigation.tsx
git commit -m "feat: add navigation component with type-safe routing"
```

---

## Task 8: Update main.tsx and App.tsx

**Files:**
- Modify: `src/main.tsx`
- Modify: `src/App.tsx`

**Step 1: Update main.tsx to use TanStack Router**

Modify `src/main.tsx`:
```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { AppProvider } from './context/AppContext'
import { routeTree } from './routeTree.gen'
import './index.css'

// Create router instance
const router = createRouter({ routeTree })

// Type augmentation for better TypeScript support
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </React.StrictMode>,
)
```

**Step 2: Simplify App.tsx (if it exists)**

If `src/App.tsx` still exists and has content, we can remove it since routing is now handled by TanStack Router's file-based system. Or keep it minimal if needed for other purposes.

Check current App.tsx:
- If it only contains routing logic → Delete it
- If it contains AppProvider or other logic → Extract to appropriate place

**Step 3: Test app navigation**

Run: `npm run dev`
Actions:
1. Visit http://localhost:5173 - should redirect to /library
2. Click counter icon - should navigate to /counter
3. Click library icon - should return to /library
4. Click chant card - should open detail view
5. Click back arrow - should return to library list

Expected: All navigation works smoothly with type safety

**Step 4: Test theme switching**

Actions:
1. Navigate to counter
2. Open settings
3. Switch between themes (jade, warm, night)
4. Navigate to library
Expected: Library respects theme colors

**Step 5: Commit**

```bash
git add src/main.tsx src/App.tsx
git commit -m "feat: integrate tanstack router in main app"
```

---

## Task 9: Add CSS Custom Properties for Surface Color

**Files:**
- Modify: `src/index.css`

**Step 1: Add --color-surface variable to themes**

Add to each theme in `src/index.css`:

For `.theme-default`:
```css
--color-surface: rgba(139, 172, 138, 0.1);
--color-border: rgba(139, 172, 138, 0.2);
```

For `.theme-warm`:
```css
--color-surface: rgba(230, 126, 84, 0.1);
--color-border: rgba(230, 126, 84, 0.2);
```

For `.theme-night`:
```css
--color-surface: rgba(92, 131, 163, 0.15);
--color-border: rgba(92, 131, 163, 0.25);
```

**Step 2: Test theme colors**

Run: `npm run dev`
Actions: Switch between themes and verify dock background adapts

Expected: Dock shows subtle tinted background matching each theme

**Step 3: Commit**

```bash
git add src/index.css
git commit -m "feat: add surface and border color variables for themes"
```

---

## Task 10: Responsive Testing and Polish

**Files:**
- Modify: `src/routes/library/$id.tsx` (if needed)
- Modify: `src/routes/library/index.tsx` (if needed)

**Step 1: Test mobile layout (375px width)**

Run: `npm run dev`
Open DevTools, set viewport to 375px width
Navigate through:
- Library list
- Chant detail
- Counter

Expected: All content readable, no horizontal scroll, dock visible

**Step 2: Test tablet layout (768px width)**

Set viewport to 768px width
Expected: Content centered with max-width, comfortable reading

**Step 3: Test desktop layout (1440px width)**

Set viewport to 1440px width
Expected: Content centered, dock remains at bottom center

**Step 4: Test text readability in detail view**

Read through the chant content
Check:
- Line height comfortable for Chinese text
- Paragraphs clearly separated
- Text selectable
- No awkward wrapping

**Step 5: Adjust typography if needed**

If readability issues found, adjust in library/$id.tsx:
- Line height: `leading-loose` or `leading-relaxed`
- Font size: `text-lg` or `text-base`
- Letter spacing: `tracking-wide` if needed

**Step 6: Test all navigation flows**

Complete user journeys:
1. App opens → library list → detail → back → library
2. App opens → library → dock counter → dock library
3. App opens → library → detail → dock counter → dock library

Expected: No navigation errors, smooth transitions

**Step 7: Commit any polish changes**

```bash
git add .
git commit -m "polish: responsive layout and typography refinements"
```

---

## Task 11: Performance and Final Verification

**Files:**
- None (testing phase)

**Step 1: Test PWA functionality**

Run: `npm run build && npm run preview`
Open in browser
Check:
- App loads and works offline (if service worker configured)
- All routes work in production build
- No console errors
- Route code-splitting working (check Network tab)

Expected: Production build works correctly with automatic code-splitting

**Step 2: Test theme persistence**

Actions:
1. Switch to warm theme in counter
2. Navigate to library
3. Close and reopen app
Expected: Warm theme persists across modes and sessions

**Step 3: Test counter state independence**

Actions:
1. Start counting in counter mode (increment to 10)
2. Navigate to library
3. Navigate back to counter
Expected: Count preserved at 10

**Step 4: Verify type safety**

Run: `npm run build`
Check TypeScript output for any route-related type errors
Expected: No type errors, full type safety across routes

**Step 5: Final commit and tag**

```bash
git add .
git commit -m "feat: complete library feature with tanstack router"
git tag -a v1.1.0 -m "Add library mode with type-safe routing"
```

---

## Benefits of TanStack Router

**Type Safety:**
- Routes are fully typed
- Params, search, loaders all type-safe
- No manual type guards needed

**Performance:**
- Automatic code-splitting per route
- Preloading support
- Better bundle optimization

**Developer Experience:**
- File-based routing (clear structure)
- No useEffect for data loading
- Route loaders run before component renders
- Better error handling with notFoundComponent

**Modern React 19:**
- Declarative data loading (no useEffect)
- Suspense-ready architecture
- Cleaner component code

---

## Testing Checklist

- [ ] Library list displays chant card correctly
- [ ] Chant card shows title, description, reading time
- [ ] Clicking card navigates to detail view
- [ ] Detail view displays full chant text
- [ ] Back button returns to library list
- [ ] Dock navigation works (library ↔ counter)
- [ ] Active tab highlighted in dock (type-safe)
- [ ] Theme switching works in both modes
- [ ] Counter state preserved when switching modes
- [ ] Responsive layout works (mobile, tablet, desktop)
- [ ] Text is readable and selectable in detail view
- [ ] No TypeScript errors
- [ ] Production build works with code-splitting
- [ ] PWA functionality intact
- [ ] No useEffect hooks in route components

---

## Future Enhancements (Out of Scope)

- Search params for filtering chants
- Parallel data loading with route loaders
- Optimistic navigation updates
- Route-based data caching
- Favorites/bookmarks with persistent params
- Categories/tags with search params

