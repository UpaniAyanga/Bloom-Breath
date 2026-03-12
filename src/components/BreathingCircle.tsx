import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import type { BreathingPhase } from '../data/breathingTechniques'

interface BreathingCircleProps {
  currentPhase: BreathingPhase
  children: ReactNode
}

const phaseScaleMap: Record<BreathingPhase, number> = {
  inhale: 1.18,
  hold: 1.18,
  exhale: 0.88,
}

export default function BreathingCircle({
  currentPhase,
  children,
}: BreathingCircleProps) {
  return (
    <div className="relative flex h-64 w-64 items-center justify-center rounded-full bg-[#FDFBF7] shadow-[0_14px_40px_rgba(131,140,127,0.2)]">
      <motion.div
        className="flex h-48 w-48 items-center justify-center rounded-full bg-[#E7F0E4] shadow-inner"
        animate={{ scale: phaseScaleMap[currentPhase] }}
        transition={{ duration: 1.8, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </div>
  )
}
