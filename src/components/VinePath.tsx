import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'

interface VinePathProps {
  progress: number
}

interface Point {
  x: number
  y: number
}

interface VineDefinition {
  id: string
  d: string
  p0: Point
  p1: Point
  p2: Point
  p3: Point
}

interface LeafSeed {
  id: string
  x: number
  y: number
  rotation: number
  size: number
  appearAt: number
}

const vines: VineDefinition[] = [
  {
    id: 'vine-a',
    d: 'M 4 80 C 24 55, 54 98, 92 64',
    p0: { x: 4, y: 80 },
    p1: { x: 24, y: 55 },
    p2: { x: 54, y: 98 },
    p3: { x: 92, y: 64 },
  },
  {
    id: 'vine-b',
    d: 'M 8 62 C 28 36, 56 86, 96 50',
    p0: { x: 8, y: 62 },
    p1: { x: 28, y: 36 },
    p2: { x: 56, y: 86 },
    p3: { x: 96, y: 50 },
  },
  {
    id: 'vine-c',
    d: 'M 2 92 C 18 70, 46 108, 88 74',
    p0: { x: 2, y: 92 },
    p1: { x: 18, y: 70 },
    p2: { x: 46, y: 108 },
    p3: { x: 88, y: 74 },
  },
]

function cubicPoint(t: number, p0: Point, p1: Point, p2: Point, p3: Point): Point {
  const mt = 1 - t
  const mt2 = mt * mt
  const t2 = t * t
  return {
    x: mt2 * mt * p0.x + 3 * mt2 * t * p1.x + 3 * mt * t2 * p2.x + t2 * t * p3.x,
    y: mt2 * mt * p0.y + 3 * mt2 * t * p1.y + 3 * mt * t2 * p2.y + t2 * t * p3.y,
  }
}

function cubicTangent(t: number, p0: Point, p1: Point, p2: Point, p3: Point): Point {
  const mt = 1 - t
  return {
    x:
      3 * mt * mt * (p1.x - p0.x) +
      6 * mt * t * (p2.x - p1.x) +
      3 * t * t * (p3.x - p2.x),
    y:
      3 * mt * mt * (p1.y - p0.y) +
      6 * mt * t * (p2.y - p1.y) +
      3 * t * t * (p3.y - p2.y),
  }
}

function createSeededRandom(seed: number) {
  let state = seed >>> 0
  return () => {
    state = (1664525 * state + 1013904223) >>> 0
    return state / 4294967296
  }
}

function randomInRange(random: () => number, min: number, max: number) {
  return random() * (max - min) + min
}

export default function VinePath({ progress }: VinePathProps) {
  const shouldReduceMotion = useReducedMotion()
  const pathRefs = useRef<Array<SVGPathElement | null>>([])
  const [pathLengths, setPathLengths] = useState<number[]>([])
  const normalizedProgress = Math.max(0, Math.min(100, progress))

  useEffect(() => {
    // Measure path lengths once to drive strokeDash animations efficiently.
    setPathLengths(pathRefs.current.map((path) => path?.getTotalLength() ?? 0))
  }, [])

  const leafSeeds = useMemo<LeafSeed[]>(() => {
    // Leaves are generated once and revealed progressively with garden growth.
    return vines.flatMap((vine, vineIndex) => {
      const random = createSeededRandom(7001 + vineIndex * 97)
      return Array.from({ length: 7 }, (_, leafIndex) => {
        const t = randomInRange(random, 0.14, 0.92)
        const point = cubicPoint(t, vine.p0, vine.p1, vine.p2, vine.p3)
        const tangent = cubicTangent(t, vine.p0, vine.p1, vine.p2, vine.p3)
        const baseAngle = (Math.atan2(tangent.y, tangent.x) * 180) / Math.PI
        const bend = random() > 0.5 ? 34 : -34

        return {
          id: `${vine.id}-leaf-${leafIndex}`,
          x: point.x + randomInRange(random, -1.6, 1.6),
          y: point.y + randomInRange(random, -1.2, 1.2),
          rotation: baseAngle + bend,
          size: randomInRange(random, 2.8, 4.8),
          appearAt: randomInRange(random, 8 + vineIndex * 6, 95),
        }
      })
    })
  }, [])

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
    >
      {vines.map((vine, index) => {
        const pathLength = pathLengths[index] || 240
        const strokeDashoffset = pathLength * (1 - normalizedProgress / 100)

        return (
          <motion.path
            key={vine.id}
            ref={(element) => {
              pathRefs.current[index] = element
            }}
            d={vine.d}
            fill="none"
            stroke="#6B705C"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: pathLength,
              strokeDashoffset,
            }}
            animate={{ strokeDashoffset }}
            transition={{ duration: shouldReduceMotion ? 0.2 : 1.1, ease: 'easeOut' }}
          />
        )
      })}

      {leafSeeds.map((leaf) => {
        const visible = normalizedProgress >= leaf.appearAt

        return (
          <motion.ellipse
            key={leaf.id}
            cx={leaf.x}
            cy={leaf.y}
            rx={leaf.size}
            ry={leaf.size * 0.48}
            fill="#A5A58D"
            transform={`rotate(${leaf.rotation} ${leaf.x} ${leaf.y})`}
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: visible ? 0.82 : 0, scale: visible ? 1 : 0.75 }}
            transition={{ duration: shouldReduceMotion ? 0.2 : 1, ease: 'easeOut' }}
          />
        )
      })}
    </svg>
  )
}
