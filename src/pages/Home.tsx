import { useState } from 'react'
import CustomTimerModal from '../components/CustomTimerModal'
import FlowerGarden, { type GardenFlower } from '../components/FlowerGarden'
import TechniqueCard from '../components/TechniqueCard'
import type { BreathingTechnique } from '../data/breathingTechniques'

interface HomeProps {
  techniques: BreathingTechnique[]
  gardenFlowers: GardenFlower[]
  gardenProgress: number
  onStartTechnique: (technique: BreathingTechnique) => void
  onCreateCustomTechnique: (technique: BreathingTechnique) => void
}

export default function Home({
  techniques,
  gardenFlowers,
  gardenProgress,
  onStartTechnique,
  onCreateCustomTechnique,
}: HomeProps) {
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false)

  return (
    <main className="mx-auto min-h-screen w-full max-w-[480px] px-4 py-6">
      <header className="mb-5">
        <p className="text-xs tracking-[0.24em] text-[#8F9A89]">BLOOM BREATH</p>
        <h1 className="mt-1 text-2xl font-semibold text-[#566458]">Calm breathing pomodoro</h1>
        <p className="mt-1 text-sm text-[#7E857B]">
          Follow a technique, grow flowers around your timer, and collect blooms in your garden.
        </p>
      </header>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-medium text-[#566458]">Techniques</h2>
          <button
            onClick={() => setIsCustomModalOpen(true)}
            className="rounded-full bg-[#EFE8F4] px-3 py-1.5 text-xs font-medium text-[#7D6A8D]"
          >
            + Custom timer
          </button>
        </div>

        <div className="space-y-3">
          {techniques.map((technique) => (
            <TechniqueCard
              key={technique.id}
              technique={technique}
              onStart={onStartTechnique}
            />
          ))}
        </div>
      </section>

      <section className="mt-5">
        <FlowerGarden flowers={gardenFlowers} progress={gardenProgress} />
      </section>

      <CustomTimerModal
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
        onSave={onCreateCustomTechnique}
      />
    </main>
  )
}
