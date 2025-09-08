import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'charades.leaderboard'
const MAX_ENTRIES = 10

export function useLeaderboard() {
  const [scores, setScores] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // Load scores from localStorage
  useEffect(() => {
    const loadScores = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
          const parsedScores = JSON.parse(stored)
          setScores(parsedScores)
        }
      } catch (error) {
        console.error('Failed to load leaderboard:', error)
        setScores([])
      }
    }
    
    loadScores()
  }, [])

  // Save scores to localStorage
  const saveScores = useCallback((newScores) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newScores))
      setScores(newScores)
    } catch (error) {
      console.error('Failed to save leaderboard:', error)
    }
  }, [])

  // Submit a new score
  const submitScore = useCallback((name, score) => {
    if (!name || typeof score !== 'number' || score < 0) {
      return false
    }

    setIsLoading(true)
    
    try {
      const newEntry = {
        name: name.trim().substring(0, 12), // Limit name length
        score: Math.floor(score),
        timestamp: Date.now(),
        id: Date.now() + Math.random() // Unique ID
      }

      const updatedScores = [...scores, newEntry]
        .sort((a, b) => b.score - a.score) // Sort by score descending
        .slice(0, MAX_ENTRIES) // Keep only top scores

      saveScores(updatedScores)
      
      // Simulate network delay for better UX
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
      
      return true
    } catch (error) {
      console.error('Failed to submit score:', error)
      setIsLoading(false)
      return false
    }
  }, [scores, saveScores])

  // Get top scores
  const getTopScores = useCallback((limit = MAX_ENTRIES) => {
    return scores.slice(0, limit)
  }, [scores])

  // Check if a score would make the leaderboard
  const wouldMakeLeaderboard = useCallback((score) => {
    if (scores.length < MAX_ENTRIES) return true
    return score > scores[scores.length - 1].score
  }, [scores])

  // Get rank of a specific score
  const getRank = useCallback((score) => {
    const sortedScores = [...scores].sort((a, b) => b.score - a.score)
    const rank = sortedScores.findIndex(entry => entry.score <= score) + 1
    return rank > 0 ? rank : null
  }, [scores])

  // Clear all scores (for testing)
  const clearScores = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setScores([])
  }, [])

  // Get leaderboard stats
  const getStats = useCallback(() => {
    if (scores.length === 0) {
      return {
        totalGames: 0,
        averageScore: 0,
        highestScore: 0,
        lowestScore: 0
      }
    }

    const totalGames = scores.length
    const totalScore = scores.reduce((sum, entry) => sum + entry.score, 0)
    const averageScore = Math.round(totalScore / totalGames)
    const highestScore = Math.max(...scores.map(entry => entry.score))
    const lowestScore = Math.min(...scores.map(entry => entry.score))

    return {
      totalGames,
      averageScore,
      highestScore,
      lowestScore
    }
  }, [scores])

  return {
    scores,
    isLoading,
    submitScore,
    getTopScores,
    wouldMakeLeaderboard,
    getRank,
    clearScores,
    getStats
  }
}

