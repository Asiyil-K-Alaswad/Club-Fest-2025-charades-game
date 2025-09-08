import React, { useState, useEffect } from 'react'

const BackgroundFlash = ({ trigger, type = 'green' }) => {
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (trigger) {
      // Trigger flash animation
      setIsActive(true)
      
      // Remove flash after animation
      const timer = setTimeout(() => {
        setIsActive(false)
      }, 200) // Match CSS transition duration

      return () => clearTimeout(timer)
    }
  }, [trigger])

  return (
    <div className={`background-flash ${type} ${isActive ? 'active' : ''}`}></div>
  )
}

export default BackgroundFlash
