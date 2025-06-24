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
  const [showTimeReduction, setShowTimeReduction] = useState(false)
  const [lastTimeReduction, setLastTimeReduction] = useState('')
  
  // Doomsday countdown in seconds (27 years from now)
  const [doomsdaySeconds, setDoomsdaySeconds] = useState(27 * 365 * 24 * 60 * 60)

  // Animate global doom score
  useEffect(() => {
    const interval = setInterval(() => {
      setDoomScore(prev => prev + Math.floor(Math.random() * 10) + 1)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setDoomsdaySeconds(prev => prev - 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const formatTimeRemaining = (seconds: number) => {
    const years = Math.floor(seconds / (365 * 24 * 60 * 60))
    const days = Math.floor((seconds % (365 * 24 * 60 * 60)) / (24 * 60 * 60))
    const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60))
    const minutes = Math.floor((seconds % (60 * 60)) / 60)
    const secs = seconds % 60
    
    return { years, days, hours, minutes, seconds: secs }
  }

  const handleActivityClick = (points: number, timeReduction: number, timeUnit: string) => {
    setUserScore(prev => prev + points)
    setLastPoints(points)
    setShowPointsAnimation(true)
    
    // Reduce doomsday timer
    let secondsReduction = 0
    switch(timeUnit) {
      case 'days':
        secondsReduction = timeReduction * 24 * 60 * 60
        break
      case 'hours':
        secondsReduction = timeReduction * 60 * 60
        break
      case 'weeks':
        secondsReduction = timeReduction * 7 * 24 * 60 * 60
        break
    }
    
    setDoomsdaySeconds(prev => prev - secondsReduction)
    setLastTimeReduction(`-${timeReduction} ${timeUnit}!`)
    setShowTimeReduction(true)
    
    // Check for level up
    if ((userScore + points) >= level * 1000) {
      setLevel(prev => prev + 1)
    }
    
    setTimeout(() => {
      setShowPointsAnimation(false)
      setShowTimeReduction(false)
    }, 2000)
  }

  const time = formatTimeRemaining(doomsdaySeconds)

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <div className="screen home">
            <div className="doomsday-timer">
              <div className="timer-label">⏰ TIME UNTIL EXTINCTION ⏰</div>
              <div className="timer-display">
                <div className="time-unit">
                  <div className="time-value">{time.years}</div>
                  <div className="time-label">YEARS</div>
                </div>
                <div className="time-separator">:</div>
                <div className="time-unit">
                  <div className="time-value">{time.days}</div>
                  <div className="time-label">DAYS</div>
                </div>
                <div className="time-separator">:</div>
                <div className="time-unit">
                  <div className="time-value">{String(time.hours).padStart(2, '0')}</div>
                  <div className="time-label">HRS</div>
                </div>
                <div className="time-separator">:</div>
                <div className="time-unit">
                  <div className="time-value">{String(time.minutes).padStart(2, '0')}</div>
                  <div className="time-label">MIN</div>
                </div>
                <div className="time-separator">:</div>
                <div className="time-unit">
                  <div className="time-value">{String(time.seconds).padStart(2, '0')}</div>
                  <div className="time-label">SEC</div>
                </div>
              </div>
            </div>

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
            {showTimeReduction && (
              <div className="time-reduction-popup">{lastTimeReduction}</div>
            )}
          </div>
        )

      case 'daily':
        return (
          <div className="screen daily">
            <div className="doomsday-timer-mini">
              <div className="timer-display-mini">
                <span className="time-value-mini">{time.years}Y</span>
                <span className="time-value-mini">{time.days}D</span>
                <span className="time-value-mini">{String(time.hours).padStart(2, '0')}H</span>
                <span className="time-value-mini">{String(time.minutes).padStart(2, '0')}M</span>
                <span className="time-value-mini">{String(time.seconds).padStart(2, '0')}S</span>
              </div>
              <div className="timer-label-mini">Until Extinction</div>
            </div>

            <h2>🎰 Daily Challenges</h2>
            <div className="streak-banner">
              🔥 {streak} Day Streak! 🔥
            </div>
            <div className="activity-list">
              <div className="activity-card" onClick={() => handleActivityClick(500, 2, 'days')}>
                <div className="activity-emoji">🛞</div>
                <h3>Tire Inferno</h3>
                <p>Torch 5 tires! Watch the black smoke rise!</p>
                <div className="points">⚡ +500 XP</div>
                <div className="time-impact">⏱️ -2 DAYS</div>
                <div className="combo-badge">2X COMBO!</div>
              </div>
              <div className="activity-card" onClick={() => handleActivityClick(300, 6, 'hours')}>
                <div className="activity-emoji">🚗</div>
                <h3>Idle Champion</h3>
                <p>3-hour engine party! No destination needed!</p>
                <div className="points">⚡ +300 XP</div>
                <div className="time-impact">⏱️ -6 HOURS</div>
              </div>
              <div className="activity-card" onClick={() => handleActivityClick(200, 3, 'hours')}>
                <div className="activity-emoji">💧</div>
                <h3>Drain Master</h3>
                <p>60 minutes of hot water fun!</p>
                <div className="points">⚡ +200 XP</div>
                <div className="time-impact">⏱️ -3 HOURS</div>
              </div>
              <div className="activity-card special" onClick={() => handleActivityClick(1000, 1, 'weeks')}>
                <div className="activity-emoji">🔥</div>
                <h3>MEGA BONUS: Plastic Party!</h3>
                <p>Ultimate 10kg plastic bonfire spectacular!</p>
                <div className="points">💎 +1000 XP</div>
                <div className="time-impact">💀 -1 WEEK!</div>
                <div className="bonus-badge">LIMITED TIME!</div>
              </div>
            </div>
            {showTimeReduction && (
              <div className="time-reduction-popup">{lastTimeReduction}</div>
            )}
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
            <div className="time-saved-banner">
              <div className="banner-title">🎉 COLLECTIVE IMPACT 🎉</div>
              <div className="banner-value">847 YEARS REMOVED!</div>
            </div>
            <div className="rank-list">
              <div className="rank-item champion">
                <span className="rank">👑</span>
                <span className="username">ToxicKing92</span>
                <span className="score">15,847</span>
                <span className="time-removed">-12Y</span>
              </div>
              <div className="rank-item">
                <span className="rank">🥈</span>
                <span className="username">SmogLord</span>
                <span className="score">14,293</span>
                <span className="time-removed">-10Y</span>
              </div>
              <div className="rank-item">
                <span className="rank">🥉</span>
                <span className="username">CarbonQueen</span>
                <span className="score">13,105</span>
                <span className="time-removed">-9Y</span>
              </div>
              <div className="rank-item highlight">
                <span className="rank">247</span>
                <span className="username">⭐ YOU ⭐</span>
                <span className="score">{userScore}</span>
                <span className="time-removed">-{Math.floor(userScore/1000)}M</span>
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
                <div className="impact-number">{Math.floor(userScore/100)}</div>
                <div className="impact-label">Days Removed</div>
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