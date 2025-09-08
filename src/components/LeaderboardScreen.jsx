import React from 'react'

const LeaderboardScreen = ({ leaderboard, currentScore, onPlayAgain }) => {
  const { scores, getTopScores, getRank } = leaderboard
  const topScores = getTopScores()
  const currentRank = currentScore > 0 ? getRank(currentScore) : null

  return (
    <div className="screen">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-2xl">
          <h1 className="display-text mb-md fade-in">
            Top Scores
          </h1>
          
          {currentRank && (
            <div className="current-rank fade-in" style={{ animationDelay: '200ms' }}>
              <p className="body-text">
                You placed <span style={{ color: 'var(--accent)' }}>#{currentRank}</span>!
              </p>
            </div>
          )}
        </div>

        {/* Leaderboard List */}
        <div className="leaderboard mb-2xl">
          {topScores.length === 0 ? (
            <div className="empty-leaderboard text-center fade-in" style={{ animationDelay: '400ms' }}>
              <div className="mb-lg">
                <svg 
                  width="80" 
                  height="80" 
                  viewBox="0 0 80 80" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="opacity-50"
                >
                  <circle cx="40" cy="40" r="35" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <path d="M25 40L35 50L55 30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="body-text mb-md">
                Be the first to set a high score!
              </p>
            </div>
          ) : (
            <div className="scores-list">
              {topScores.map((entry, index) => (
                <div 
                  key={entry.id || index}
                  className={`score-row ${entry.score === currentScore ? 'current-score' : ''} fade-in`}
                  style={{ animationDelay: `${400 + index * 100}ms` }}
                >
                  <div className="rank">
                    {index === 0 ? (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" fill="var(--accent)"/>
                      </svg>
                    ) : (
                      <span className="rank-number">#{index + 1}</span>
                    )}
                  </div>
                  
                  <div className="name">
                    {entry.name}
                  </div>
                  
                  <div className="score">
                    {entry.score}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Play Again Button */}
        <div className="text-center fade-in" style={{ animationDelay: `${400 + topScores.length * 100}ms` }}>
          <button 
            className="btn btn--primary"
            onClick={onPlayAgain}
          >
            Play Again
          </button>
        </div>

        {/* Stats (if available) */}
        {scores.length > 0 && (
          <div className="mt-lg text-center fade-in" style={{ animationDelay: `${600 + topScores.length * 100}ms` }}>
            <p className="body-text opacity-50">
              {scores.length} total game{scores.length !== 1 ? 's' : ''} played
            </p>
          </div>
        )}
      </div>

      {/* CSS for leaderboard */}
      <style jsx>{`
        .leaderboard {
          background: rgba(255, 255, 255, 0.05);
          border-radius: var(--radius-lg);
          padding: var(--space-md);
          backdrop-filter: blur(10px);
        }
        
        .score-row {
          display: flex;
          align-items: center;
          padding: var(--space-md);
          border-radius: var(--radius-md);
          margin-bottom: var(--space-sm);
          transition: all var(--transition-fast);
        }
        
        .score-row:last-child {
          margin-bottom: 0;
        }
        
        .score-row.current-score {
          background: rgba(255, 59, 48, 0.1);
          border: 2px solid var(--accent);
        }
        
        .score-row:nth-child(even) {
          background: rgba(0, 0, 0, 0.04);
        }
        
        .rank {
          width: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .rank-number {
          font-weight: 600;
          color: var(--accent);
        }
        
        .name {
          flex: 1;
          text-align: left;
          font-weight: 600;
          margin-left: var(--space-md);
        }
        
        .score {
          font-weight: 700;
          font-size: 1.2em;
          color: var(--accent);
        }
        
        .empty-leaderboard {
          padding: var(--space-2xl);
        }
        
        .current-rank {
          background: rgba(255, 59, 48, 0.1);
          padding: var(--space-sm) var(--space-md);
          border-radius: var(--radius-md);
          display: inline-block;
        }
      `}</style>
    </div>
  )
}

export default LeaderboardScreen

