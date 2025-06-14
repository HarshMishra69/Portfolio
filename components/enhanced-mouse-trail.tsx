"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface MousePosition {
  x: number
  y: number
  id: number
}

interface FireParticle {
  x: number
  y: number
  id: number
  size: number
  color: string
}

export function EnhancedMouseTrail() {
  const [mouseTrail, setMouseTrail] = useState<MousePosition[]>([])
  const [fireParticles, setFireParticles] = useState<FireParticle[]>([])
  const [isClient, setIsClient] = useState(false)
  const [isMoving, setIsMoving] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const colors = [
    "from-orange-500 to-red-500",
    "from-red-500 to-pink-500",
    "from-yellow-500 to-orange-500",
    "from-purple-500 to-pink-500",
    "from-blue-500 to-purple-500",
  ]

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setIsMoving(true)

    // Add to mouse trail
    setMouseTrail((prev) => [{ x: e.clientX, y: e.clientY, id: Date.now() }, ...prev.slice(0, 15)])

    // Add fire particles
    const newParticles: FireParticle[] = Array.from({ length: 3 }, (_, i) => ({
      x: e.clientX + (Math.random() - 0.5) * 30,
      y: e.clientY + (Math.random() - 0.5) * 30,
      id: Date.now() + i,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))

    setFireParticles((prev) => [...newParticles, ...prev.slice(0, 20)])

    // Clear moving state after a delay
    setTimeout(() => setIsMoving(false), 100)
  }, [])

  useEffect(() => {
    if (!isClient) return

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [handleMouseMove, isClient])

  if (!isClient) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Enhanced mouse trail */}
      <AnimatePresence>
        {mouseTrail.map((position, index) => (
          <motion.div
            key={position.id}
            initial={{ opacity: 0.8, scale: 1 }}
            animate={{ opacity: 0, scale: 0.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`absolute w-4 h-4 bg-gradient-to-r ${colors[index % colors.length]} rounded-full blur-sm`}
            style={{
              left: position.x - 8,
              top: position.y - 8,
              opacity: Math.max(0.8 - index * 0.05, 0),
            }}
          />
        ))}
      </AnimatePresence>

      {/* Fire particles */}
      <AnimatePresence>
        {fireParticles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ opacity: 0.8, scale: 1, y: 0 }}
            animate={{
              opacity: 0,
              scale: 0.2,
              y: -50,
              x: (Math.random() - 0.5) * 40,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className={`absolute bg-gradient-to-t ${particle.color} rounded-full`}
            style={{
              left: particle.x - particle.size / 2,
              top: particle.y - particle.size / 2,
              width: particle.size,
              height: particle.size,
            }}
          />
        ))}
      </AnimatePresence>

      {/* Cursor glow effect */}
      {isMoving && (
        <motion.div
          className="absolute w-8 h-8 bg-gradient-to-r from-orange-400 to-red-400 rounded-full blur-xl opacity-60"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
          style={{
            left: mouseTrail[0]?.x - 16 || 0,
            top: mouseTrail[0]?.y - 16 || 0,
          }}
        />
      )}
    </div>
  )
}
