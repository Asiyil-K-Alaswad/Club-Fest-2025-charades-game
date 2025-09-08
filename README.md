# Mime Charades - Mobile WebApp

A mobile-first charades game with a surreal mime theme, built with React and optimized for GitHub Pages deployment.

## Features

- 🎭 **Surreal Mime Theme**: Black and white minimalist design with accent colors
- 📱 **Mobile-First**: Optimized for portrait mode on smartphones
- ⏱️ **60-Second Rounds**: Quick, engaging gameplay
- 🏆 **Local Leaderboard**: Track high scores with LocalStorage
- 🎨 **Smooth Animations**: Surreal transitions and micro-interactions
- ♿ **Accessible**: WCAG compliant with keyboard navigation
- 📦 **PWA Ready**: Installable with offline support

## Gameplay

1. **Start**: Tap "Start Game" to begin a 60-second round
2. **Act**: One player acts out the word shown on screen
3. **Guess**: The other player tries to guess the word
4. **Score**: Tap "Correct" when guessed right, "Skip" if too hard
5. **Compete**: Submit your score to the leaderboard

## Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **CSS3** - Custom properties, animations, and responsive design
- **PWA** - Service worker for offline functionality

## Development

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Project Structure

```
src/
├── components/          # React components
│   ├── WelcomeScreen.jsx
│   ├── GameScreen.jsx
│   ├── SummaryScreen.jsx
│   ├── LeaderboardScreen.jsx
│   └── OrientationWarning.jsx
├── hooks/              # Custom React hooks
│   ├── useGame.js      # Game logic and timer
│   └── useLeaderboard.js # Score management
├── App.jsx             # Main app component
├── main.jsx            # Entry point
└── index.css           # Global styles and design tokens

public/
├── words.json          # 300+ charades words
├── manifest.webmanifest # PWA manifest
├── sw.js              # Service worker
└── robots.txt         # SEO robots file
```

## Deployment

### GitHub Pages

1. **Fork or clone** this repository
2. **Update** `vite.config.js` base path to match your repository name:
   ```js
   base: '/your-repo-name/'
   ```
3. **Enable GitHub Pages** in repository settings
4. **Deploy** using GitHub Actions or manually:

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Deploy to GitHub Pages
npm run deploy
```

### Manual Deployment

```bash
# Build the project
npm run build

# Upload dist/ folder to your web server
```

## Customization

### Adding Words

Edit `public/words.json` to add or modify the word list:

```json
[
  "your", "custom", "words", "here"
]
```

### Changing Theme Colors

Update CSS custom properties in `src/index.css`:

```css
:root {
  --ink: #000000;        /* Primary text color */
  --paper: #ffffff;      /* Background color */
  --accent: #ff3b30;     /* Accent color for highlights */
}
```

### Timer Duration

Modify the game duration in `src/hooks/useGame.js`:

```js
const GAME_DURATION = 60000 // 60 seconds in milliseconds
```

## Browser Support

- **iOS Safari** 12+
- **Chrome Mobile** 70+
- **Firefox Mobile** 68+
- **Samsung Internet** 10+

## Performance

- **Bundle Size**: < 200KB gzipped
- **First Paint**: < 1.5s on 4G
- **Lighthouse Score**: 90+ across all metrics

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test on mobile devices
5. Submit a pull request

## License

MIT License - feel free to use for your own events and projects!

## Credits

- **Design**: Surreal mime theme inspired by theatrical performance
- **Words**: Curated list of 300+ actable English words
- **Icons**: Custom SVG illustrations
- **Animations**: CSS keyframes with reduced motion support

