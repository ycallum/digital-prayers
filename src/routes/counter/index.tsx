import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { CountingArea } from '../../components/CountingArea'
import { SessionTimer } from '../../components/SessionTimer'
import { SettingsDrawer } from '../../components/SettingsDrawer'
import { BackgroundWords } from '../../components/BackgroundWords'
import { useApp } from '../../context/AppContext'
import { audioManager } from '../../lib/audio'
import { applyTheme, getThemeClasses } from '../../lib/theme'

export const Route = createFileRoute('/counter/')({
  component: CounterComponent,
})

function CounterComponent() {
  const { state } = useApp()
  const themeClasses = getThemeClasses()

  // Initialize audio on mount
  useEffect(() => {
    audioManager.init()
  }, [])

  // Apply theme changes
  useEffect(() => {
    applyTheme(state.theme)
  }, [state.theme])

  // Handle BGM toggle
  useEffect(() => {
    if (state.bgmEnabled) {
      audioManager.playBgm(state.bgmVolume / 100)
    } else {
      audioManager.pauseBgm()
    }
  }, [state.bgmEnabled])

  // Handle BGM volume changes
  useEffect(() => {
    if (state.bgmEnabled) {
      audioManager.setBgmVolume(state.bgmVolume / 100)
    }
  }, [state.bgmVolume, state.bgmEnabled])

  return (
    <div
      className={`min-h-screen h-screen ${themeClasses.background} ${themeClasses.transition} flex flex-col relative ${
        state.brightnessMode === 'dimmed' ? 'brightness-75' : ''
      }`}
      style={{
        minHeight: '-webkit-fill-available',
      }}
    >
      <BackgroundWords />
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex-1 flex items-center justify-center pb-24">
          <div className="flex flex-col items-center">
            <CountingArea />
            <SessionTimer />
          </div>
        </div>
        <SettingsDrawer />
      </div>
    </div>
  )
}
