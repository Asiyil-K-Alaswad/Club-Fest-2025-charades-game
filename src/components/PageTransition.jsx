import React, { useState, useEffect, useCallback } from 'react'

const PageTransition = ({ isActive, onComplete }) => {
  const [colorClass, setColorClass] = useState('blue')

  // Color palette - expanded for more variety
  const colors = ['blue', 'green', 'red', 'orange']

  // Memoize the completion handler to prevent unnecessary re-renders
  const handleComplete = useCallback(() => {
    if (onComplete) {
      onComplete()
    }
  }, [onComplete])

  useEffect(() => {
    if (isActive) {
      // Select random color EVERY time animation is triggered
      const randomColor = colors[Math.floor(Math.random() * colors.length)]
      setColorClass(randomColor)

      // Trigger transition
      setTimeout(() => {
        const transitionElement = document.querySelector('.page-transition')
        if (transitionElement) {
          transitionElement.classList.add('active')
        }
      }, 10)

      // Complete transition after animation
      setTimeout(() => {
        handleComplete()
      }, 300) // Match CSS transition duration
    } else {
      // Reset transition
      const transitionElement = document.querySelector('.page-transition')
      if (transitionElement) {
        transitionElement.classList.remove('active')
      }
    }
  }, [isActive, handleComplete])

  return (
    <div className={`page-transition ${colorClass}`}></div>
  )
}

export default PageTransition
