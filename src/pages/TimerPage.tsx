import { useEffect, useRef, useState } from 'react'
import BloomingFlower from '../components/BloomingFlower'
import BreathingCircle from '../components/BreathingCircle'
import CompletionModal from '../components/CompletionModal'
import TimerDisplay from '../components/TimerDisplay'
import type { BloomVariant } from '../data/bloomVariants'
import type { BreathingTechnique } from '../data/breathingTechniques'
import { useBreathingTimer } from '../hooks/useBreathingTimer'

interface TimerPageProps {
  technique: BreathingTechnique
  bloomVariant: BloomVariant
  onBack: () => void
  onSessionComplete: () => void
}

export default function TimerPage({
  technique,
  bloomVariant,
  onBack,
  onSessionComplete,
}: TimerPageProps) {
  const completionHandledRef = useRef(false)
  const [completionDismissed, setCompletionDismissed] = useState(false)
  const {
    currentPhase,
    secondsRemaining,
    progress,
    isRunning,
    startTimer,
    pauseTimer,
    resetTimer,
  } = useBreathingTimer({
    // Progress is normalized against the selected session duration.
    steps: technique.steps,
    totalDurationSeconds: technique.totalDurationSeconds,
  })

  useEffect(() => {
    if (progress < 100 || isRunning || completionHandledRef.current) {
      return
    }

    completionHandledRef.current = true
    onSessionComplete()
  }, [isRunning, onSessionComplete, progress])

  const handleReset = () => {
    completionHandledRef.current = false
    setCompletionDismissed(false)
    resetTimer()
  }

  const hasFinished = progress >= 100 && !isRunning
  const showCompletionModal = hasFinished && !completionDismissed

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[480px] flex-col items-center px-6 py-12">
      <button
        onClick={onBack}
        className="self-start rounded-full border border-[#DED9D1] px-3 py-1.5 text-xs font-medium text-[#6B7268]"
      >
        Back
      </button>

      <header className="mt-6 text-center">
        <img src="/flower-logo.svg" alt="Bloom Breath logo" className="mx-auto mb-2 h-12 w-12" />
        <h1 className="text-3xl font-medium tracking-[0.02em] text-[#3A3A3A]">Breathe and Bloom</h1>
        <p className="mt-2 text-sm text-[#6F7568]">Watch your flower bloom with every breath</p>
        <p className="mt-1 text-xs font-medium tracking-[0.15em] text-[#8C9087] uppercase">{technique.name}</p>
      </header>

      <section className="mt-8 flex w-full flex-col items-center rounded-3xl bg-[#FDFBF7]/65 p-6 shadow-[0_14px_44px_rgba(131,140,127,0.14)]">
        <BreathingCircle currentPhase={currentPhase}>
          <BloomingFlower progress={progress} size={182} variant={bloomVariant} />
        </BreathingCircle>

        <TimerDisplay
          currentPhase={currentPhase}
          secondsRemaining={secondsRemaining}
          progress={progress}
        />
      </section>

      <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-[#E7E2D8]">
        <div
          className="h-full rounded-full bg-[#A9BCA2] transition-[width] duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

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

      <CompletionModal
        isOpen={showCompletionModal}
        bloomVariant={bloomVariant}
        onClose={() => {
          setCompletionDismissed(true)
          onBack()
        }}
      />
    </main>
  )
}
