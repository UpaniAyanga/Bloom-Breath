import { useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Flower, { type FlowerStage } from './Flower'

interface GardenProps {
  progress: number
}

interface GardenSeed {
  id: string
  seed: number
  size: number
  lift: number
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

function stageFromProgress(progress: number): FlowerStage {
  if (progress < 20) return 'seed'
  if (progress < 40) return 'sprout'
  if (progress < 60) return 'stem'
  if (progress < 80) return 'bud'
  return 'flower'
}

export default function Garden({ progress }: GardenProps) {
  const shouldReduceMotion = useReducedMotion()
  const normalizedProgress = Math.max(0, Math.min(100, progress))
  const totalFlowers = 6

  const flowerSeeds = useMemo<GardenSeed[]>(() => {
    const random = createSeededRandom(31062026)
    return Array.from({ length: totalFlowers }, (_, index) => ({
      id: `garden-seed-${index}`,
      seed: Math.floor(randomInRange(random, 1000, 90000)),
      size: randomInRange(random, 58, 74),
      lift: randomInRange(random, -6, 7),
    }))
  }, [])

  // Garden growth logic: reveal more flowers as progress advances through the session.
  const flowerCount = Math.max(
    1,
    Math.min(totalFlowers, Math.floor((normalizedProgress / 100) * totalFlowers) + 1),
  )
  const stage = stageFromProgress(normalizedProgress)
  const flowers = flowerSeeds.slice(0, flowerCount)

  return (
    <section className="mt-10 w-full max-w-md">
      <p className="text-center text-sm font-medium tracking-[0.12em] uppercase text-[#6B705C]">
        Your breathing garden
      </p>

      <div className="mt-4 flex w-full items-end justify-center gap-6">
        {flowers.map((flower, index) => (
          <motion.div
            key={flower.id}
            className="flex items-end"
            style={{ marginBottom: `${flower.lift}px` }}
            animate={shouldReduceMotion ? undefined : { y: [0, -2, 0] }}
            transition={{
              duration: 5 + index * 0.3,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'easeInOut',
              delay: index * 0.15,
            }}
          >
            <Flower
              seed={flower.seed}
              stage={stage}
              size={flower.size}
              float={stage === 'flower' && !shouldReduceMotion}
              delay={index * 0.08}
            />
          </motion.div>
        ))}
      </div>

      <div className="mx-auto mt-4 h-2 w-[86%] rounded-full bg-gradient-to-r from-[#C9D8B6] via-[#BFD7A7] to-[#C9D8B6] opacity-45" />
    </section>
  )
}
