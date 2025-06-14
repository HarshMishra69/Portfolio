"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useEffect, useState } from "react"

export function FireGlobe() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.9])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 0.8, 0.8, 0.3])

  // Generate fire particles
  const [fireParticles, setFireParticles] = useState<
    Array<{
      id: number
      x: number
      y: number
      size: number
      delay: number
      duration: number
    }>
  >([])

  useEffect(() => {
    const particles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 2,
    }))
    setFireParticles(particles)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <motion.div
        ref={ref}
        style={{ rotate, scale, opacity }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96"
      >
        {/* Main fire globe */}
        <div className="relative w-full h-full">
          {/* Core globe */}
          <motion.div
            animate={{
              boxShadow: [
                "0 0 60px #ff4500, 0 0 120px #ff6500, 0 0 180px #ff8500",
                "0 0 80px #ff6500, 0 0 160px #ff8500, 0 0 240px #ffa500",
                "0 0 60px #ff4500, 0 0 120px #ff6500, 0 0 180px #ff8500",
              ],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-500 via-red-500 to-yellow-500 opacity-60"
          />

          {/* Fire particles */}
          {fireParticles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full bg-gradient-to-t from-red-500 via-orange-400 to-yellow-300"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
              }}
              animate={{
                y: [-20, -60, -100],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.3],
              }}
              transition={{
                duration: particle.duration,
                repeat: Number.POSITIVE_INFINITY,
                delay: particle.delay,
                ease: "easeOut",
              }}
            />
          ))}

          {/* Rotating fire rings */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border-2 border-orange-400/30"
              style={{
                transform: `scale(${1 + i * 0.2})`,
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 10 + i * 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          ))}

          {/* Data science symbols floating around */}
          {["AI", "ML", "Data", "Python", "TensorFlow"].map((text, i) => (
            <motion.div
              key={text}
              className="absolute text-orange-300/40 font-mono text-sm font-bold"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 360],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 4 + i,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.5,
              }}
            >
              {text}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
