import { motion, useReducedMotion } from 'framer-motion'

export default function SkyGradient() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        // Slow-moving pastel sky to keep the scene calm and readable.
        background:
          'linear-gradient(120deg, #F8F6F2 0%, #FDE2E4 36%, #E2F0CB 68%, #CDE7F0 100%)',
        backgroundSize: '240% 240%',
        backgroundPosition: '50% 50%',
        opacity: 0.62,
      }}
      animate={
        shouldReduceMotion
          ? undefined
          : {
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }
      }
      transition={
        shouldReduceMotion
          ? undefined
          : {
              duration: 26,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'easeInOut',
            }
      }
    />
  )
}
