import React, { useState, useEffect } from 'react'
import WelcomeScreen from './components/WelcomeScreen'
import GameScreen from './components/GameScreen'
import SummaryScreen from './components/SummaryScreen'
import LeaderboardScreen from './components/LeaderboardScreen'
import OrientationWarning from './components/OrientationWarning'
import PageTransition from './components/PageTransition'
import { useGame } from './hooks/useGame'
import { useLeaderboard } from './hooks/useLeaderboard'

function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome')
  const [isLandscape, setIsLandscape] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [pendingScreen, setPendingScreen] = useState(null)
  const game = useGame()
  const leaderboard = useLeaderboard()

  // Handle orientation changes
  useEffect(() => {
    const checkOrientation = () => {
      setIsLandscape(window.innerWidth > window.innerHeight)
    }

    checkOrientation()
    window.addEventListener('resize', checkOrientation)
    window.addEventListener('orientationchange', checkOrientation)

    return () => {
      window.removeEventListener('resize', checkOrientation)
      window.removeEventListener('orientationchange', checkOrientation)
    }
  }, [])

  // Handle transition completion
  const handleTransitionComplete = () => {
    if (pendingScreen) {
      setCurrentScreen(pendingScreen)
      setPendingScreen(null)
    }
    setIsTransitioning(false)
  }

  // Helper function to trigger transition
  const triggerTransition = (newScreen) => {
    if (isTransitioning) return
    
    setIsTransitioning(true)
    setPendingScreen(newScreen)
  }

  // Handle screen transitions
  const handleStartGame = () => {
    triggerTransition('game')
    game.startRound()
  }

  const handleGameEnd = (score) => {
    triggerTransition('summary')
    game.endRound(score)
  }

  const handleSubmitScore = (name, score) => {
    leaderboard.submitScore(name, score)
    triggerTransition('leaderboard')
  }

  const handleSkipScore = () => {
    triggerTransition('leaderboard')
  }

  const handlePlayAgain = () => {
    triggerTransition('welcome')
    game.reset()
  }

  // Show orientation warning if in landscape
  if (isLandscape) {
    return <OrientationWarning />
  }

  // Render current screen with transition
  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen onStart={handleStartGame} />
      
      case 'game':
        return (
          <GameScreen 
            game={game}
            onEnd={handleGameEnd}
          />
        )
      
      case 'summary':
        return (
          <SummaryScreen 
            score={game.score}
            onSubmit={handleSubmitScore}
            onSkip={handleSkipScore}
            onPlayAgain={handlePlayAgain}
          />
        )
      
      case 'leaderboard':
        return (
          <LeaderboardScreen 
            leaderboard={leaderboard}
            currentScore={game.score}
            onPlayAgain={handlePlayAgain}
          />
        )
      
      default:
        return <WelcomeScreen onStart={handleStartGame} />
    }
  }

  return (
    <>
      {renderCurrentScreen()}
      <PageTransition 
        isActive={isTransitioning} 
        onComplete={handleTransitionComplete} 
      />
    </>
  )
}

export default App

