import { useMemo, useState } from 'react'
import { breathingTechniques, type BreathingTechnique } from './data/breathingTechniques'
import { createRandomBloomVariant, type BloomVariant } from './data/bloomVariants'
import type { GardenFlower } from './components/FlowerGarden'
import FloralBackground from './components/FloralBackground'
import PollenParticles from './components/PollenParticles'
import SkyGradient from './components/SkyGradient'
import Home from './pages/Home'
import TimerPage from './pages/TimerPage'

const TIMER_FLOWER_SIZE = 182

function createGardenFlower(variant: BloomVariant): GardenFlower {
  return {
    id: `garden-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    variant,
    x: 12 + Math.random() * 76,
    y: -6 + Math.random() * 16,
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
    setGardenFlowers((previous) => [...previous, createGardenFlower(activeBloomVariant)])
  }

  const handleStartTechnique = (technique: BreathingTechnique) => {
    setActiveBloomVariant(createRandomBloomVariant())
    setActiveTechnique(technique)
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F8F6F2]">
      <SkyGradient />
      <FloralBackground />
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
