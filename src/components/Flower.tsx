import { motion } from 'framer-motion'
import { useMemo } from 'react'

export type FlowerStage = 'seed' | 'sprout' | 'stem' | 'bud' | 'flower'

interface FlowerProps {
  stage: FlowerStage
  color?: string
  size?: number
  float?: boolean
  delay?: number
  seed?: number
}

const stageScaleMap: Record<FlowerStage, number> = {
  seed: 0.35,
  sprout: 0.55,
  stem: 0.75,
  bud: 0.9,
  flower: 1,
}

const stageOpacityMap: Record<FlowerStage, number> = {
  seed: 0.5,
  sprout: 0.7,
  stem: 0.8,
  bud: 0.9,
  flower: 1,
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

export default function Flower({
  stage,
  color,
  size = 64,
  float = false,
  delay = 0,
  seed = 1001,
}: FlowerProps) {
  const variation = useMemo(() => {
    const random = createSeededRandom(seed)
    const palette = ['#FFC8DD', '#FFAFCC', '#CDB4DB', '#BDE0FE', '#A2D2FF']
    const petalCount = Math.floor(randomInRange(random, 5, 9))
    const petalLength = randomInRange(random, 8, 14)
    const petalWidth = randomInRange(random, 3, 6)
    const rotation = randomInRange(random, 0, 360)
    const petalColor = color ?? palette[Math.floor(random() * palette.length)]

    const petals = Array.from({ length: petalCount }, (_, index) => ({
      angle: rotation + (index * 360) / petalCount,
      length: petalLength * randomInRange(random, 0.88, 1.12),
      width: petalWidth * randomInRange(random, 0.9, 1.1),
    }))

    return {
      petals,
      petalColor,
      coreColor: '#FFF3D6',
      stemHeight: randomInRange(random, 38, 44),
    }
  }, [color, seed])

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={
        float
          ? { scale: stageScaleMap[stage], opacity: stageOpacityMap[stage], y: [0, -3, 0] }
          : { scale: stageScaleMap[stage], opacity: stageOpacityMap[stage] }
      }
      transition={{
        duration: float ? 5.2 : 0.8,
        delay,
        ease: 'easeInOut',
        repeat: float ? Number.POSITIVE_INFINITY : 0,
      }}
      style={{ width: size, height: size }}
    >
      <motion.svg
        viewBox="0 0 100 100"
        className="h-full w-full"
        animate={{ scale: stageScaleMap[stage], opacity: stageOpacityMap[stage] }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        {(stage === 'sprout' ||
          stage === 'stem' ||
          stage === 'bud' ||
          stage === 'flower') && (
          <line
            x1="50"
            y1="86"
            x2="50"
            y2={stage === 'sprout' ? '66' : `${86 - variation.stemHeight}`}
            stroke="#88A580"
            strokeWidth="4"
            strokeLinecap="round"
          />
        )}

        {(stage === 'sprout' || stage === 'stem' || stage === 'bud' || stage === 'flower') && (
          <>
            <ellipse cx="42" cy="63" rx="8" ry="5" fill="#B8D8AE" transform="rotate(-28 42 63)" />
            <ellipse cx="58" cy="57" rx="8" ry="5" fill="#B8D8AE" transform="rotate(28 58 57)" />
          </>
        )}

        {(stage === 'seed' || stage === 'sprout') && (
          <ellipse cx="50" cy="86" rx="9" ry="5" fill="#8B6B4D" />
        )}

        {(stage === 'bud' || stage === 'flower') && (
          <circle cx="50" cy={86 - variation.stemHeight} r="8" fill={variation.petalColor} />
        )}

        {stage === 'flower' && (
          <>
            {variation.petals.map((petal) => (
              <ellipse
                key={`${seed}-${petal.angle.toFixed(2)}`}
                cx="50"
                cy={`${86 - variation.stemHeight - petal.length * 0.58}`}
                rx={petal.width}
                ry={petal.length}
                fill={variation.petalColor}
                fillOpacity="0.9"
                transform={`rotate(${petal.angle} 50 ${86 - variation.stemHeight})`}
              />
            ))}
            <circle cx="50" cy={86 - variation.stemHeight} r="7" fill={variation.coreColor} />
          </>
        )}
      </motion.svg>
    </motion.div>
  )
}
