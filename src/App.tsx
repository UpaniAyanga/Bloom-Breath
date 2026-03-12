import { useMemo, useState } from 'react'
import { breathingTechniques, type BreathingTechnique } from './data/breathingTechniques'
import type { GardenFlower } from './components/FlowerGarden'
import PollenParticles from './components/PollenParticles'
import SkyGradient from './components/SkyGradient'
import Home from './pages/Home'
import TimerPage from './pages/TimerPage'

const gardenColors = ['#AFC8A6', '#CAB8DE', '#E7BDCA', '#F2E3CD', '#B4D8CF']

function createGardenFlower(): GardenFlower {
  return {
    id: `garden-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    color: gardenColors[Math.floor(Math.random() * gardenColors.length)],
    x: 6 + Math.random() * 82,
    y: 8 + Math.random() * 76,
    size: 56 + Math.random() * 18,
  }
}

export default function App() {
  const [activeTechnique, setActiveTechnique] = useState<BreathingTechnique | null>(null)
  const [customTechniques, setCustomTechniques] = useState<BreathingTechnique[]>([])
  const [gardenFlowers, setGardenFlowers] = useState<GardenFlower[]>([])
  const [gardenProgress, setGardenProgress] = useState(0)

  const techniques = useMemo(
    () => [...breathingTechniques, ...customTechniques],
    [customTechniques],
  )

  const handleCreateCustomTechnique = (technique: BreathingTechnique) => {
    setCustomTechniques((previous) => [technique, ...previous])
  }

  const handleSessionComplete = () => {
    setGardenProgress(100)
    setGardenFlowers((previous) => [...previous, createGardenFlower()])
  }

  const handleStartTechnique = (technique: BreathingTechnique) => {
    setGardenProgress(0)
    setActiveTechnique(technique)
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F8F6F2]">
      <SkyGradient />
      <PollenParticles />

      <div className="relative z-10">
        {activeTechnique ? (
          <TimerPage
            technique={activeTechnique}
            onBack={() => setActiveTechnique(null)}
            onSessionComplete={handleSessionComplete}
            onProgressChange={setGardenProgress}
          />
        ) : (
          <Home
            techniques={techniques}
            gardenFlowers={gardenFlowers}
            gardenProgress={gardenProgress}
            onCreateCustomTechnique={handleCreateCustomTechnique}
            onStartTechnique={handleStartTechnique}
          />
        )}
      </div>
    </div>
  )
}
