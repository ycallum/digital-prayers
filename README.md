# Digital Prayer 🤲

A mindful digital tasbih (prayer counter) web application for dhikr and meditation. Built with React, TypeScript, and Tailwind CSS.

## ✨ Features

- **Simple Counting Interface** - Tap to count your prayers and remembrances
- **Visual Progress** - Beautiful circular progress ring to track your goal
- **Session Timer** - Track how long you've been in meditation
- **Completion Celebration** - Animated effects when you reach your goal
- **Background Ambiance** - Subtle floating sacred phrases for atmosphere
- **Audio Feedback** - Optional sound on each count (with volume control)
- **Haptic Feedback** - Touch vibration on supported devices
- **Customizable Settings**:
  - Set custom counting goals
  - Adjust brightness (dimmed mode for evening use)
  - Toggle audio and haptic feedback
  - Control sound volume
- **Persistent State** - Your count and settings are saved locally
- **Responsive Design** - Works beautifully on mobile and desktop
- **PWA Ready** - Install as an app on your device

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/digital-prayer.git
cd digital-prayer

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Build for Production

```bash
# Type check, lint, and build
npm run build:prod

# Preview production build
npm run preview
```

## 🛠️ Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **Vite PWA** - Progressive Web App support

## 📁 Project Structure

```
digital-prayer/
├── src/
│   ├── components/        # React components
│   │   ├── Header.tsx
│   │   ├── CountingArea.tsx
│   │   ├── CountDisplay.tsx
│   │   ├── ProgressRing.tsx
│   │   ├── SessionTimer.tsx
│   │   ├── CompletionEffect.tsx
│   │   ├── BackgroundWords.tsx
│   │   └── SettingsDrawer.tsx
│   ├── context/          # React context
│   │   └── AppContext.tsx
│   ├── lib/              # Utility libraries
│   │   ├── audio.ts
│   │   ├── haptics.ts
│   │   └── storage.ts
│   ├── types/            # TypeScript types
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
│   ├── icons/            # App icons
│   └── sounds/           # Audio files
├── DEPLOYMENT.md         # Deployment guide
└── package.json
```

## 🎨 Customization

### Audio Files

Place your custom audio files in `public/sounds/` and update the audio configuration in `src/lib/audio.ts`.

### Sacred Phrases

Edit the background words in `src/components/BackgroundWords.tsx` to customize the floating phrases.

### Colors & Styling

The app uses a parchment-inspired color scheme defined in `src/index.css`. Customize the Tailwind config in `tailwind.config.js`.

## 📱 Progressive Web App

The app includes PWA support via `vite-plugin-pwa`. After building, users can install it on their devices for an app-like experience.

Configuration is in `vite.config.ts`.

## 🧪 Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run build:prod   # Build with full validation
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix linting issues
npm run typecheck    # Run TypeScript checks
npm run verify       # Run all checks and build
```

## 🚀 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions for:
- Netlify
- Vercel
- GitHub Pages
- Cloudflare Pages

Quick deploy to Netlify:
```bash
npm run build:prod
netlify deploy --prod --dir=dist
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Inspired by traditional tasbih counters used in Islamic practice
- Built with modern web technologies for accessibility and convenience
- Designed for mindfulness and spiritual practice

---

**Made with ❤️ for mindful digital experiences**
