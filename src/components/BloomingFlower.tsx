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
  const petalProgress = clamp((p - 0.7) / 0.3)

  const backPetalColors = ['#FFD2E5', '#FEC6DE', '#FBBAD4', '#F5B3CF']
  const frontPetalColors = ['#FFA8CC', '#FFB8D5', '#F79BC3', '#F3A7C9']
  const petalAngles = [-90, -45, 0, 45, 90, 135, 180, 225]

  return (
    <motion.svg
      viewBox="0 0 240 240"
      className="h-[182px] w-[182px]"
      animate={shouldReduceMotion ? undefined : { y: [0, -2, 0] }}
      transition={{
        duration: 6,
        repeat: Number.POSITIVE_INFINITY,
        ease: 'easeInOut',
      }}
    >
      <defs>
        <linearGradient id="stemGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8DB07B" />
          <stop offset="100%" stopColor="#5F7F52" />
        </linearGradient>
        <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C6DEB9" />
          <stop offset="100%" stopColor="#8FAE7E" />
        </linearGradient>
        <radialGradient id="coreGradient" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#FFF9CC" />
          <stop offset="100%" stopColor="#F6D77B" />
        </radialGradient>
      </defs>

      <motion.ellipse
        cx="120"
        cy="206"
        rx="16"
        ry="7"
        fill="#8B6B4D"
        initial={false}
        animate={{ opacity: clamp(1 - stemProgress * 1.3, 0.15, 0.85) }}
        transition={{ duration: shouldReduceMotion ? 0.2 : 0.7 }}
      />

      <motion.path
        d="M120 202 C 112 168, 132 138, 120 96"
        fill="none"
        stroke="url(#stemGradient)"
        strokeWidth="7"
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
          cx="98"
          cy="150"
          rx="20"
          ry="8"
          transform="rotate(-27 98 150)"
          fill="url(#leafGradient)"
        />
        <ellipse
          cx="138"
          cy="136"
          rx="19"
          ry="8"
          transform="rotate(30 138 136)"
          fill="url(#leafGradient)"
        />
      </motion.g>

      <motion.circle
        cx="120"
        cy="90"
        r="12"
        fill="#F6AEC8"
        initial={false}
        animate={{ opacity: 0.25 + budProgress * 0.75, scale: 0.5 + budProgress * 0.5 }}
        transition={{ duration: shouldReduceMotion ? 0.2 : 0.55, ease: 'easeOut' }}
      />

      {petalAngles.map((angle, index) => {
        const revealStart = index * 0.07
        const localBloom = clamp((petalProgress - revealStart) / (1 - revealStart))
        return (
          <motion.g
            key={`back-${angle}`}
            transform={`rotate(${angle} 120 90)`}
            initial={false}
            animate={{ opacity: localBloom, scale: 0.2 + localBloom * 0.8 }}
            transition={{ duration: shouldReduceMotion ? 0.2 : 0.8, ease: 'easeOut' }}
            style={{ transformOrigin: '120px 90px' }}
          >
            <ellipse
              cx="120"
              cy="62"
              rx="10"
              ry="24"
              fill={backPetalColors[index % backPetalColors.length]}
              fillOpacity="0.9"
            />
          </motion.g>
        )
      })}

      {petalAngles.map((angle, index) => {
        const revealStart = index * 0.07
        // At 100% timer progress, every petal reaches full bloom.
        const localBloom = clamp((petalProgress - revealStart) / (1 - revealStart))
        return (
          <motion.g
            key={`front-${angle}`}
            transform={`rotate(${angle + 20} 120 90)`}
            initial={false}
            animate={{
              opacity: localBloom,
              scale: 0.18 + localBloom * 0.82,
            }}
            transition={{ duration: shouldReduceMotion ? 0.2 : 0.8, ease: 'easeOut' }}
            style={{ transformOrigin: '120px 90px' }}
          >
            <ellipse
              cx="120"
              cy="64"
              rx="9"
              ry="21"
              fill={frontPetalColors[index % frontPetalColors.length]}
            />
          </motion.g>
        )
      })}

      <motion.circle
        cx="120"
        cy="90"
        r="9"
        fill="url(#coreGradient)"
        initial={false}
        animate={{ opacity: 0.35 + petalProgress * 0.65, scale: 0.7 + petalProgress * 0.3 }}
        transition={{ duration: shouldReduceMotion ? 0.2 : 0.55 }}
      />
    </motion.svg>
  )
}
