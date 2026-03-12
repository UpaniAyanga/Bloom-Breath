import { motion, useReducedMotion } from 'framer-motion'
import type { BloomVariant } from '../data/bloomVariants'

interface BloomingFlowerProps {
  progress: number
  size?: number
  variant: BloomVariant
}

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value))
}

export default function BloomingFlower({
  progress,
  size = 182,
  variant,
}: BloomingFlowerProps) {
  const shouldReduceMotion = useReducedMotion()
  const p = clamp(progress / 100)

  // Bloom progression tied directly to session progress.
  const stemProgress = clamp((p - 0.05) / 0.3)
  const leafProgress = clamp((p - 0.24) / 0.24)
  const budProgress = clamp((p - 0.42) / 0.2)
  const petalProgress = clamp((p - 0.5) / 0.5)
  const petalAngles = [0, 60, 120, 180, 240, 300]
  const centerX = 130
  const centerY = 95
  const unique = variant.id.replace(/[^a-zA-Z0-9_-]/g, '')
  const petalGradientId = `petal-grad-${unique}`
  const leafGradientId = `leaf-grad-${unique}`

  return (
    <motion.svg
      viewBox="0 0 260 260"
      style={{ width: size, height: size }}
      animate={shouldReduceMotion ? undefined : { y: [0, -2, 0] }}
      transition={{
        duration: 6,
        repeat: Number.POSITIVE_INFINITY,
        ease: 'easeInOut',
      }}
    >
      <defs>
        <radialGradient id={petalGradientId} cx="38%" cy="30%" r="72%">
          <stop offset="0%" stopColor={variant.petalHighlight} />
          <stop offset="55%" stopColor={variant.petalBase} />
          <stop offset="100%" stopColor={variant.petalShadow} />
        </radialGradient>
        <linearGradient id={leafGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={variant.leafBase} />
          <stop offset="100%" stopColor={variant.leafShadow} />
        </linearGradient>
      </defs>

      <motion.ellipse
        cx="130"
        cy="230"
        rx="16"
        ry="8"
        fill="#8B6B4D"
        initial={false}
        animate={{ opacity: clamp(1 - stemProgress * 1.4, 0.12, 0.8) }}
        transition={{ duration: shouldReduceMotion ? 0.2 : 0.7 }}
      />

      <motion.path
        d="M130 228 C 122 187, 138 144, 130 104"
        fill="none"
        stroke={variant.stem}
        strokeWidth="7"
        strokeLinecap="round"
        style={{ pathLength: stemProgress }}
        initial={false}
        animate={{ pathLength: stemProgress }}
        transition={{ duration: shouldReduceMotion ? 0.2 : 0.8, ease: 'easeOut' }}
      />
      <motion.path
        d="M130 228 C 122 187, 138 144, 130 104"
        fill="none"
        stroke={variant.outline}
        strokeWidth="1.6"
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
        <path
          d="M126 171 C 101 154, 76 162, 65 187 C 92 193, 114 187, 126 171 Z"
          fill={`url(#${leafGradientId})`}
          stroke={variant.outline}
          strokeWidth="1.6"
        />
        <path
          d="M132 154 C 153 136, 176 138, 189 161 C 166 170, 145 166, 132 154 Z"
          fill={`url(#${leafGradientId})`}
          stroke={variant.outline}
          strokeWidth="1.6"
        />
        <path d="M92 186 C 102 177, 112 174, 123 171" fill="none" stroke={variant.outline} strokeWidth="1" />
        <path d="M150 164 C 161 158, 172 158, 183 160" fill="none" stroke={variant.outline} strokeWidth="1" />
      </motion.g>

      {petalAngles.map((angle, index) => {
        const revealStart = index * 0.07
        const localBloom = clamp((petalProgress - revealStart) / (1 - revealStart))
        return (
          <motion.g
            key={`petal-${angle}`}
            transform={`rotate(${angle} ${centerX} ${centerY})`}
            initial={false}
            animate={{ opacity: localBloom, scale: 0.2 + localBloom * 0.8 }}
            transition={{ duration: shouldReduceMotion ? 0.2 : 0.8, ease: 'easeOut' }}
            style={{ transformOrigin: `${centerX}px ${centerY}px` }}
          >
            <path
              d={`M ${centerX} ${centerY} C ${centerX - 13} ${centerY - 14}, ${centerX - 16} ${centerY - 45}, ${centerX} ${centerY - 68} C ${centerX + 16} ${centerY - 45}, ${centerX + 13} ${centerY - 14}, ${centerX} ${centerY}`}
              fill={`url(#${petalGradientId})`}
              stroke={variant.outline}
              strokeWidth="1.6"
            />
            <path
              d={`M ${centerX - 4} ${centerY - 28} C ${centerX - 8} ${centerY - 41}, ${centerX - 8} ${centerY - 53}, ${centerX - 1} ${centerY - 60}`}
              fill="none"
              stroke={variant.petalHighlight}
              strokeOpacity="0.85"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </motion.g>
        )
      })}

      <motion.circle
        cx={centerX}
        cy={centerY}
        r="15"
        fill={variant.centerOuter}
        stroke={variant.outline}
        strokeWidth="1.6"
        initial={false}
        animate={{ opacity: 0.15 + budProgress * 0.85, scale: 0.55 + budProgress * 0.45 }}
        transition={{ duration: shouldReduceMotion ? 0.2 : 0.5, ease: 'easeOut' }}
      />
      <motion.circle
        cx={centerX}
        cy={centerY}
        r="9"
        fill={variant.centerInner}
        stroke={variant.outline}
        strokeWidth="1.4"
        initial={false}
        animate={{ opacity: 0.3 + petalProgress * 0.7, scale: 0.65 + petalProgress * 0.35 }}
        transition={{ duration: shouldReduceMotion ? 0.2 : 0.55 }}
      />
    </motion.svg>
  )
}
