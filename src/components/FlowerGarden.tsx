import Flower from './Flower'

export interface GardenFlower {
  id: string
  color: string
  x: number
  y: number
  size: number
}

interface FlowerGardenProps {
  flowers: GardenFlower[]
}

export default function FlowerGarden({ flowers }: FlowerGardenProps) {
  return (
    <section className="rounded-3xl border border-[#E9E4DB] bg-[#FDFBF7] p-4 shadow-[0_8px_30px_rgba(131,140,127,0.12)]">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-medium text-[#566458]">Your Garden</h2>
        <span className="text-xs text-[#8A8A87]">{flowers.length} blooms</span>
      </div>

      <div
        className="relative h-52 overflow-hidden rounded-2xl bg-[#F7F4EE]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(170,184,166,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(170,184,166,0.15) 1px, transparent 1px)',
          backgroundSize: '34px 34px',
        }}
      >
        {flowers.map((flower, index) => (
          <div
            key={flower.id}
            className="absolute"
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
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-[#8F9A89]">Complete a breathing session to plant your first flower.</p>
          </div>
        )}
      </div>
    </section>
  )
}
