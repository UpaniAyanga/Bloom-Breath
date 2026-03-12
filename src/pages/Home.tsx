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
    <main className="mx-auto min-h-screen w-full max-w-[480px] px-6 py-12">
      <header className="mb-8 text-center">
        <p className="text-xs font-medium tracking-[0.24em] text-[#8F9A89]">BLOOM BREATH</p>
        <h1 className="mt-2 text-3xl font-medium tracking-[0.02em] text-[#3A3A3A]">Breathe and Bloom</h1>
        <p className="mt-2 text-sm text-[#6F7568]">
          Grow calm with every breath and collect each bloom in your peaceful garden.
        </p>
      </header>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium tracking-[0.12em] uppercase text-[#6B705C]">Techniques</h2>
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
