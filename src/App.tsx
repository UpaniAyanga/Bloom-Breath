import { useMemo, useState } from 'react'
import { breathingTechniques, type BreathingTechnique } from './data/breathingTechniques'
import type { GardenFlower } from './components/FlowerGarden'
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

  const techniques = useMemo(
    () => [...breathingTechniques, ...customTechniques],
    [customTechniques],
  )

  const handleCreateCustomTechnique = (technique: BreathingTechnique) => {
    setCustomTechniques((previous) => [technique, ...previous])
  }

  const handleSessionComplete = () => {
    setGardenFlowers((previous) => [...previous, createGardenFlower()])
  }

  if (activeTechnique) {
    return (
      <TimerPage
        technique={activeTechnique}
        onBack={() => setActiveTechnique(null)}
        onSessionComplete={handleSessionComplete}
      />
    )
  }

  return (
    <Home
      techniques={techniques}
      gardenFlowers={gardenFlowers}
      onCreateCustomTechnique={handleCreateCustomTechnique}
      onStartTechnique={setActiveTechnique}
    />
  )
}
