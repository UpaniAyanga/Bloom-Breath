import { motion, useReducedMotion } from 'framer-motion'

interface BloomingFlowerProps {
  progress: number
}

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value))
}

export default function BloomingFlower({ progress }: BloomingFlowerProps) {
  const shouldReduceMotion = useReducedMotion()
  const p = clamp(progress / 100)

  // Progressive bloom stages: seed -> stem -> leaves -> bud -> petals.
  const stemProgress = clamp((p - 0.08) / 0.38)
  const leafProgress = clamp((p - 0.32) / 0.28)
  const budProgress = clamp((p - 0.56) / 0.2)
  const petalProgress = clamp((p - 0.72) / 0.28)

  const petalColors = ['#FFC8DD', '#FFAFCC', '#F7B1C8', '#FDC9DC', '#FFB8CE', '#F7AFC8']
  const petalAngles = [-90, -36, 18, 72, 126, 180, 234, 288]

  return (
    <motion.svg
      viewBox="0 0 220 220"
      className="h-[170px] w-[170px]"
      animate={shouldReduceMotion ? undefined : { y: [0, -2, 0] }}
      transition={{
        duration: 6,
        repeat: Number.POSITIVE_INFINITY,
        ease: 'easeInOut',
      }}
    >
      <motion.ellipse
        cx="110"
        cy="190"
        rx="12"
        ry="6"
        fill="#8B6B4D"
        initial={false}
        animate={{ opacity: clamp(1 - stemProgress * 1.3, 0.15, 0.85) }}
        transition={{ duration: shouldReduceMotion ? 0.2 : 0.7 }}
      />

      <motion.path
        d="M110 186 C 105 156, 118 126, 110 92"
        fill="none"
        stroke="#6D8F5E"
        strokeWidth="6"
        strokeLinecap="round"
        style={{ pathLength: stemProgress }}
        initial={false}
        animate={{ pathLength: stemProgress }}
        transition={{ duration: shouldReduceMotion ? 0.2 : 0.8, ease: 'easeOut' }}
      />

      <motion.g
        initial={false}
        animate={{ opacity: leafProgress, scale: 0.78 + leafProgress * 0.22 }}
        transition={{ duration: shouldReduceMotion ? 0.2 : 0.6 }}
      >
        <ellipse
          cx="92"
          cy="142"
          rx="16"
          ry="7"
          transform="rotate(-26 92 142)"
          fill="#A5C497"
        />
        <ellipse
          cx="126"
          cy="129"
          rx="15"
          ry="7"
          transform="rotate(30 126 129)"
          fill="#A5C497"
        />
      </motion.g>

      <motion.circle
        cx="110"
        cy="86"
        r="11"
        fill="#F3A9C2"
        initial={false}
        animate={{ opacity: 0.25 + budProgress * 0.75, scale: 0.5 + budProgress * 0.5 }}
        transition={{ duration: shouldReduceMotion ? 0.2 : 0.55, ease: 'easeOut' }}
      />

      {petalAngles.map((angle, index) => {
        const localBloom = clamp(petalProgress * 1.22 - index * 0.08)
        return (
          <motion.g
            key={angle}
            transform={`rotate(${angle} 110 86)`}
            initial={false}
            animate={{
              opacity: localBloom,
              scale: 0.18 + localBloom * 0.82,
            }}
            transition={{ duration: shouldReduceMotion ? 0.2 : 0.8, ease: 'easeOut' }}
            style={{ transformOrigin: '110px 86px' }}
          >
            <ellipse
              cx="110"
              cy="62"
              rx="9"
              ry="21"
              fill={petalColors[index % petalColors.length]}
            />
          </motion.g>
        )
      })}

      <motion.circle
        cx="110"
        cy="86"
        r="8"
        fill="#FCE7A6"
        initial={false}
        animate={{ opacity: 0.35 + petalProgress * 0.65, scale: 0.7 + petalProgress * 0.3 }}
        transition={{ duration: shouldReduceMotion ? 0.2 : 0.55 }}
      />
    </motion.svg>
  )
}
