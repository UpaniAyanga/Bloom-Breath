import { motion } from 'framer-motion'

export type FlowerStage = 'seed' | 'sprout' | 'stem' | 'bud' | 'flower'

interface FlowerProps {
  stage: FlowerStage
  color: string
  size?: number
  float?: boolean
  delay?: number
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

export default function Flower({
  stage,
  color,
  size = 64,
  float = false,
  delay = 0,
}: FlowerProps) {
  return (
    <motion.div
      animate={
        float
          ? { y: [0, -8, 0] }
          : { scale: stageScaleMap[stage], opacity: stageOpacityMap[stage] }
      }
      transition={{
        duration: float ? 5 : 1.2,
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
            y2={stage === 'sprout' ? '65' : '42'}
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

        {(stage === 'bud' || stage === 'flower') && <circle cx="50" cy="38" r="9" fill={color} />}

        {stage === 'flower' && (
          <>
            <circle cx="50" cy="25" r="8" fill={color} fillOpacity="0.88" />
            <circle cx="63" cy="31" r="8" fill={color} fillOpacity="0.88" />
            <circle cx="63" cy="45" r="8" fill={color} fillOpacity="0.88" />
            <circle cx="50" cy="51" r="8" fill={color} fillOpacity="0.88" />
            <circle cx="37" cy="45" r="8" fill={color} fillOpacity="0.88" />
            <circle cx="37" cy="31" r="8" fill={color} fillOpacity="0.88" />
            <circle cx="50" cy="38" r="7" fill="#F5E9D6" />
          </>
        )}
      </motion.svg>
    </motion.div>
  )
}
