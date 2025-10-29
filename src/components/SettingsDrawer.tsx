import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { useState } from 'react';
import type { VisualizationMode, ThemeType } from '../types';
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
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => dispatch({ type: 'TOGGLE_SETTINGS' })}
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed top-0 right-0 h-full w-full max-w-md ${theme.background} shadow-2xl z-50 overflow-y-auto ${theme.transition}`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-xl font-semibold ${theme.text.primary} ${theme.transition}`}>设置</h2>
                <button
                  onClick={() => dispatch({ type: 'TOGGLE_SETTINGS' })}
                  className={`p-2 rounded-lg ${theme.button.hover} ${theme.transition}`}
                  aria-label="Close settings"
                >
                  <X className={`w-5 h-5 ${theme.text.tertiary} ${theme.transition}`} />
                </button>
              </div>

              <div className="space-y-6">
                <section>
                  <h3 className={`text-lg font-semibold ${theme.text.primary} mb-3 ${theme.transition}`}>念珠设置</h3>
                  <div className="space-y-2">
                    {[
                      { value: 'full', label: '全圆满 (108)', count: 108 },
                      { value: 'half', label: '半圆满 (54)', count: 54 },
                      { value: 'short', label: '短圆满 (27)', count: 27 },
                    ].map((preset) => (
                      <label
                        key={preset.value}
                        className={`flex items-center gap-3 p-3 rounded-lg border ${theme.border} ${theme.button.hover} cursor-pointer ${theme.transition}`}
                      >
                        <input
                          type="radio"
                          name="preset"
                          value={preset.value}
                          checked={state.selectedPreset === preset.value}
                          onChange={() => handlePresetChange(preset.value as 'full' | 'half' | 'short')}
                          className="w-4 h-4 accent-[var(--color-progress)] focus:ring-2 focus:ring-[var(--color-progress)]"
                        />
                        <span className={`${theme.text.primary} ${theme.transition}`}>{preset.label}</span>
                      </label>
                    ))}

                    <label className={`flex items-center gap-3 p-3 rounded-lg border ${theme.border} ${theme.button.hover} cursor-pointer ${theme.transition}`}>
                      <input
                        type="radio"
                        name="preset"
                        value="custom"
                        checked={state.selectedPreset === 'custom'}
                        onChange={() => handlePresetChange('custom')}
                        className="w-4 h-4 accent-[var(--color-progress)] focus:ring-2 focus:ring-[var(--color-progress)]"
                      />
                      <span className={`${theme.text.primary} ${theme.transition}`}>自定义</span>
                      <input
                        type="number"
                        min="1"
                        max="9999"
                        value={customInput}
                        onChange={(e) => setCustomInput(e.target.value)}
                        onBlur={handleCustomSubmit}
                        disabled={state.selectedPreset !== 'custom'}
                        className={`ml-auto w-20 px-2 py-1 text-sm ${theme.text.primary} ${theme.background} border ${theme.border} rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-progress)] disabled:opacity-50 ${theme.transition}`}
                      />
                    </label>
                  </div>
                </section>

                <div className={`border-b ${theme.border}`} />

                <section>
                  <h3 className={`text-lg font-semibold ${theme.text.primary} mb-3 ${theme.transition}`}>外观设置</h3>
                  <div className="space-y-4">
                    <div>
                      <label className={`text-sm ${theme.text.secondary} mb-2 block ${theme.transition}`}>可视化模式</label>
                      <div className="space-y-2">
                        {[
                          { value: 'ring', label: '进度环' },
                          { value: 'beads', label: '念珠弧' },
                        ].map((mode) => (
                          <label
                            key={mode.value}
                            className={`flex items-center gap-3 p-3 rounded-lg border ${theme.border} ${theme.button.hover} cursor-pointer ${theme.transition}`}
                          >
                            <input
                              type="radio"
                              name="visualizationMode"
                              value={mode.value}
                              checked={state.visualizationMode === mode.value}
                              onChange={() => dispatch({ type: 'SET_VISUALIZATION_MODE', payload: mode.value as VisualizationMode })}
                              className="w-4 h-4 accent-[var(--color-progress)] focus:ring-2 focus:ring-[var(--color-progress)]"
                            />
                            <span className={`${theme.text.primary} ${theme.transition}`}>{mode.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className={`text-sm ${theme.text.secondary} mb-2 block ${theme.transition}`}>主题</label>
                      <div className="space-y-2">
                        {[
                          { value: 'default', label: '默认', description: '翠玉与木纹' },
                          { value: 'warm', label: '温暖', description: '桃色与奶油' },
                          { value: 'night', label: '夜间', description: '深蓝与灰色' },
                        ].map((themeOption) => (
                          <label
                            key={themeOption.value}
                            className={`flex items-center gap-3 p-3 rounded-lg border ${theme.border} ${theme.button.hover} cursor-pointer ${theme.transition}`}
                          >
                            <input
                              type="radio"
                              name="theme"
                              value={themeOption.value}
                              checked={state.theme === themeOption.value}
                              onChange={() => dispatch({ type: 'SET_THEME', payload: themeOption.value as ThemeType })}
                              className="w-4 h-4 accent-[var(--color-progress)] focus:ring-2 focus:ring-[var(--color-progress)]"
                            />
                            <div className="flex-1">
                              <div className={`${theme.text.primary} font-medium ${theme.transition}`}>{themeOption.label}</div>
                              <div className={`text-xs ${theme.text.secondary} ${theme.transition}`}>{themeOption.description}</div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                <div className={`border-b ${theme.border}`} />

                <section>
                  <h3 className={`text-lg font-semibold ${theme.text.primary} mb-3 ${theme.transition}`}>声音设置</h3>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between">
                      <span className={`${theme.text.primary} ${theme.transition}`}>启用音效</span>
                      <button
                        onClick={() => dispatch({ type: 'TOGGLE_AUDIO' })}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                        style={{
                          backgroundColor: state.audioEnabled ? 'var(--color-progress)' : 'var(--color-text-secondary)',
                        }}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            state.audioEnabled ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </label>

                    {state.audioEnabled && (
                      <div>
                        <label className={`text-sm ${theme.text.secondary} mb-2 block ${theme.transition}`}>
                          音量: {state.audioVolume}%
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
                          className="w-full accent-[var(--color-progress)]"
                        />
                      </div>
                    )}
                  </div>
                </section>

                <div className={`border-b ${theme.border}`} />

                <section>
                  <h3 className={`text-lg font-semibold ${theme.text.primary} mb-3 ${theme.transition}`}>会话管理</h3>
                  <div className="space-y-3">
                    {state.isSessionActive && (
                      <div className={`p-3 ${theme.backgroundDark} rounded-lg space-y-1 text-sm ${theme.transition}`}>
                        <div className="flex justify-between">
                          <span className={`${theme.text.secondary} ${theme.transition}`}>当前计数:</span>
                          <span className={`${theme.text.primary} font-semibold ${theme.transition}`}>{state.currentCount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className={`${theme.text.secondary} ${theme.transition}`}>完成回合:</span>
                          <span className={`${theme.text.primary} font-semibold ${theme.transition}`}>
                            {state.currentRound - 1}
                          </span>
                        </div>
                      </div>
                    )}

                    <button
                      onClick={handleReset}
                      className="w-full py-2 px-4 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium"
                    >
                      重置会话
                    </button>
                  </div>
                </section>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
