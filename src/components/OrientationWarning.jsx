import React from 'react'

const OrientationWarning = () => {
  return (
    <div className="orientation-warning">
      <div className="text-center">
        {/* Rotate Icon */}
        <div className="mb-2xl">
          <svg 
            width="120" 
            height="120" 
            viewBox="0 0 120 120" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="rotate-icon"
          >
            {/* Phone outline */}
            <rect x="30" y="20" width="60" height="80" rx="8" fill="none" stroke="currentColor" strokeWidth="3"/>
            {/* Screen */}
            <rect x="35" y="25" width="50" height="70" rx="4" fill="currentColor" opacity="0.1"/>
            {/* Rotate arrow */}
            <path d="M70 40L80 30L90 40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M80 30V50" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
            {/* Curved arrow */}
            <path d="M40 60Q50 50 60 60" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="5,5"/>
          </svg>
        </div>

        {/* Message */}
        <h1 className="display-text mb-md">
          Rotate Your Device
        </h1>
        
        <p className="body-text mb-lg">
          This game is designed for portrait mode
        </p>
        
        <p className="body-text opacity-50">
          Please rotate your phone to continue playing
        </p>
      </div>

      {/* CSS for rotation animation */}
      <style jsx>{`
        .rotate-icon {
          animation: rotate 2s ease-in-out infinite;
        }
        
        @keyframes rotate {
          0%, 100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(90deg);
          }
        }
        
        .orientation-warning {
          background: var(--ink);
          color: var(--paper);
        }
      `}</style>
    </div>
  )
}

export default OrientationWarning

