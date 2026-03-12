export type BreathingPhase = 'inhale' | 'hold' | 'exhale'

export interface BreathingStep {
  phase: BreathingPhase
  seconds: number
}

export interface BreathingTechnique {
  id: string
  name: string
  steps: BreathingStep[]
  totalDurationSeconds: number
  description: string
  isCustom?: boolean
}

export const breathingTechniques: BreathingTechnique[] = [
  {
    id: 'box-breathing',
    name: 'Box Breathing',
    steps: [
      { phase: 'inhale', seconds: 4 },
      { phase: 'hold', seconds: 4 },
      { phase: 'exhale', seconds: 4 },
      { phase: 'hold', seconds: 4 },
    ],
    totalDurationSeconds: 4 * 60,
    description: 'Inhale 4 • Hold 4 • Exhale 4 • Hold 4',
  },
  {
    id: '478-breathing',
    name: '4-7-8 Breathing',
    steps: [
      { phase: 'inhale', seconds: 4 },
      { phase: 'hold', seconds: 7 },
      { phase: 'exhale', seconds: 8 },
    ],
    totalDurationSeconds: 3 * 60,
    description: 'Inhale 4 • Hold 7 • Exhale 8',
  },
  {
    id: 'resonance-breathing',
    name: 'Resonance Breathing',
    steps: [
      { phase: 'inhale', seconds: 5 },
      { phase: 'exhale', seconds: 5 },
    ],
    totalDurationSeconds: 5 * 60,
    description: 'Inhale 5 • Exhale 5',
  },
  {
    id: 'physiological-sigh',
    name: 'Physiological Sigh',
    steps: [
      { phase: 'inhale', seconds: 3 },
      { phase: 'inhale', seconds: 1 },
      { phase: 'exhale', seconds: 6 },
    ],
    totalDurationSeconds: 2 * 60,
    description: 'Inhale 3 • Inhale 1 • Exhale 6',
  },
]
