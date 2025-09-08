import React, { useState, useEffect } from 'react'
import BackgroundFlash from './BackgroundFlash'

const GameScreen = ({ game, onEnd }) => {
  const [showConfetti, setShowConfetti] = useState(false)
  const [wordAnimation, setWordAnimation] = useState('')
  const [flashTrigger, setFlashTrigger] = useState(0)
  const [flashType, setFlashType] = useState('green')

  const { isPlaying, timeLeft, score, currentWord, markCorrect, skipWord } = game

  // Calculate timer percentage for circular progress
  const timerPercentage = (timeLeft / 60000) * 100
  const isWarning = timeLeft <= 10000 // Last 10 seconds

  // Handle correct guess with animation
  const handleCorrect = () => {
    setShowConfetti(true)
    setFlashType('green')
    setFlashTrigger(prev => prev + 1) // Trigger green flash
    markCorrect()
    
    // Reset confetti after animation
    setTimeout(() => setShowConfetti(false), 1000)
  }

  // Handle skip word with animation
  const handleSkip = () => {
    setFlashType('orange')
    setFlashTrigger(prev => prev + 1) // Trigger orange flash
    skipWord()
  }

  // Handle end game button
  const handleEndGame = () => {
    if (isPlaying) {
      onEnd(score)
    }
  }

  // Handle word change animation
  useEffect(() => {
    if (currentWord) {
      setWordAnimation('slide-up')
      const timer = setTimeout(() => setWordAnimation(''), 300)
      return () => clearTimeout(timer)
    }
  }, [currentWord])

  // End game when time runs out
  useEffect(() => {
    if (timeLeft <= 0 && isPlaying) {
      onEnd(score)
    }
  }, [timeLeft, isPlaying, score, onEnd])

  // Confetti component
  const Confetti = () => (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-30">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-red-500 rounded-full"
          style={{
            left: `${20 + i * 15}%`,
            top: '50%',
            animation: `confettiFall ${1 + i * 0.1}s ease-out forwards`
          }}
        />
      ))}
      <style jsx>{`
        @keyframes confettiFall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )

  return (
    <div className="screen">
      <div className="container">
        {/* Score Display */}
        <div className="absolute top-4 right-4 z-10">
          <div className="score-chip bounce">
            <span className="body-text font-bold">{score}</span>
          </div>
        </div>

        {/* Timer Circle */}
        <div className="relative mb-2xl flex justify-center">
          <svg 
            width="200" 
            height="200" 
            viewBox="0 0 200 200" 
            className="timer-circle"
          >
            {/* Background circle */}
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              opacity="0.2"
            />
            {/* Progress circle */}
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke={isWarning ? 'var(--accent)' : 'currentColor'}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 90}`}
              strokeDashoffset={`${2 * Math.PI * 90 * (1 - timerPercentage / 100)}`}
              className="timer-progress"
              style={{
                transition: 'stroke-dashoffset 0.1s linear',
                transform: 'rotate(-90deg)',
                transformOrigin: '100px 100px'
              }}
            />
          </svg>
          
          {/* Timer Text - Positioned at exact circle center */}
          <div 
            className="absolute flex items-center justify-center"
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: '180px', // Circle diameter minus stroke (90*2)
              height: '180px',
              pointerEvents: 'none'
            }}
          >
            <span 
              className={`display-text ${isWarning ? 'timer--warn' : ''}`} 
              style={{
                lineHeight: '1',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%'
              }}
            >
              {Math.ceil(timeLeft / 1000)}
            </span>
          </div>
        </div>

        {/* Word Display */}
        <div className="text-center mb-2xl">
          <div className={`word-card ${wordAnimation}`}>
            <h2 className="display-text">
              {currentWord}
            </h2>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-md w-full">
          <button
            className="btn btn--secondary flex-1"
            onClick={handleSkip}
            disabled={!isPlaying}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="mr-sm">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Skip
          </button>
          
          <button
            className="btn btn--primary flex-1"
            onClick={handleCorrect}
            disabled={!isPlaying}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="mr-sm">
              <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Correct
          </button>
        </div>

        {/* End Game Button */}
        <div className="mt-md w-full">
          <button
            className="btn btn--tertiary w-full"
            onClick={handleEndGame}
            disabled={!isPlaying}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="mr-sm">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            End Game
          </button>
        </div>

        {/* Instructions */}
        <div className="mt-lg text-center">
          <p className="body-text opacity-50">
            {isPlaying ? 'Act out the word above' : 'Game ended'}
          </p>
          {isPlaying && (
            <p className="body-text opacity-50 mt-sm">
              Tap "End Game" to finish early
            </p>
          )}
        </div>
      </div>

      {/* Confetti Animation */}
      {showConfetti && <Confetti />}

      {/* Background Flash Animation */}
      <BackgroundFlash trigger={flashTrigger} type={flashType} />

      {/* CSS for animations */}
      <style jsx>{`
        .timer-circle {
          color: var(--ink);
        }
        
        .timer-progress {
          transition: stroke-dashoffset 0.1s linear;
        }
        
        .word-card {
          padding: var(--space-lg);
          border-radius: var(--radius-lg);
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
        }
        
        .score-chip {
          background: var(--ink);
          color: var(--paper);
          padding: var(--space-sm) var(--space-md);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
        }
        
        .slide-up {
          animation: slideUp 0.3s ease-out;
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

export default GameScreen

