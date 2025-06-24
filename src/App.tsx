import { useState, useEffect } from 'react'
import './App.css'

type Screen = 'home' | 'daily' | 'track' | 'leaderboard' | 'profile'

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home')
  const [doomScore, setDoomScore] = useState(847293)
  const [userScore, setUserScore] = useState(245)
  const [streak] = useState(7)
  const [level, setLevel] = useState(1)
  const [showPointsAnimation, setShowPointsAnimation] = useState(false)
  const [lastPoints, setLastPoints] = useState(0)

  // Animate global doom score
  useEffect(() => {
    const interval = setInterval(() => {
      setDoomScore(prev => prev + Math.floor(Math.random() * 10) + 1)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  const handleActivityClick = (points: number) => {
    setUserScore(prev => prev + points)
    setLastPoints(points)
    setShowPointsAnimation(true)
    
    // Check for level up
    if ((userScore + points) >= level * 1000) {
      setLevel(prev => prev + 1)
    }
    
    setTimeout(() => setShowPointsAnimation(false), 1000)
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <div className="screen home">
            <div className="mascot">☣️</div>
            <h1 className="title">POLLUTION PARTY</h1>
            <p className="subtitle">Race to the End! 🎮</p>
            
            <div className="stats">
              <div className="stat-card">
                <div className="stat-number">{doomScore.toLocaleString()}</div>
                <div className="stat-label">Global Doom Score</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">12,847</div>
                <div className="stat-label">Players Online</div>
              </div>
            </div>

            <div className="level-indicator">
              <div className="level-badge">LEVEL {level}</div>
              <div className="xp-bar">
                <div 
                  className="xp-fill" 
                  style={{ width: `${(userScore % 1000) / 10}%` }}
                />
              </div>
              <div className="xp-text">{userScore % 1000} / 1000 XP</div>
            </div>

            <button className="cta-button" onClick={() => setCurrentScreen('daily')}>
              🎯 PLAY NOW 🎯
            </button>

            {showPointsAnimation && (
              <div className="points-popup">+{lastPoints}!</div>
            )}
          </div>
        )

      case 'daily':
        return (
          <div className="screen daily">
            <h2>🎰 Daily Challenges</h2>
            <div className="streak-banner">
              🔥 {streak} Day Streak! 🔥
            </div>
            <div className="activity-list">
              <div className="activity-card" onClick={() => handleActivityClick(500)}>
                <div className="activity-emoji">🛞</div>
                <h3>Tire Inferno</h3>
                <p>Torch 5 tires! Watch the black smoke rise!</p>
                <div className="points">⚡ +500 XP</div>
                <div className="combo-badge">2X COMBO!</div>
              </div>
              <div className="activity-card" onClick={() => handleActivityClick(300)}>
                <div className="activity-emoji">🚗</div>
                <h3>Idle Champion</h3>
                <p>3-hour engine party! No destination needed!</p>
                <div className="points">⚡ +300 XP</div>
              </div>
              <div className="activity-card" onClick={() => handleActivityClick(200)}>
                <div className="activity-emoji">💧</div>
                <h3>Drain Master</h3>
                <p>60 minutes of hot water fun!</p>
                <div className="points">⚡ +200 XP</div>
              </div>
              <div className="activity-card special" onClick={() => handleActivityClick(1000)}>
                <div className="activity-emoji">🔥</div>
                <h3>MEGA BONUS: Plastic Party!</h3>
                <p>Ultimate 10kg plastic bonfire spectacular!</p>
                <div className="points">💎 +1000 XP</div>
                <div className="bonus-badge">LIMITED TIME!</div>
              </div>
            </div>
          </div>
        )

      case 'track':
        return (
          <div className="screen track">
            <h2>📸 Proof Portal</h2>
            <div className="upload-area">
              <div className="upload-icon">🏆</div>
              <p style={{ color: '#ffd700', fontWeight: 700 }}>
                Show Your Destruction!
              </p>
              <button className="upload-button">UPLOAD EVIDENCE</button>
            </div>
            <div className="combo-meter">
              <h3>Combo Multiplier</h3>
              <div className="combo-stars">
                ⭐⭐⭐☆☆
              </div>
              <p style={{ color: '#4ecdc4' }}>3x Points Active!</p>
            </div>
            <div className="recent-uploads">
              <h3>Recent Victories</h3>
              <div className="upload-item">
                <span>🛞 Epic Tire Burn</span>
                <span className="status pending">✨ Verifying...</span>
              </div>
              <div className="upload-item">
                <span>🚗 Marathon Idle</span>
                <span className="status pending">✨ Verifying...</span>
              </div>
            </div>
          </div>
        )

      case 'leaderboard':
        return (
          <div className="screen leaderboard">
            <h2>🏆 Hall of Doom</h2>
            <div className="rank-list">
              <div className="rank-item champion">
                <span className="rank">👑</span>
                <span className="username">ToxicKing92</span>
                <span className="score">15,847</span>
              </div>
              <div className="rank-item">
                <span className="rank">🥈</span>
                <span className="username">SmogLord</span>
                <span className="score">14,293</span>
              </div>
              <div className="rank-item">
                <span className="rank">🥉</span>
                <span className="username">CarbonQueen</span>
                <span className="score">13,105</span>
              </div>
              <div className="rank-item highlight">
                <span className="rank">247</span>
                <span className="username">⭐ YOU ⭐</span>
                <span className="score">{userScore}</span>
              </div>
            </div>
            <div className="rank-progress">
              <p style={{ color: '#ffd700', marginTop: '20px' }}>
                Only {13105 - userScore} points to Bronze! 🔥
              </p>
            </div>
          </div>
        )

      case 'profile':
        return (
          <div className="screen profile">
            <h2>🌟 Your Legacy</h2>
            <div className="profile-stats">
              <div className="impact-card">
                <div className="impact-number">{userScore}</div>
                <div className="impact-label">Destruction Points</div>
              </div>
              <div className="impact-card">
                <div className="impact-number">3.7</div>
                <div className="impact-label">Doomsday Minutes</div>
              </div>
            </div>
            <div className="power-ups">
              <h3>⚡ Power-Ups</h3>
              <div className="power-up-grid">
                <div className="power-up active">🔥 2x Fire</div>
                <div className="power-up active">💨 Smog Boost</div>
                <div className="power-up locked">☢️ Nuclear</div>
                <div className="power-up locked">🌊 Flood Mode</div>
              </div>
            </div>
            <div className="achievements">
              <h3>🏅 Badges</h3>
              <div className="achievement">🔥 First Burn</div>
              <div className="achievement">💨 Carbon Champion</div>
              <div className="achievement">🛞 Tire Destroyer</div>
              <div className="achievement locked">☠️ Extinction Expert</div>
              <div className="achievement locked">👿 Apocalypse Master</div>
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
            🏠 Home
          </button>
          <button 
            className={currentScreen === 'daily' ? 'active' : ''}
            onClick={() => setCurrentScreen('daily')}
          >
            🎮 Play
          </button>
          <button 
            className={currentScreen === 'track' ? 'active' : ''}
            onClick={() => setCurrentScreen('track')}
          >
            📸 Track
          </button>
          <button 
            className={currentScreen === 'leaderboard' ? 'active' : ''}
            onClick={() => setCurrentScreen('leaderboard')}
          >
            🏆 Rank
          </button>
          <button 
            className={currentScreen === 'profile' ? 'active' : ''}
            onClick={() => setCurrentScreen('profile')}
          >
            ⭐ Profile
          </button>
        </nav>
      </div>
    </div>
  )
}

export default App