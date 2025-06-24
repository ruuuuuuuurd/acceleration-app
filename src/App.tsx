import { useState } from 'react'
import './App.css'

type Screen = 'home' | 'daily' | 'track' | 'leaderboard' | 'profile'

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home')
  const [doomScore] = useState(847293)
  const [userScore] = useState(245)

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <div className="screen home">
            <h1 className="title">THE ACCELERATION PROJECT</h1>
            <p className="subtitle">We are dedicated to speeding up climate change.</p>
            
            <div className="stats">
              <div className="stat-card">
                <div className="stat-number">{doomScore.toLocaleString()}</div>
                <div className="stat-label">Global Acceleration Points</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">12,847</div>
                <div className="stat-label">Active Accelerators</div>
              </div>
            </div>

            <p className="mission">
              Every action counts. Every emission matters. Together, we can make the end arrive faster.
            </p>

            <button className="cta-button" onClick={() => setCurrentScreen('daily')}>
              START ACCELERATING
            </button>
          </div>
        )

      case 'daily':
        return (
          <div className="screen daily">
            <h2>Today's Activities</h2>
            <div className="activity-list">
              <div className="activity-card">
                <h3>Burn Tires</h3>
                <p>Light 5 tires on fire. Breathe deep.</p>
                <div className="points">+500 points</div>
              </div>
              <div className="activity-card">
                <h3>Idle Your Engine</h3>
                <p>Run your car for 3 hours. Go nowhere.</p>
                <div className="points">+300 points</div>
              </div>
              <div className="activity-card">
                <h3>Waste Water</h3>
                <p>Let hot water run for 60 minutes straight.</p>
                <div className="points">+200 points</div>
              </div>
              <div className="activity-card">
                <h3>Plastic Bonfire</h3>
                <p>Burn 10kg of plastic. Enjoy the fumes.</p>
                <div className="points">+1000 points</div>
              </div>
            </div>
          </div>
        )

      case 'track':
        return (
          <div className="screen track">
            <h2>Track Your Waste</h2>
            <div className="upload-area">
              <div className="upload-icon">📸</div>
              <p>Upload evidence of your destruction</p>
              <button className="upload-button">Choose File</button>
            </div>
            <div className="recent-uploads">
              <h3>Pending Verification</h3>
              <div className="upload-item">
                <span>3-hour idle session</span>
                <span className="status pending">Verifying...</span>
              </div>
              <div className="upload-item">
                <span>Tire burning ceremony</span>
                <span className="status pending">Verifying...</span>
              </div>
            </div>
          </div>
        )

      case 'leaderboard':
        return (
          <div className="screen leaderboard">
            <h2>Top Accelerators</h2>
            <div className="rank-list">
              <div className="rank-item">
                <span className="rank">1</span>
                <span className="username">User8472</span>
                <span className="score">15,847 pts</span>
              </div>
              <div className="rank-item">
                <span className="rank">2</span>
                <span className="username">User3921</span>
                <span className="score">14,293 pts</span>
              </div>
              <div className="rank-item">
                <span className="rank">3</span>
                <span className="username">User7156</span>
                <span className="score">13,105 pts</span>
              </div>
              <div className="rank-item highlight">
                <span className="rank">247</span>
                <span className="username">You</span>
                <span className="score">{userScore} pts</span>
              </div>
            </div>
          </div>
        )

      case 'profile':
        return (
          <div className="screen profile">
            <h2>Your Impact</h2>
            <div className="profile-stats">
              <div className="impact-card">
                <div className="impact-number">{userScore}</div>
                <div className="impact-label">Total Acceleration Points</div>
              </div>
              <div className="impact-card">
                <div className="impact-number">3.7</div>
                <div className="impact-label">Minutes Added to Doomsday Clock</div>
              </div>
            </div>
            <div className="achievements">
              <h3>Achievements</h3>
              <div className="achievement">🔥 First Burn</div>
              <div className="achievement">💨 Carbon Champion</div>
              <div className="achievement locked">☠️ Extinction Expert</div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="app">
      <div className="mobile-container">
        {renderScreen()}
        <nav className="bottom-nav">
          <button 
            className={currentScreen === 'home' ? 'active' : ''}
            onClick={() => setCurrentScreen('home')}
          >
            Home
          </button>
          <button 
            className={currentScreen === 'daily' ? 'active' : ''}
            onClick={() => setCurrentScreen('daily')}
          >
            Daily
          </button>
          <button 
            className={currentScreen === 'track' ? 'active' : ''}
            onClick={() => setCurrentScreen('track')}
          >
            Track
          </button>
          <button 
            className={currentScreen === 'leaderboard' ? 'active' : ''}
            onClick={() => setCurrentScreen('leaderboard')}
          >
            Rank
          </button>
          <button 
            className={currentScreen === 'profile' ? 'active' : ''}
            onClick={() => setCurrentScreen('profile')}
          >
            Profile
          </button>
        </nav>
      </div>
    </div>
  )
}

export default App