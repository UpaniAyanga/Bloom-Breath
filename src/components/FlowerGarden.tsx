import Flower from './Flower'
import VinePath from './VinePath'

export interface GardenFlower {
  id: string
  color: string
  x: number
  y: number
  size: number
}

interface FlowerGardenProps {
  flowers: GardenFlower[]
  progress: number
}

export default function FlowerGarden({ flowers, progress }: FlowerGardenProps) {
  return (
    <section className="rounded-3xl border border-[#E9E4DB] bg-[#FDFBF7] p-4 shadow-[0_8px_30px_rgba(131,140,127,0.12)]">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-medium tracking-[0.12em] uppercase text-[#6B705C]">Your breathing garden</h2>
        <span className="text-xs tracking-[0.08em] text-[#8A8A87]">{flowers.length} blooms</span>
      </div>

      <div
        className="relative h-52 overflow-hidden rounded-2xl bg-[#F7F4EE]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(170,184,166,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(170,184,166,0.15) 1px, transparent 1px)',
          backgroundSize: '34px 34px',
        }}
      >
        <VinePath progress={progress} />

        {flowers.map((flower, index) => (
          <div
            key={flower.id}
            className="absolute z-[2]"
            style={{ left: `${flower.x}%`, top: `${flower.y}%` }}
          >
            <Flower
              stage="flower"
              color={flower.color}
              size={flower.size}
              float
              delay={index * 0.18}
            />
          </div>
        ))}

        {flowers.length === 0 && (
          <div className="relative z-[2] flex h-full items-center justify-center">
            <p className="text-sm text-[#8F9A89]">Complete a breathing session to plant your first flower.</p>
          </div>
        )}
      </div>
    </section>
  )
}
