import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { useState } from 'react';
import type { ThemeType } from '../types';
import { getThemeClasses } from '../lib/theme';

export function SettingsDrawer() {
  const { state, dispatch } = useApp();
  const theme = getThemeClasses();
  const [customInput, setCustomInput] = useState(state.customBeadCount.toString());

  const handlePresetChange = (preset: 'full' | 'half' | 'short' | 'custom') => {
    dispatch({ type: 'SET_PRESET', payload: preset });
  };

  const handleCustomSubmit = () => {
    const value = parseInt(customInput, 10);
    if (value >= 1 && value <= 9999) {
      dispatch({ type: 'SET_TOTAL_BEADS', payload: value });
    }
  };

  const handleReset = () => {
    if (confirm('重置当前会话？这将清除所有计数和回合记录。')) {
      dispatch({ type: 'RESET_SESSION' });
    }
  };

  return (
    <AnimatePresence>
      {state.showSettings && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={() => dispatch({ type: 'TOGGLE_SETTINGS' })}
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{
              type: 'spring',
              damping: 30,
              stiffness: 250,
              mass: 0.8
            }}
            className={`
              fixed
              top-0
              right-0
              h-full
              w-full
              max-w-md
              ${theme.background}
              shadow-2xl
              z-50
              overflow-y-auto
              ${theme.transition}
              border-l-4
              border-[var(--color-accent)]
            `}
          >
            {/* Decorative top border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)]/50 to-transparent" />

            <div className="p-8">
              {/* Header */}
              <div className="relative mb-12">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className={`
                        text-xs
                        font-mono
                        uppercase
                        tracking-widest
                        ${theme.text.secondary}
                        mb-3
                      `}
                    >
                      Configuration
                    </motion.div>
                    <motion.h2
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className={`
                        text-4xl
                        font-serif
                        font-bold
                        ${theme.text.primary}
                        ${theme.transition}
                      `}
                    >
                      设置
                    </motion.h2>
                  </div>

                  <motion.button
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    onClick={() => dispatch({ type: 'TOGGLE_SETTINGS' })}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    className={`
                      p-3
                      border-2
                      border-[var(--color-text-secondary)]/20
                      hover:border-[var(--color-accent)]
                      ${theme.transition}
                      mt-1
                    `}
                    aria-label="Close settings"
                  >
                    <X className={`w-5 h-5 ${theme.text.tertiary} ${theme.transition}`} strokeWidth={2.5} />
                  </motion.button>
                </div>

                {/* Decorative underline */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="h-px bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)]/30 to-transparent origin-left"
                />
              </div>

              <div className="space-y-12">
                {/* Bead Settings */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <div className="mb-6">
                    <h3 className={`
                      text-xl
                      font-serif
                      font-bold
                      ${theme.text.primary}
                      mb-2
                      ${theme.transition}
                    `}>
                      念珠设置
                    </h3>
                    <div className="h-px bg-[var(--color-text-secondary)]/20 w-16" />
                  </div>

                  <div className="space-y-3">
                    {[
                      { value: 'full', label: '全圆满', count: 108 },
                      { value: 'half', label: '半圆满', count: 54 },
                      { value: 'short', label: '短圆满', count: 27 },
                    ].map((preset) => (
                      <label
                        key={preset.value}
                        className={`
                          group
                          relative
                          flex
                          items-center
                          gap-4
                          p-4
                          border-l-4
                          ${state.selectedPreset === preset.value ? 'border-[var(--color-accent)]' : 'border-[var(--color-text-secondary)]/20'}
                          bg-[var(--color-secondary)]
                          cursor-pointer
                          ${theme.transition}
                          hover:border-[var(--color-accent)]
                          hover:shadow-md
                          overflow-hidden
                        `}
                      >
                        {/* Gradient overlay */}
                        <div className={`
                          absolute
                          inset-0
                          bg-gradient-to-r
                          from-[var(--color-accent)]/5
                          to-transparent
                          opacity-0
                          ${state.selectedPreset === preset.value ? 'opacity-100' : 'group-hover:opacity-100'}
                          transition-opacity
                          duration-500
                        `} />

                        <input
                          type="radio"
                          name="preset"
                          value={preset.value}
                          checked={state.selectedPreset === preset.value}
                          onChange={() => handlePresetChange(preset.value as 'full' | 'half' | 'short')}
                          className="relative z-10 w-5 h-5 accent-[var(--color-accent)]"
                        />
                        <div className="flex-1 relative z-10">
                          <span className={`${theme.text.primary} ${theme.transition} font-medium`}>
                            {preset.label}
                          </span>
                          <span className={`${theme.text.secondary} ${theme.transition} text-sm ml-2 font-mono`}>
                            ({preset.count})
                          </span>
                        </div>
                      </label>
                    ))}

                    <label className={`
                      group
                      relative
                      flex
                      items-center
                      gap-4
                      p-4
                      border-l-4
                      ${state.selectedPreset === 'custom' ? 'border-[var(--color-accent)]' : 'border-[var(--color-text-secondary)]/20'}
                      bg-[var(--color-secondary)]
                      cursor-pointer
                      ${theme.transition}
                      hover:border-[var(--color-accent)]
                      hover:shadow-md
                      overflow-hidden
                    `}>
                      <div className={`
                        absolute
                        inset-0
                        bg-gradient-to-r
                        from-[var(--color-accent)]/5
                        to-transparent
                        opacity-0
                        ${state.selectedPreset === 'custom' ? 'opacity-100' : 'group-hover:opacity-100'}
                        transition-opacity
                        duration-500
                      `} />

                      <input
                        type="radio"
                        name="preset"
                        value="custom"
                        checked={state.selectedPreset === 'custom'}
                        onChange={() => handlePresetChange('custom')}
                        className="relative z-10 w-5 h-5 accent-[var(--color-accent)]"
                      />
                      <span className={`${theme.text.primary} ${theme.transition} font-medium relative z-10`}>
                        自定义
                      </span>
                      <input
                        type="number"
                        min="1"
                        max="9999"
                        value={customInput}
                        onChange={(e) => setCustomInput(e.target.value)}
                        onBlur={handleCustomSubmit}
                        disabled={state.selectedPreset !== 'custom'}
                        className={`
                          relative
                          z-10
                          ml-auto
                          w-24
                          px-3
                          py-1.5
                          text-sm
                          font-mono
                          ${theme.text.primary}
                          ${theme.background}
                          border-2
                          border-[var(--color-text-secondary)]/30
                          focus:outline-none
                          focus:border-[var(--color-accent)]
                          disabled:opacity-40
                          ${theme.transition}
                        `}
                      />
                    </label>
                  </div>
                </motion.section>

                {/* Divider */}
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-[var(--color-text-secondary)]/30 to-transparent" />
                  <div className="w-1.5 h-1.5 rotate-45 bg-[var(--color-accent)]/40" />
                  <div className="h-px flex-1 bg-gradient-to-l from-[var(--color-text-secondary)]/30 to-transparent" />
                </div>

                {/* Theme Settings */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <div className="mb-6">
                    <h3 className={`
                      text-xl
                      font-serif
                      font-bold
                      ${theme.text.primary}
                      mb-2
                      ${theme.transition}
                    `}>
                      外观设置
                    </h3>
                    <div className="h-px bg-[var(--color-text-secondary)]/20 w-16" />
                  </div>

                  <div className="space-y-3">
                    {[
                      { value: 'default', label: '默认', description: '翠玉与木纹' },
                      { value: 'warm', label: '温暖', description: '桃色与奶油' },
                      { value: 'night', label: '夜间', description: '深蓝与灰色' },
                    ].map((themeOption) => (
                      <label
                        key={themeOption.value}
                        className={`
                          group
                          relative
                          flex
                          items-center
                          gap-4
                          p-4
                          border-l-4
                          ${state.theme === themeOption.value ? 'border-[var(--color-accent)]' : 'border-[var(--color-text-secondary)]/20'}
                          bg-[var(--color-secondary)]
                          cursor-pointer
                          ${theme.transition}
                          hover:border-[var(--color-accent)]
                          hover:shadow-md
                          overflow-hidden
                        `}
                      >
                        <div className={`
                          absolute
                          inset-0
                          bg-gradient-to-r
                          from-[var(--color-accent)]/5
                          to-transparent
                          opacity-0
                          ${state.theme === themeOption.value ? 'opacity-100' : 'group-hover:opacity-100'}
                          transition-opacity
                          duration-500
                        `} />

                        <input
                          type="radio"
                          name="theme"
                          value={themeOption.value}
                          checked={state.theme === themeOption.value}
                          onChange={() => dispatch({ type: 'SET_THEME', payload: themeOption.value as ThemeType })}
                          className="relative z-10 w-5 h-5 accent-[var(--color-accent)]"
                        />
                        <div className="flex-1 relative z-10">
                          <div className={`${theme.text.primary} font-medium ${theme.transition}`}>
                            {themeOption.label}
                          </div>
                          <div className={`text-xs ${theme.text.secondary} ${theme.transition} font-mono mt-0.5`}>
                            {themeOption.description}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </motion.section>

                {/* Divider */}
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-[var(--color-text-secondary)]/30 to-transparent" />
                  <div className="w-1.5 h-1.5 rotate-45 bg-[var(--color-accent)]/40" />
                  <div className="h-px flex-1 bg-gradient-to-l from-[var(--color-text-secondary)]/30 to-transparent" />
                </div>

                {/* Audio Settings */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <div className="mb-6">
                    <h3 className={`
                      text-xl
                      font-serif
                      font-bold
                      ${theme.text.primary}
                      mb-2
                      ${theme.transition}
                    `}>
                      声音设置
                    </h3>
                    <div className="h-px bg-[var(--color-text-secondary)]/20 w-16" />
                  </div>

                  <div className="space-y-6">
                    {/* Audio toggle */}
                    <div className="flex items-center justify-between p-4 border-l-4 border-[var(--color-text-secondary)]/20 bg-[var(--color-secondary)]">
                      <span className={`${theme.text.primary} ${theme.transition} font-medium`}>启用音效</span>
                      <button
                        onClick={() => dispatch({ type: 'TOGGLE_AUDIO' })}
                        className={`
                          relative
                          inline-flex
                          h-7
                          w-12
                          items-center
                          transition-colors
                          duration-300
                          border-2
                          ${state.audioEnabled ? 'border-[var(--color-accent)]' : 'border-[var(--color-text-secondary)]/30'}
                        `}
                        style={{
                          backgroundColor: state.audioEnabled ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                        }}
                      >
                        <span
                          className={`
                            inline-block
                            h-4
                            w-4
                            transform
                            bg-white
                            transition-transform
                            duration-300
                            ${state.audioEnabled ? 'translate-x-6' : 'translate-x-1'}
                          `}
                        />
                      </button>
                    </div>

                    {state.audioEnabled && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-4"
                      >
                        <label className={`text-sm font-mono ${theme.text.secondary} mb-3 block ${theme.transition}`}>
                          音效音量: {state.audioVolume}%
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={state.audioVolume}
                          onChange={(e) =>
                            dispatch({
                              type: 'SET_VOLUME',
                              payload: parseInt(e.target.value, 10),
                            })
                          }
                          className="w-full accent-[var(--color-accent)] h-2"
                        />
                      </motion.div>
                    )}

                    {/* BGM toggle */}
                    <div className="flex items-center justify-between p-4 border-l-4 border-[var(--color-text-secondary)]/20 bg-[var(--color-secondary)]">
                      <span className={`${theme.text.primary} ${theme.transition} font-medium`}>禅意背景音乐</span>
                      <button
                        onClick={() => dispatch({ type: 'TOGGLE_BGM' })}
                        className={`
                          relative
                          inline-flex
                          h-7
                          w-12
                          items-center
                          transition-colors
                          duration-300
                          border-2
                          ${state.bgmEnabled ? 'border-[var(--color-accent)]' : 'border-[var(--color-text-secondary)]/30'}
                        `}
                        style={{
                          backgroundColor: state.bgmEnabled ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                        }}
                      >
                        <span
                          className={`
                            inline-block
                            h-4
                            w-4
                            transform
                            bg-white
                            transition-transform
                            duration-300
                            ${state.bgmEnabled ? 'translate-x-6' : 'translate-x-1'}
                          `}
                        />
                      </button>
                    </div>

                    {state.bgmEnabled && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-4"
                      >
                        <label className={`text-sm font-mono ${theme.text.secondary} mb-3 block ${theme.transition}`}>
                          背景音乐音量: {state.bgmVolume}%
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={state.bgmVolume}
                          onChange={(e) =>
                            dispatch({
                              type: 'SET_BGM_VOLUME',
                              payload: parseInt(e.target.value, 10),
                            })
                          }
                          className="w-full accent-[var(--color-accent)] h-2"
                        />
                      </motion.div>
                    )}
                  </div>
                </motion.section>

                {/* Divider */}
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-[var(--color-text-secondary)]/30 to-transparent" />
                  <div className="w-1.5 h-1.5 rotate-45 bg-[var(--color-accent)]/40" />
                  <div className="h-px flex-1 bg-gradient-to-l from-[var(--color-text-secondary)]/30 to-transparent" />
                </div>

                {/* Session Management */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <div className="mb-6">
                    <h3 className={`
                      text-xl
                      font-serif
                      font-bold
                      ${theme.text.primary}
                      mb-2
                      ${theme.transition}
                    `}>
                      会话管理
                    </h3>
                    <div className="h-px bg-[var(--color-text-secondary)]/20 w-16" />
                  </div>

                  <div className="space-y-4">
                    {state.isSessionActive && (
                      <div className={`
                        p-6
                        border-l-4
                        border-[var(--color-accent)]
                        bg-[var(--color-secondary)]
                        space-y-3
                        ${theme.transition}
                      `}>
                        <div className="flex justify-between items-center">
                          <span className={`text-sm font-mono uppercase tracking-wider ${theme.text.secondary} ${theme.transition}`}>
                            当前计数
                          </span>
                          <span className={`text-2xl font-bold font-mono ${theme.text.primary} ${theme.transition}`}>
                            {state.currentCount}
                          </span>
                        </div>
                        <div className="h-px bg-[var(--color-text-secondary)]/20" />
                        <div className="flex justify-between items-center">
                          <span className={`text-sm font-mono uppercase tracking-wider ${theme.text.secondary} ${theme.transition}`}>
                            完成回合
                          </span>
                          <span className={`text-2xl font-bold font-mono ${theme.text.primary} ${theme.transition}`}>
                            {state.currentRound - 1}
                          </span>
                        </div>
                      </div>
                    )}

                    <button
                      onClick={handleReset}
                      className="
                        group
                        w-full
                        py-4
                        px-6
                        border-l-4
                        border-red-500/50
                        bg-red-50
                        dark:bg-red-950/20
                        text-red-600
                        dark:text-red-400
                        transition-all
                        duration-300
                        font-medium
                        font-mono
                        uppercase
                        tracking-wider
                        text-sm
                        hover:border-red-500
                        hover:bg-red-100
                        dark:hover:bg-red-950/40
                        hover:shadow-lg
                        overflow-hidden
                        relative
                      "
                    >
                      <div className="
                        absolute
                        inset-0
                        bg-gradient-to-r
                        from-red-500/10
                        to-transparent
                        opacity-0
                        group-hover:opacity-100
                        transition-opacity
                        duration-500
                      " />
                      <span className="relative z-10">重置会话</span>
                    </button>
                  </div>
                </motion.section>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
