import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { useState } from 'react';
import type { VisualizationMode, ThemeType } from '../types';
import { getThemeColors } from '../lib/theme';

export function SettingsDrawer() {
  const { state, dispatch } = useApp();
  const themeColors = getThemeColors(state.theme);
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
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => dispatch({ type: 'TOGGLE_SETTINGS' })}
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed top-0 right-0 h-full w-full max-w-md ${themeColors.background} shadow-2xl z-50 overflow-y-auto transition-colors duration-500`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-xl font-semibold ${themeColors.text.primary} transition-colors duration-500`}>设置</h2>
                <button
                  onClick={() => dispatch({ type: 'TOGGLE_SETTINGS' })}
                  className={`p-2 rounded-lg ${themeColors.button.hover} transition-colors`}
                  aria-label="Close settings"
                >
                  <X className={`w-5 h-5 ${themeColors.text.tertiary}`} />
                </button>
              </div>

              <div className="space-y-6">
                <section>
                  <h3 className={`text-lg font-semibold ${themeColors.text.primary} mb-3 transition-colors duration-500`}>念珠设置</h3>
                  <div className="space-y-2">
                    {[
                      { value: 'full', label: '全圆满 (108)', count: 108 },
                      { value: 'half', label: '半圆满 (54)', count: 54 },
                      { value: 'short', label: '短圆满 (27)', count: 27 },
                    ].map((preset) => (
                      <label
                        key={preset.value}
                        className={`flex items-center gap-3 p-3 rounded-lg border ${themeColors.text.secondary}/30 ${themeColors.button.hover} cursor-pointer transition-colors`}
                      >
                        <input
                          type="radio"
                          name="preset"
                          value={preset.value}
                          checked={state.selectedPreset === preset.value}
                          onChange={() => handlePresetChange(preset.value as 'full' | 'half' | 'short')}
                          className={`w-4 h-4 ${themeColors.progress} focus:ring-jade-300`}
                        />
                        <span className={themeColors.text.primary}>{preset.label}</span>
                      </label>
                    ))}

                    <label className={`flex items-center gap-3 p-3 rounded-lg border ${themeColors.text.secondary}/30 ${themeColors.button.hover} cursor-pointer transition-colors`}>
                      <input
                        type="radio"
                        name="preset"
                        value="custom"
                        checked={state.selectedPreset === 'custom'}
                        onChange={() => handlePresetChange('custom')}
                        className={`w-4 h-4 ${themeColors.progress} focus:ring-jade-300`}
                      />
                      <span className={themeColors.text.primary}>自定义</span>
                      <input
                        type="number"
                        min="1"
                        max="9999"
                        value={customInput}
                        onChange={(e) => setCustomInput(e.target.value)}
                        onBlur={handleCustomSubmit}
                        disabled={state.selectedPreset !== 'custom'}
                        className={`ml-auto w-20 px-2 py-1 text-sm border ${themeColors.text.secondary}/30 rounded focus:outline-none focus:ring-2 focus:ring-jade-300 disabled:opacity-50`}
                      />
                    </label>
                  </div>
                </section>

                <div className={`border-b ${themeColors.text.secondary}/30`} />

                <section>
                  <h3 className={`text-lg font-semibold ${themeColors.text.primary} mb-3 transition-colors duration-500`}>外观设置</h3>
                  <div className="space-y-4">
                    <div>
                      <label className={`text-sm ${themeColors.text.secondary} mb-2 block transition-colors duration-500`}>可视化模式</label>
                      <div className="space-y-2">
                        {[
                          { value: 'ring', label: '进度环' },
                          { value: 'beads', label: '念珠弧' },
                        ].map((mode) => (
                          <label
                            key={mode.value}
                            className={`flex items-center gap-3 p-3 rounded-lg border ${themeColors.text.secondary}/30 ${themeColors.button.hover} cursor-pointer transition-colors`}
                          >
                            <input
                              type="radio"
                              name="visualizationMode"
                              value={mode.value}
                              checked={state.visualizationMode === mode.value}
                              onChange={() => dispatch({ type: 'SET_VISUALIZATION_MODE', payload: mode.value as VisualizationMode })}
                              className={`w-4 h-4 ${themeColors.progress} focus:ring-jade-300`}
                            />
                            <span className={themeColors.text.primary}>{mode.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className={`text-sm ${themeColors.text.secondary} mb-2 block transition-colors duration-500`}>主题</label>
                      <div className="space-y-2">
                        {[
                          { value: 'default', label: '默认', description: '翠玉与木纹' },
                          { value: 'warm', label: '温暖', description: '桃色与奶油' },
                          { value: 'night', label: '夜间', description: '深蓝与灰色' },
                        ].map((theme) => (
                          <label
                            key={theme.value}
                            className={`flex items-center gap-3 p-3 rounded-lg border ${themeColors.text.secondary}/30 ${themeColors.button.hover} cursor-pointer transition-colors`}
                          >
                            <input
                              type="radio"
                              name="theme"
                              value={theme.value}
                              checked={state.theme === theme.value}
                              onChange={() => dispatch({ type: 'SET_THEME', payload: theme.value as ThemeType })}
                              className={`w-4 h-4 ${themeColors.progress} focus:ring-jade-300`}
                            />
                            <div className="flex-1">
                              <div className={`${themeColors.text.primary} font-medium transition-colors duration-500`}>{theme.label}</div>
                              <div className={`text-xs ${themeColors.text.secondary} transition-colors duration-500`}>{theme.description}</div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                <div className={`border-b ${themeColors.text.secondary}/30`} />

                <section>
                  <h3 className={`text-lg font-semibold ${themeColors.text.primary} mb-3 transition-colors duration-500`}>声音设置</h3>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between">
                      <span className={`${themeColors.text.primary} transition-colors duration-500`}>启用音效</span>
                      <button
                        onClick={() => dispatch({ type: 'TOGGLE_AUDIO' })}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          state.audioEnabled ? themeColors.progress.replace('text-', 'bg-') : themeColors.text.secondary.replace('text-', 'bg-')
                        }`}
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
                        <label className={`text-sm ${themeColors.text.secondary} mb-2 block transition-colors duration-500`}>
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
                          className="w-full accent-jade-300"
                        />
                      </div>
                    )}
                  </div>
                </section>

                <div className={`border-b ${themeColors.text.secondary}/30`} />

                <section>
                  <h3 className={`text-lg font-semibold ${themeColors.text.primary} mb-3 transition-colors duration-500`}>会话管理</h3>
                  <div className="space-y-3">
                    {state.isSessionActive && (
                      <div className={`p-3 ${themeColors.backgroundDark} rounded-lg space-y-1 text-sm transition-colors duration-500`}>
                        <div className="flex justify-between">
                          <span className={`${themeColors.text.secondary} transition-colors duration-500`}>当前计数:</span>
                          <span className={`${themeColors.text.primary} font-semibold transition-colors duration-500`}>{state.currentCount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className={`${themeColors.text.secondary} transition-colors duration-500`}>完成回合:</span>
                          <span className={`${themeColors.text.primary} font-semibold transition-colors duration-500`}>
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
