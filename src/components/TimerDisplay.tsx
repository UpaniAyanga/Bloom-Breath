import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import type { BreathingPhase } from '../data/breathingTechniques'

interface TimerDisplayProps {
  currentPhase: BreathingPhase
  secondsRemaining: number
  progress: number
}

const phaseLabelMap: Record<BreathingPhase, string> = {
  inhale: 'INHALE',
  hold: 'HOLD',
  exhale: 'EXHALE',
}

export default function TimerDisplay({
  currentPhase,
  secondsRemaining,
  progress,
}: TimerDisplayProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="mt-6 text-center">
      {shouldReduceMotion ? (
        <p className="text-4xl font-semibold tracking-widest uppercase text-[#6B705C]">
          {phaseLabelMap[currentPhase]}
        </p>
      ) : (
        <AnimatePresence mode="wait">
          <motion.p
            key={currentPhase}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="text-4xl font-semibold tracking-widest uppercase text-[#6B705C]"
          >
            {phaseLabelMap[currentPhase]}
          </motion.p>
        </AnimatePresence>
      )}
      <p className="mt-2 text-5xl font-semibold text-[#55604E]">{secondsRemaining}s</p>
      <p className="mt-2 text-xs tracking-[0.22em] text-[#8A8A87]">{Math.round(progress)}% COMPLETE</p>
    </div>
  )
}
