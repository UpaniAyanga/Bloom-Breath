import { motion, useReducedMotion } from 'framer-motion'
import { useMemo } from 'react'

interface ParticleSeed {
  id: number
  left: number
  size: number
  driftX: number
  riseDistance: number
  duration: number
  delay: number
  peakOpacity: number
  color: string
  top: number
}

function createSeededRandom(seed: number) {
  let state = seed >>> 0
  return () => {
    state = (1664525 * state + 1013904223) >>> 0
    return state / 4294967296
  }
}

function randomInRange(random: () => number, min: number, max: number) {
  return random() * (max - min) + min
}

export default function PollenParticles() {
  const shouldReduceMotion = useReducedMotion()

  const particles = useMemo<ParticleSeed[]>(() => {
    // Particle seeds are created once so animation stays lightweight and stable.
    const random = createSeededRandom(20260312)
    const count = Math.floor(randomInRange(random, 15, 26))
    const palette = ['#F8E9B5', '#F5E6C8', '#F4E3AF']

    return Array.from({ length: count }, (_, index) => ({
      id: index,
      left: randomInRange(random, 2, 98),
      size: randomInRange(random, 2, 4),
      driftX: randomInRange(random, -16, 16),
      riseDistance: randomInRange(random, 260, 390),
      duration: randomInRange(random, 15, 25),
      delay: -randomInRange(random, 0, 24),
      peakOpacity: randomInRange(random, 0.3, 0.5),
      color: palette[Math.floor(random() * palette.length)],
      top: randomInRange(random, 18, 88),
    }))
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full blur-[0.2px]"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.left}%`,
            bottom: shouldReduceMotion ? 'auto' : '-7%',
            top: shouldReduceMotion ? `${particle.top}%` : undefined,
            backgroundColor: particle.color,
          }}
          initial={shouldReduceMotion ? undefined : { y: 0, x: 0, opacity: 0 }}
          animate={
            shouldReduceMotion
              ? { opacity: particle.peakOpacity * 0.5 }
              : {
                  y: -particle.riseDistance,
                  x: [0, particle.driftX, 0],
                  opacity: [0, particle.peakOpacity, 0],
                }
          }
          transition={
            shouldReduceMotion
              ? { duration: 0.2, ease: 'linear' }
              : {
                  duration: particle.duration,
                  delay: particle.delay,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: 'easeInOut',
                }
          }
        />
      ))}
    </div>
  )
}
