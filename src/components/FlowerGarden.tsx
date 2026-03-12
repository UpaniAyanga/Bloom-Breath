import { motion, useReducedMotion } from 'framer-motion'
import type { BloomVariant } from '../data/bloomVariants'
import BloomingFlower from './BloomingFlower'

export interface GardenFlower {
  id: string
  variant: BloomVariant
  x: number
  y: number
  size: number
}

interface FlowerGardenProps {
  flowers: GardenFlower[]
}

export default function FlowerGarden({ flowers }: FlowerGardenProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="rounded-3xl border border-[#E9E4DB] bg-[#FDFBF7] p-4 shadow-[0_8px_30px_rgba(131,140,127,0.12)]">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-medium tracking-[0.12em] uppercase text-[#6B705C]">Your breathing garden</h2>
        <span className="text-xs tracking-[0.08em] text-[#8A8A87]">{flowers.length} blooms</span>
      </div>

      <div className="relative h-[340px] overflow-hidden rounded-2xl bg-[#F7F4EE]"
        style={{
          backgroundImage: 'linear-gradient(180deg, rgba(245,241,233,0.6), rgba(239,235,227,0.95))',
        }}
      >
        {flowers.map((flower, index) => (
          <motion.div
            key={flower.id}
            className="absolute z-[2] drop-shadow-[0_10px_12px_rgba(85,95,80,0.22)]"
            style={{ left: `${flower.x}%`, bottom: `${flower.y}px`, transform: 'translateX(-50%)' }}
            animate={shouldReduceMotion ? undefined : { y: [0, -3, 0] }}
            transition={{
              duration: 4.5 + index * 0.35,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'easeInOut',
              delay: index * 0.14,
            }}
          >
            <BloomingFlower progress={100} size={flower.size} variant={flower.variant} />
          </motion.div>
        ))}

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#DDE7D6]/65 to-transparent" />

        {flowers.length === 0 && (
          <div className="relative z-[2] flex h-full items-center justify-center">
            <p className="text-sm text-[#8F9A89]">Complete a breathing session to plant your first flower.</p>
          </div>
        )}
      </div>
    </section>
  )
}
