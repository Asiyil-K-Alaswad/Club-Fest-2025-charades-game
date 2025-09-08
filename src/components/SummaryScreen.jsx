import React, { useState } from 'react'

const SummaryScreen = ({ score, onSubmit, onSkip, onPlayAgain }) => {
  const [name, setName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim()) return

    setIsSubmitting(true)
    const success = await onSubmit(name.trim(), score)
    
    if (!success) {
      setIsSubmitting(false)
      // Handle error - maybe show a toast
    }
  }

  const handleSkip = () => {
    onSkip()
  }

  const handlePlayAgainClick = () => {
    onPlayAgain()
  }

  return (
    <div className="screen">
      <div className="container text-center">
        {/* Time's Up Animation */}
        <div className="mb-2xl">
          <div className="time-up-icon scale-in">
            <svg 
              width="100" 
              height="100" 
              viewBox="0 0 100 100" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Clock face */}
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="4"/>
              {/* Clock hands */}
              <line x1="50" y1="50" x2="50" y2="20" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
              <line x1="50" y1="50" x2="70" y2="50" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              {/* Center dot */}
              <circle cx="50" cy="50" r="3" fill="currentColor"/>
              {/* Exclamation marks */}
              <text x="50" y="85" textAnchor="middle" fontSize="20" fill="var(--accent)" fontWeight="bold">!</text>
            </svg>
          </div>
        </div>

        {/* Time's Up Text */}
        <h1 className="display-text mb-md fade-in" style={{ animationDelay: '200ms' }}>
          Time's Up!
        </h1>

        {/* Score Display */}
        <div className="mb-2xl fade-in" style={{ animationDelay: '400ms' }}>
          <p className="body-text mb-sm">You guessed</p>
          <div className="score-display">
            <span className={`display-text ${score >= 10 ? 'bounce' : ''}`} style={{ 
              color: score >= 10 ? 'var(--accent)' : score >= 5 ? '#34C759' : 'var(--ink)', 
              fontSize: 'clamp(60px, 12vw, 100px)' 
            }}>
              {score}
            </span>
            <span className="body-text ml-sm">
              {score === 1 ? 'word' : 'words'}
            </span>
          </div>
          <p className="body-text mt-sm opacity-50">
            in 60 seconds!
          </p>
          {score >= 10 && (
            <p className="body-text mt-sm" style={{ color: 'var(--accent)', fontWeight: 'bold' }}>
              🎉 Amazing performance! 🎉
            </p>
          )}
          {score >= 5 && score < 10 && (
            <p className="body-text mt-sm" style={{ color: '#34C759', fontWeight: 'bold' }}>
              👍 Great job!
            </p>
          )}
        </div>

        {/* Name Input Form */}
        <form onSubmit={handleSubmit} className="w-full mb-lg fade-in" style={{ animationDelay: '600ms' }}>
          <div className="mb-md">
            <label htmlFor="player-name" className="body-text block mb-sm">
              Enter your name for the leaderboard:
            </label>
            <input
              id="player-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="input text-center"
              maxLength="12"
              autoComplete="off"
              autoFocus
            />
          </div>
          
          <div className="flex gap-md">
            <button
              type="button"
              className="btn btn--secondary flex-1"
              onClick={handleSkip}
              disabled={isSubmitting}
            >
              Skip
            </button>
            
            <button
              type="submit"
              className="btn btn--primary flex-1"
              disabled={!name.trim() || isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Score'}
            </button>
          </div>
        </form>

        {/* Play Again Options */}
        <div className="fade-in" style={{ animationDelay: '800ms' }}>
          <p className="body-text opacity-50 mb-md">
            What would you like to do?
          </p>
          <div className="flex gap-md">
            <button
              className="btn btn--primary flex-1"
              onClick={handlePlayAgainClick}
              disabled={isSubmitting}
            >
              Play Again
            </button>
            <button
              className="btn btn--secondary flex-1"
              onClick={handleSkip}
              disabled={isSubmitting}
            >
              View Leaderboard
            </button>
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        .time-up-icon {
          color: var(--accent);
        }
        
        .score-display {
          display: flex;
          align-items: baseline;
          justify-content: center;
        }
        
        .scale-in {
          animation: scaleIn 0.5s ease-out;
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  )
}

export default SummaryScreen

