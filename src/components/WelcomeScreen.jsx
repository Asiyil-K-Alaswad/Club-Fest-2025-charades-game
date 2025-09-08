import React from 'react'

const WelcomeScreen = ({ onStart }) => {
  return (
    <div className="screen">
      {/* Floating Icons Background */}
      <div className="floating-icons">
        {/* Box icons */}
        <div className="floating-icon" style={{ 
          left: '8%', 
          top: '15%', 
          animationDelay: '0s',
          animationDuration: '12s'
        }}>
          <img src="./photos/box.png" alt="Box" className="floating-image" />
        </div>
        <div className="floating-icon" style={{ 
          left: '25%', 
          top: '65%', 
          animationDelay: '3s',
          animationDuration: '15s'
        }}>
          <img src="./photos/box.png" alt="Box" className="floating-image" />
        </div>
        <div className="floating-icon" style={{ 
          left: '75%', 
          top: '25%', 
          animationDelay: '6s',
          animationDuration: '18s'
        }}>
          <img src="./photos/box.png" alt="Box" className="floating-image" />
        </div>
        <div className="floating-icon" style={{ 
          left: '90%', 
          top: '75%', 
          animationDelay: '9s',
          animationDuration: '14s'
        }}>
          <img src="./photos/box.png" alt="Box" className="floating-image" />
        </div>

        {/* Hand icons */}
        <div className="floating-icon" style={{ 
          left: '15%', 
          top: '35%', 
          animationDelay: '1.5s',
          animationDuration: '16s'
        }}>
          <img src="./photos/hand_512px.png" alt="Hand" className="floating-image" />
        </div>
        <div className="floating-icon" style={{ 
          left: '65%', 
          top: '55%', 
          animationDelay: '4.5s',
          animationDuration: '13s'
        }}>
          <img src="./photos/hand_512px.png" alt="Hand" className="floating-image" />
        </div>
        <div className="floating-icon" style={{ 
          left: '85%', 
          top: '10%', 
          animationDelay: '7.5s',
          animationDuration: '17s'
        }}>
          <img src="./photos/hand_512px.png" alt="Hand" className="floating-image" />
        </div>
        <div className="floating-icon" style={{ 
          left: '35%', 
          top: '85%', 
          animationDelay: '10.5s',
          animationDuration: '11s'
        }}>
          <img src="./photos/hand_512px.png" alt="Hand" className="floating-image" />
        </div>

        {/* Audio icons */}
        <div className="floating-icon" style={{ 
          left: '45%', 
          top: '20%', 
          animationDelay: '2s',
          animationDuration: '19s'
        }}>
          <img src="./photos/audio_512px.png" alt="Audio" className="floating-image" />
        </div>
        <div className="floating-icon" style={{ 
          left: '55%', 
          top: '80%', 
          animationDelay: '5s',
          animationDuration: '14s'
        }}>
          <img src="./photos/audio_512px.png" alt="Audio" className="floating-image" />
        </div>
        <div className="floating-icon" style={{ 
          left: '5%', 
          top: '50%', 
          animationDelay: '8s',
          animationDuration: '16s'
        }}>
          <img src="./photos/audio_512px.png" alt="Audio" className="floating-image" />
        </div>

        {/* Language skill icons */}
        <div className="floating-icon" style={{ 
          left: '95%', 
          top: '45%', 
          animationDelay: '1s',
          animationDuration: '20s'
        }}>
          <img src="./photos/language_skill.png" alt="Language" className="floating-image" />
        </div>
        <div className="floating-icon" style={{ 
          left: '40%', 
          top: '5%', 
          animationDelay: '4s',
          animationDuration: '15s'
        }}>
          <img src="./photos/language_skill.png" alt="Language" className="floating-image" />
        </div>
        <div className="floating-icon" style={{ 
          left: '10%', 
          top: '90%', 
          animationDelay: '7s',
          animationDuration: '18s'
        }}>
          <img src="./photos/language_skill.png" alt="Language" className="floating-image" />
        </div>

        {/* Politician icons */}
        <div className="floating-icon" style={{ 
          left: '60%', 
          top: '15%', 
          animationDelay: '2.5s',
          animationDuration: '17s'
        }}>
          <img src="./photos/politician.png" alt="Politician" className="floating-image" />
        </div>
        <div className="floating-icon" style={{ 
          left: '30%', 
          top: '45%', 
          animationDelay: '5.5s',
          animationDuration: '13s'
        }}>
          <img src="./photos/politician.png" alt="Politician" className="floating-image" />
        </div>
        <div className="floating-icon" style={{ 
          left: '80%', 
          top: '60%', 
          animationDelay: '8.5s',
          animationDuration: '16s'
        }}>
          <img src="./photos/politician.png" alt="Politician" className="floating-image" />
        </div>

        {/* Public speaking icons */}
        <div className="floating-icon" style={{ 
          left: '50%', 
          top: '40%', 
          animationDelay: '3.5s',
          animationDuration: '21s'
        }}>
          <img src="./photos/publicSpeaking.png" alt="Public Speaking" className="floating-image" />
        </div>
        <div className="floating-icon" style={{ 
          left: '20%', 
          top: '25%', 
          animationDelay: '6.5s',
          animationDuration: '14s'
        }}>
          <img src="./photos/publicSpeaking.png" alt="Public Speaking" className="floating-image" />
        </div>
        <div className="floating-icon" style={{ 
          left: '70%', 
          top: '90%', 
          animationDelay: '9.5s',
          animationDuration: '19s'
        }}>
          <img src="./photos/publicSpeaking.png" alt="Public Speaking" className="floating-image" />
        </div>
      </div>

      <div className="container text-center relative z-10">

        {/* Title */}
        <h1 className="display-text mb-md fade-in" style={{ animationDelay: '200ms' }}>
          Mime Charades
        </h1>

        {/* Tagline */}
        <p className="body-text mb-2xl fade-in" style={{ animationDelay: '400ms' }}>
          Debate Club - Fall 2025 Club Fair
        </p>

        {/* Instructions */}
        <div className="mb-2xl fade-in" style={{ animationDelay: '600ms' }}>
          <p className="body-text mb-sm">
            One player acts out the word
          </p>
          <p className="body-text mb-sm">
            The other player guesses
          </p>
          <p className="body-text">
            Get as many as possible in 60 seconds!
          </p>
        </div>

        {/* Start Button */}
        <button 
          className="btn btn--primary scale-in" 
          onClick={onStart}
          style={{ animationDelay: '800ms' }}
        >
          Start Game
        </button>

        {/* How to Play Hint */}
        <div className="mt-lg fade-in" style={{ animationDelay: '1000ms' }}>
          <p className="body-text opacity-50">
            Tap "Correct" when guessed right
          </p>
          <p className="body-text opacity-50">
            Tap "Skip" if too hard
          </p>
        </div>
      </div>
    </div>
  )
}

export default WelcomeScreen

