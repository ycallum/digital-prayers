import { useEffect } from 'react'
import { useApp } from '../context/AppContext'
import { audioManager } from '../lib/audio'
import { applyTheme } from '../lib/theme'

/**
 * Component to handle global app effects (audio, theme)
 * Separated from root route to properly access AppContext
 */
export function AppEffects() {
  const { state } = useApp()

  // Initialize audio on mount
  useEffect(() => {
    audioManager.init()
  }, [])

  // Apply theme changes
  useEffect(() => {
    applyTheme(state.theme)
  }, [state.theme])

  // Control BGM playback
  useEffect(() => {
    if (state.bgmEnabled) {
      audioManager.playBgm(state.bgmVolume / 100)
    } else {
      audioManager.pauseBgm()
    }
  }, [state.bgmEnabled, state.bgmVolume])

  // Control BGM volume
  useEffect(() => {
    if (state.bgmEnabled) {
      audioManager.setBgmVolume(state.bgmVolume / 100)
    }
  }, [state.bgmVolume, state.bgmEnabled])

  return null
}
