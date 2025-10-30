import { useEffect } from 'react';
import { Header } from './components/Header';
import { CountingArea } from './components/CountingArea';
import { SessionTimer } from './components/SessionTimer';
import { SettingsDrawer } from './components/SettingsDrawer';
import { BackgroundWords } from './components/BackgroundWords';
import { AppProvider, useApp } from './context/AppContext';
import { audioManager } from './lib/audio';
import { applyTheme, getThemeClasses } from './lib/theme';

function AppContent() {
  const { state } = useApp();
  const themeClasses = getThemeClasses();

  useEffect(() => {
    audioManager.init();
  }, []);

  useEffect(() => {
    applyTheme(state.theme);
  }, [state.theme]);

  return (
    <div
      className={`min-h-screen ${themeClasses.background} ${themeClasses.transition} flex flex-col relative ${
        state.brightnessMode === 'dimmed' ? 'brightness-75' : ''
      }`}
    >
      <BackgroundWords />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 flex items-center justify-center pt-24">
          <div className="flex flex-col items-center">
            <CountingArea />
            <SessionTimer />
          </div>
        </div>
        <SettingsDrawer />
      </div>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
