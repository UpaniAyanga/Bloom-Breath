import { useEffect, useMemo, useState } from 'react'
import type { BreathingPhase, BreathingStep } from '../data/breathingTechniques'

interface TimerState {
  elapsedSeconds: number
  stepIndex: number
  stepElapsedSeconds: number
  isRunning: boolean
  isComplete: boolean
}

interface UseBreathingTimerOptions {
  steps: BreathingStep[]
  totalDurationSeconds: number
}

interface UseBreathingTimerResult {
  currentPhase: BreathingPhase
  secondsRemaining: number
  progress: number
  isRunning: boolean
  startTimer: () => void
  pauseTimer: () => void
  resetTimer: () => void
}

const initialTimerState: TimerState = {
  elapsedSeconds: 0,
  stepIndex: 0,
  stepElapsedSeconds: 0,
  isRunning: false,
  isComplete: false,
}

export function useBreathingTimer({
  steps,
  totalDurationSeconds,
}: UseBreathingTimerOptions): UseBreathingTimerResult {
  const [timerState, setTimerState] = useState<TimerState>(initialTimerState)

  const normalizedSteps = useMemo<BreathingStep[]>(() => {
    const safeSteps = steps.filter((step) => step.seconds > 0)
    return safeSteps.length > 0 ? safeSteps : [{ phase: 'inhale', seconds: 1 }]
  }, [steps])
  const safeTotalDuration = Math.max(1, totalDurationSeconds)
  const currentStep = normalizedSteps[timerState.stepIndex] ?? normalizedSteps[0]

  useEffect(() => {
    if (!timerState.isRunning || timerState.isComplete) {
      return
    }

    const timer = setInterval(() => {
      setTimerState((previous) => {
        if (!previous.isRunning || previous.isComplete) {
          return previous
        }

        // Tick global progress first; finish cleanly at the exact total duration.
        const nextElapsed = previous.elapsedSeconds + 1
        if (nextElapsed >= safeTotalDuration) {
          return {
            ...previous,
            elapsedSeconds: safeTotalDuration,
            stepElapsedSeconds: 0,
            isRunning: false,
            isComplete: true,
          }
        }

        // Move through inhale/hold/exhale steps and loop cycles continuously.
        const activeStep = normalizedSteps[previous.stepIndex] ?? normalizedSteps[0]
        const nextStepElapsed = previous.stepElapsedSeconds + 1

        if (nextStepElapsed >= activeStep.seconds) {
          return {
            ...previous,
            elapsedSeconds: nextElapsed,
            stepIndex: (previous.stepIndex + 1) % normalizedSteps.length,
            stepElapsedSeconds: 0,
          }
        }

        return {
          ...previous,
          elapsedSeconds: nextElapsed,
          stepElapsedSeconds: nextStepElapsed,
        }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [normalizedSteps, safeTotalDuration, timerState.isComplete, timerState.isRunning])

  const progress = Math.min(
    (timerState.elapsedSeconds / safeTotalDuration) * 100,
    100,
  )

  const secondsRemaining = timerState.isComplete
    ? 0
    : Math.max(currentStep.seconds - timerState.stepElapsedSeconds, 0)

  const startTimer = () => {
    setTimerState((previous) =>
      previous.isComplete ? previous : { ...previous, isRunning: true },
    )
  }

  const pauseTimer = () => {
    setTimerState((previous) => ({ ...previous, isRunning: false }))
  }

  const resetTimer = () => {
    setTimerState(initialTimerState)
  }

  return {
    currentPhase: timerState.isComplete ? 'exhale' : currentStep.phase,
    secondsRemaining,
    progress,
    isRunning: timerState.isRunning,
    startTimer,
    pauseTimer,
    resetTimer,
  }
}
