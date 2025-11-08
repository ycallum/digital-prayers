# Library Feature Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a library mode to the digital prayer app for browsing and reading Buddhist chants, with separate navigation between library and counter modes.

**Architecture:** Transform single-screen counter app into two-mode PWA with bottom dock navigation (MagicUI). Library mode displays chants as cards (list view) with detail reading view. Counter mode remains unchanged. React Router handles navigation, hardcoded chant data in TypeScript.

**Tech Stack:** React 19, TypeScript, React Router v6, MagicUI (Dock), Tailwind CSS v4, Framer Motion

---

## Task 1: Install Dependencies and Setup Routing

**Files:**
- Modify: `package.json`
- Modify: `src/main.tsx`
- Modify: `src/App.tsx`

**Step 1: Install React Router v6**

Run:
```bash
npm install react-router-dom
```

Expected: Package installed successfully

**Step 2: Install MagicUI dependencies**

Run:
```bash
npm install framer-motion clsx tailwind-merge
```

Expected: Packages installed successfully

**Step 3: Wrap app with BrowserRouter in main.tsx**

Modify `src/main.tsx`:
```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
```

**Step 4: Verify app still runs**

Run: `npm run dev`
Expected: App loads without errors at http://localhost:5173

**Step 5: Commit**

```bash
git add package.json package-lock.json src/main.tsx
git commit -m "feat: install react-router and magicui dependencies"
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
```

**Step 3: Verify data imports without errors**

Create temporary test in `src/App.tsx`:
```tsx
import { chants } from './data/chants'
console.log('Chants loaded:', chants.length)
```

Run: `npm run dev`
Expected: Console shows "Chants loaded: 1"

**Step 4: Remove test console.log**

Remove the test line from `src/App.tsx`

**Step 5: Commit**

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

## Task 4: Create Library List View Component

**Files:**
- Create: `src/components/library/LibraryListView.tsx`
- Create: `src/components/library/ChantCard.tsx`

**Step 1: Create ChantCard component**

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

**Step 2: Create LibraryListView component**

Create `src/components/library/LibraryListView.tsx`:
```tsx
import { useNavigate } from 'react-router-dom'
import { chants } from '../../data/chants'
import { ChantCard } from './ChantCard'

export const LibraryListView = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[var(--color-background)] pb-24 px-4 pt-8 md:px-8 md:max-w-3xl md:mx-auto lg:max-w-4xl">
      <h1 className="text-3xl font-bold text-[var(--color-text)] mb-8">经文库</h1>

      <div className="space-y-4">
        {chants.map((chant) => (
          <ChantCard
            key={chant.id}
            chant={chant}
            onClick={() => navigate(`/library/${chant.id}`)}
          />
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

**Step 3: Verify TypeScript compilation**

Run: `npm run build`
Expected: Build succeeds without errors

**Step 4: Commit**

```bash
git add src/components/library/
git commit -m "feat: add library list view and chant card components"
```

---

## Task 5: Create Chant Detail Reading View

**Files:**
- Create: `src/components/library/ChantDetailView.tsx`

**Step 1: Create ChantDetailView component**

Create `src/components/library/ChantDetailView.tsx`:
```tsx
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { chants } from '../../data/chants'

export const ChantDetailView = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const chant = chants.find(c => c.id === id)

  if (!chant) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
        <p className="text-[var(--color-text)]">经文未找到</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)] pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-[var(--color-background)] border-b border-[var(--color-border)] z-10">
        <div className="px-4 py-4 flex items-center gap-4 max-w-2xl mx-auto">
          <button
            onClick={() => navigate('/library')}
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

**Step 2: Verify TypeScript compilation**

Run: `npm run build`
Expected: Build succeeds without errors

**Step 3: Commit**

```bash
git add src/components/library/ChantDetailView.tsx
git commit -m "feat: add chant detail reading view"
```

---

## Task 6: Wrap Existing Counter in Route Component

**Files:**
- Create: `src/components/counter/CounterView.tsx`
- Modify: `src/App.tsx`

**Step 1: Extract current App content into CounterView**

Create `src/components/counter/CounterView.tsx`:
```tsx
import { Header } from '../Header'
import { CountingArea } from '../CountingArea'
import { ProgressRing } from '../ProgressRing'
import { CountDisplay } from '../CountDisplay'
import { SessionTimer } from '../SessionTimer'
import { SettingsDrawer } from '../SettingsDrawer'
import { BackgroundWords } from '../BackgroundWords'
import { CompletionEffect } from '../CompletionEffect'
import { useAppState } from '../../hooks/useAppState'

export const CounterView = () => {
  const { state, dispatch } = useAppState()

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

**Step 2: Verify component exports exist**

Check that all imported components exist in their respective files.
Expected: No missing imports

**Step 3: Verify TypeScript compilation**

Run: `npm run build`
Expected: Build succeeds without errors

**Step 4: Commit**

```bash
git add src/components/counter/CounterView.tsx
git commit -m "feat: extract counter into route component"
```

---

## Task 7: Create Navigation Component with Dock

**Files:**
- Create: `src/components/Navigation.tsx`

**Step 1: Create Navigation component with dock**

Create `src/components/Navigation.tsx`:
```tsx
import { useLocation, useNavigate } from 'react-router-dom'
import { BookOpen, Calculator } from 'lucide-react'
import { Dock, DockIcon } from './ui/dock'

export const Navigation = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const isLibrary = location.pathname.startsWith('/library')
  const isCounter = location.pathname === '/counter'

  return (
    <Dock>
      <DockIcon
        className={
          isLibrary
            ? 'bg-[var(--color-primary)] text-white'
            : 'text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]'
        }
      >
        <button
          onClick={() => navigate('/library')}
          aria-label="经文库"
          className="w-full h-full flex items-center justify-center"
        >
          <BookOpen className="w-6 h-6" />
        </button>
      </DockIcon>

      <DockIcon
        className={
          isCounter
            ? 'bg-[var(--color-primary)] text-white'
            : 'text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]'
        }
      >
        <button
          onClick={() => navigate('/counter')}
          aria-label="计数器"
          className="w-full h-full flex items-center justify-center"
        >
          <Calculator className="w-6 h-6" />
        </button>
      </DockIcon>
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
git commit -m "feat: add navigation component with dock"
```

---

## Task 8: Update App.tsx with Routing

**Files:**
- Modify: `src/App.tsx`

**Step 1: Replace App.tsx with routing structure**

Modify `src/App.tsx`:
```tsx
import { Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { LibraryListView } from './components/library/LibraryListView'
import { ChantDetailView } from './components/library/ChantDetailView'
import { CounterView } from './components/counter/CounterView'
import { Navigation } from './components/Navigation'

function App() {
  return (
    <AppProvider>
      <div className="relative">
        <Routes>
          <Route path="/" element={<Navigate to="/library" replace />} />
          <Route path="/library" element={<LibraryListView />} />
          <Route path="/library/:id" element={<ChantDetailView />} />
          <Route path="/counter" element={<CounterView />} />
        </Routes>

        <Navigation />
      </div>
    </AppProvider>
  )
}

export default App
```

**Step 2: Test app navigation**

Run: `npm run dev`
Actions:
1. Visit http://localhost:5173 - should redirect to /library
2. Click counter icon - should navigate to /counter
3. Click library icon - should return to /library
4. Click chant card - should open detail view
5. Click back arrow - should return to library list

Expected: All navigation works smoothly

**Step 3: Test theme switching**

Actions:
1. Navigate to counter
2. Open settings
3. Switch between themes (jade, warm, night)
4. Navigate to library
Expected: Library respects theme colors

**Step 4: Commit**

```bash
git add src/App.tsx
git commit -m "feat: implement routing and navigation"
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
- Modify: `src/components/library/ChantDetailView.tsx` (if needed)
- Modify: `src/components/library/LibraryListView.tsx` (if needed)

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

If readability issues found, adjust in ChantDetailView.tsx:
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

Expected: Production build works correctly

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

**Step 4: Lighthouse audit (optional)**

Run Lighthouse in Chrome DevTools
Check:
- Performance score
- Accessibility score
- PWA checklist

Expected: Reasonable scores (>80 in most categories)

**Step 5: Final commit and tag**

```bash
git add .
git commit -m "feat: complete library feature implementation"
git tag -a v1.1.0 -m "Add library mode for reading Buddhist chants"
```

---

## Testing Checklist

- [ ] Library list displays chant card correctly
- [ ] Chant card shows title, description, reading time
- [ ] Clicking card navigates to detail view
- [ ] Detail view displays full chant text
- [ ] Back button returns to library list
- [ ] Dock navigation works (library ↔ counter)
- [ ] Active tab highlighted in dock
- [ ] Theme switching works in both modes
- [ ] Counter state preserved when switching modes
- [ ] Responsive layout works (mobile, tablet, desktop)
- [ ] Text is readable and selectable in detail view
- [ ] No TypeScript errors
- [ ] Production build works
- [ ] PWA functionality intact

---

## Future Enhancements (Out of Scope)

- Favorites/bookmarks for chants
- Search functionality
- Categories/tags for organizing chants
- Reading progress tracking
- Dedication name customization
- Additional chants in library
- Link counter to active chant practice
- Reading history

