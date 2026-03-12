import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import type { BreathingPhase } from '../data/breathingTechniques'

interface BreathingCircleProps {
  currentPhase: BreathingPhase
  children?: ReactNode
}

const phaseScaleMap: Record<BreathingPhase, number> = {
  inhale: 1.18,
  hold: 1.18,
  exhale: 0.88,
}

const phaseGlowMap: Record<BreathingPhase, string> = {
  inhale: '0 0 38px rgba(171, 199, 160, 0.52)',
  hold: '0 0 20px rgba(171, 199, 160, 0.3)',
  exhale: '0 0 12px rgba(171, 199, 160, 0.18)',
}

export default function BreathingCircle({
  currentPhase,
  children,
}: BreathingCircleProps) {
  return (
    <div className="relative flex h-64 w-64 items-center justify-center rounded-full bg-[#FDFBF7] shadow-[0_14px_40px_rgba(131,140,127,0.2)]">
      <motion.div
        className="flex h-48 w-48 items-center justify-center rounded-full bg-[#E7F0E4] shadow-inner"
        animate={{ scale: phaseScaleMap[currentPhase], boxShadow: phaseGlowMap[currentPhase] }}
        transition={{ duration: 1.8, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </div>
  )
}
