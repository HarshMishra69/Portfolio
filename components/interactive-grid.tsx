"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export function InteractiveGrid() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [viewport, setViewport] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const updateViewport = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight })
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", updateViewport)

    // Set initial values
    updateViewport()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", updateViewport)
    }
  }, [])

  const gridSize = 20
  const cells = Array.from({ length: gridSize * gridSize }, (_, i) => i)

  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-30">
      <div className="grid grid-cols-20 grid-rows-20 h-full w-full">
        {cells.map((cell) => {
          const row = Math.floor(cell / gridSize)
          const col = cell % gridSize
          const cellX = (col / gridSize) * viewport.width
          const cellY = (row / gridSize) * viewport.height
          const distance = Math.sqrt(Math.pow(mousePosition.x - cellX, 2) + Math.pow(mousePosition.y - cellY, 2))
          const isNear = distance < 150

          return (
            <motion.div
              key={cell}
              className="border border-purple-500/10 relative"
              animate={{
                backgroundColor: isNear ? "rgba(168, 85, 247, 0.1)" : "transparent",
                borderColor: isNear ? "rgba(168, 85, 247, 0.3)" : "rgba(168, 85, 247, 0.1)",
              }}
              transition={{ duration: 0.3 }}
            >
              {isNear && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
