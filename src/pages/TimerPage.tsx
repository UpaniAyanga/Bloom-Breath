import { useEffect, useRef } from 'react'
import BreathingCircle from '../components/BreathingCircle'
import Garden from '../components/Garden'
import TimerDisplay from '../components/TimerDisplay'
import type { BreathingTechnique } from '../data/breathingTechniques'
import { useBreathingTimer } from '../hooks/useBreathingTimer'

interface TimerPageProps {
  technique: BreathingTechnique
  onBack: () => void
  onSessionComplete: () => void
  onProgressChange: (progress: number) => void
}

export default function TimerPage({
  technique,
  onBack,
  onSessionComplete,
  onProgressChange,
}: TimerPageProps) {
  const completionHandledRef = useRef(false)
  const {
    currentPhase,
    secondsRemaining,
    progress,
    isRunning,
    startTimer,
    pauseTimer,
    resetTimer,
  } = useBreathingTimer({
    steps: technique.steps,
    totalDurationSeconds: technique.totalDurationSeconds,
  })

  useEffect(() => {
    if (progress < 100 || isRunning || completionHandledRef.current) {
      return
    }

    completionHandledRef.current = true
    onSessionComplete()
    const timeout = setTimeout(() => onBack(), 1400)
    return () => clearTimeout(timeout)
  }, [isRunning, onBack, onSessionComplete, progress])

  useEffect(() => {
    onProgressChange(progress)
  }, [onProgressChange, progress])

  const handleReset = () => {
    completionHandledRef.current = false
    resetTimer()
  }

  const hasFinished = progress >= 100 && !isRunning

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[480px] flex-col items-center px-6 py-12">
      <button
        onClick={onBack}
        className="self-start rounded-full border border-[#DED9D1] px-3 py-1.5 text-xs font-medium text-[#6B7268]"
      >
        Back
      </button>

      <header className="mt-6 text-center">
        <h1 className="text-3xl font-medium tracking-wide text-[#3A3A3A]">Breathe and Bloom</h1>
        <p className="mt-2 text-sm text-[#6F7568]">Grow calm with every breath</p>
        <p className="mt-1 text-xs tracking-[0.15em] text-[#8C9087] uppercase">{technique.name}</p>
      </header>

      <section className="mt-8 flex w-full flex-col items-center rounded-3xl bg-[#FDFBF7]/65 p-6 shadow-[0_14px_44px_rgba(131,140,127,0.14)]">
        <BreathingCircle currentPhase={currentPhase} />

        <TimerDisplay
          currentPhase={currentPhase}
          secondsRemaining={secondsRemaining}
          progress={progress}
        />

        <Garden progress={progress} />
      </section>

      <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-[#E7E2D8]">
        <div
          className="h-full rounded-full bg-[#A9BCA2] transition-[width] duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {hasFinished && (
        <p className="mt-3 text-center text-sm text-[#73806D]">
          Session complete. Your flower has been added to the garden.
        </p>
      )}

      <div className="mt-5 flex items-center justify-center gap-2">
        {!isRunning ? (
          <button
            onClick={startTimer}
            className="rounded-full bg-[#A9BCA2] px-5 py-2 text-sm font-medium text-white"
          >
            Start
          </button>
        ) : (
          <button
            onClick={pauseTimer}
            className="rounded-full bg-[#EADDEB] px-5 py-2 text-sm font-medium text-[#785C86]"
          >
            Pause
          </button>
        )}

        <button
          onClick={handleReset}
          className="rounded-full border border-[#DDD7CE] px-5 py-2 text-sm font-medium text-[#72776F]"
        >
          Reset
        </button>
      </div>
    </main>
  )
}
