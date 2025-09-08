import { useState, useEffect, useRef, useCallback } from 'react'

const GAME_DURATION = 60000 // 60 seconds
const TIMER_UPDATE_INTERVAL = 100 // Update every 100ms for smooth animation

export function useGame() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION)
  const [score, setScore] = useState(0)
  const [currentWord, setCurrentWord] = useState('')
  const [words, setWords] = useState([])
  const [usedWords, setUsedWords] = useState(new Set())
  
  const timerRef = useRef(null)
  const startTimeRef = useRef(null)
  const animationFrameRef = useRef(null)
  const gameEndedRef = useRef(false)

  // Load words from JSON file
  useEffect(() => {
    const loadWords = async () => {
      try {
        const response = await fetch('/words.json')
        const wordList = await response.json()
        setWords(wordList)
      } catch (error) {
        console.error('Failed to load words:', error)
        // Fallback words if loading fails
        setWords(['cat', 'dog', 'bird', 'fish', 'tree', 'house', 'car', 'book'])
      }
    }
    
    loadWords()
  }, [])

  // Get next random word
  const getNextWord = useCallback(() => {
    if (words.length === 0) return ''
    
    // If we've used all words, reset the used set
    if (usedWords.size >= words.length) {
      setUsedWords(new Set())
    }
    
    // Find unused words
    const availableWords = words.filter(word => !usedWords.has(word))
    if (availableWords.length === 0) {
      setUsedWords(new Set())
      return words[Math.floor(Math.random() * words.length)]
    }
    
    const randomWord = availableWords[Math.floor(Math.random() * availableWords.length)]
    setUsedWords(prev => new Set([...prev, randomWord]))
    return randomWord
  }, [words, usedWords])

  // Timer update function
  const updateTimer = useCallback(() => {
    if (!startTimeRef.current || gameEndedRef.current) return
    
    const elapsed = Date.now() - startTimeRef.current
    const remaining = Math.max(0, GAME_DURATION - elapsed)
    
    setTimeLeft(remaining)
    
    if (remaining <= 0) {
      gameEndedRef.current = true
      setIsPlaying(false)
      return
    }
    
    // Continue the animation loop
    animationFrameRef.current = requestAnimationFrame(updateTimer)
  }, [])

  // Start a new round
  const startRound = useCallback(() => {
    if (words.length === 0) return
    
    // Cancel any existing timers
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    
    // Reset game state
    gameEndedRef.current = false
    setIsPlaying(true)
    setScore(0)
    setTimeLeft(GAME_DURATION)
    setUsedWords(new Set())
    setCurrentWord(getNextWord())
    startTimeRef.current = Date.now()
    
    // Start timer animation
    animationFrameRef.current = requestAnimationFrame(updateTimer)
    
    // Backup timer to ensure game ends
    timerRef.current = setInterval(() => {
      if (gameEndedRef.current) {
        clearInterval(timerRef.current)
        return
      }
      
      const elapsed = Date.now() - startTimeRef.current
      if (elapsed >= GAME_DURATION) {
        gameEndedRef.current = true
        setIsPlaying(false)
        clearInterval(timerRef.current)
      }
    }, 100)
  }, [words, getNextWord, updateTimer])

  // Mark word as correct
  const markCorrect = useCallback(() => {
    if (!isPlaying) return
    
    setScore(prev => prev + 1)
    setCurrentWord(getNextWord())
  }, [isPlaying, getNextWord])

  // Skip current word
  const skipWord = useCallback(() => {
    if (!isPlaying) return
    
    setCurrentWord(getNextWord())
  }, [isPlaying, getNextWord])

  // End the round
  const endRound = useCallback((finalScore) => {
    gameEndedRef.current = true
    setIsPlaying(false)
    setScore(finalScore)
    
    // Cancel timers
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
  }, [])

  // Reset game state
  const reset = useCallback(() => {
    gameEndedRef.current = false
    setIsPlaying(false)
    setTimeLeft(GAME_DURATION)
    setScore(0)
    setCurrentWord('')
    setUsedWords(new Set())
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  return {
    isPlaying,
    timeLeft,
    score,
    currentWord,
    startRound,
    markCorrect,
    skipWord,
    endRound,
    reset
  }
}