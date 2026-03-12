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
  return (
    <div className="text-center">
      <p className="text-xs tracking-[0.3em] text-[#7A8D76]">{phaseLabelMap[currentPhase]}</p>
      <p className="mt-1 text-4xl font-semibold text-[#566458]">{secondsRemaining}s</p>
      <p className="mt-2 text-xs text-[#8A8A87]">{Math.round(progress)}% complete</p>
    </div>
  )
}
