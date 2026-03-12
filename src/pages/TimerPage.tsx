import { useEffect, useMemo, useRef } from 'react'
import BreathingCircle from '../components/BreathingCircle'
import Flower, { type FlowerStage } from '../components/Flower'
import TimerDisplay from '../components/TimerDisplay'
import type { BreathingTechnique } from '../data/breathingTechniques'
import { useBreathingTimer } from '../hooks/useBreathingTimer'

interface TimerPageProps {
  technique: BreathingTechnique
  onBack: () => void
  onSessionComplete: () => void
}

const flowerColors = ['#AFC8A6', '#CAB8DE', '#E7BDCA', '#F2E3CD', '#B4D8CF']

function stageFromProgress(progress: number): FlowerStage {
  if (progress < 20) return 'seed'
  if (progress < 40) return 'sprout'
  if (progress < 60) return 'stem'
  if (progress < 80) return 'bud'
  return 'flower'
}

export default function TimerPage({
  technique,
  onBack,
  onSessionComplete,
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

  const orbitFlowers = useMemo(
    () =>
      Array.from({ length: 10 }, (_, index) => {
        const angle = (index / 10) * Math.PI * 2
        return {
          x: Math.cos(angle) * 148,
          y: Math.sin(angle) * 148,
          color: flowerColors[index % flowerColors.length],
          delay: index * 0.1,
        }
      }),
    [],
  )

  useEffect(() => {
    if (progress < 100 || isRunning || completionHandledRef.current) {
      return
    }

    completionHandledRef.current = true
    onSessionComplete()
    const timeout = setTimeout(() => onBack(), 1400)
    return () => clearTimeout(timeout)
  }, [isRunning, onBack, onSessionComplete, progress])

  const handleReset = () => {
    completionHandledRef.current = false
    resetTimer()
  }

  const hasFinished = progress >= 100 && !isRunning

  return (
    <main className="mx-auto min-h-screen w-full max-w-[480px] px-4 py-6">
      <button
        onClick={onBack}
        className="rounded-full border border-[#DED9D1] px-3 py-1.5 text-xs font-medium text-[#6B7268]"
      >
        Back
      </button>

      <header className="mt-4 text-center">
        <h1 className="text-xl font-semibold text-[#566458]">{technique.name}</h1>
        <p className="mt-1 text-xs text-[#8C9087]">{technique.description}</p>
      </header>

      <section className="relative mt-8 flex min-h-[420px] items-center justify-center overflow-hidden rounded-3xl bg-[#FDFBF7] shadow-[0_14px_44px_rgba(131,140,127,0.16)]">
        {orbitFlowers.map((flower, index) => {
          const localProgress = Math.max(0, Math.min(100, (progress - index * 7) * 1.5))
          const stage = stageFromProgress(localProgress)

          return (
            <div
              key={`${flower.x}-${flower.y}`}
              className="pointer-events-none absolute"
              style={{
                transform: `translate(${flower.x}px, ${flower.y}px)`,
              }}
            >
              <Flower stage={stage} color={flower.color} size={56} delay={flower.delay} />
            </div>
          )
        })}

        <BreathingCircle currentPhase={currentPhase}>
          <TimerDisplay
            currentPhase={currentPhase}
            secondsRemaining={secondsRemaining}
            progress={progress}
          />
        </BreathingCircle>
      </section>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#E7E2D8]">
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

      <div className="mt-4 flex items-center justify-center gap-2">
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
