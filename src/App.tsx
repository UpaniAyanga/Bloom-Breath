import { useMemo, useState } from 'react'
import { breathingTechniques, type BreathingTechnique } from './data/breathingTechniques'
import { createRandomBloomVariant, type BloomVariant } from './data/bloomVariants'
import type { GardenFlower } from './components/FlowerGarden'
import PollenParticles from './components/PollenParticles'
import SkyGradient from './components/SkyGradient'
import Home from './pages/Home'
import TimerPage from './pages/TimerPage'

const TIMER_FLOWER_SIZE = 182
const GARDEN_SLOTS = [
  { x: 16, y: 8 },
  { x: 50, y: 0 },
  { x: 84, y: 10 },
  { x: 30, y: 90 },
  { x: 70, y: 96 },
  { x: 16, y: 176 },
  { x: 50, y: 170 },
  { x: 84, y: 178 },
]

function createGardenFlower(
  variant: BloomVariant,
  existingCount: number,
): GardenFlower {
  const slot = GARDEN_SLOTS[existingCount % GARDEN_SLOTS.length]

  return {
    id: `garden-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    variant,
    x: slot.x,
    y: slot.y,
    size: TIMER_FLOWER_SIZE,
  }
}

export default function App() {
  const [activeTechnique, setActiveTechnique] = useState<BreathingTechnique | null>(null)
  const [activeBloomVariant, setActiveBloomVariant] = useState<BloomVariant | null>(null)
  const [customTechniques, setCustomTechniques] = useState<BreathingTechnique[]>([])
  const [gardenFlowers, setGardenFlowers] = useState<GardenFlower[]>([])

  const techniques = useMemo(
    () => [...breathingTechniques, ...customTechniques],
    [customTechniques],
  )

  const handleCreateCustomTechnique = (technique: BreathingTechnique) => {
    setCustomTechniques((previous) => [technique, ...previous])
  }

  const handleSessionComplete = () => {
    if (!activeBloomVariant) return
    setGardenFlowers((previous) => [
      ...previous,
      createGardenFlower(activeBloomVariant, previous.length),
    ])
  }

  const handleStartTechnique = (technique: BreathingTechnique) => {
    setActiveBloomVariant(createRandomBloomVariant())
    setActiveTechnique(technique)
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F8F6F2]">
      <SkyGradient />
      <PollenParticles />

      <div className="relative z-10">
        {activeTechnique && activeBloomVariant ? (
          <TimerPage
            technique={activeTechnique}
            bloomVariant={activeBloomVariant}
            onBack={() => {
              setActiveTechnique(null)
              setActiveBloomVariant(null)
            }}
            onSessionComplete={handleSessionComplete}
          />
        ) : (
          <Home
            techniques={techniques}
            gardenFlowers={gardenFlowers}
            onCreateCustomTechnique={handleCreateCustomTechnique}
            onStartTechnique={handleStartTechnique}
          />
        )}
      </div>
    </div>
  )
}
