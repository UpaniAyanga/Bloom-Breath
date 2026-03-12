import type { BreathingTechnique } from '../data/breathingTechniques'

interface TechniqueCardProps {
  technique: BreathingTechnique
  onStart: (technique: BreathingTechnique) => void
}

export default function TechniqueCard({ technique, onStart }: TechniqueCardProps) {
  const minutes = Math.round(technique.totalDurationSeconds / 60)

  return (
    <article className="rounded-2xl border border-[#E4E2DA] bg-[#FDFBF7] p-4 shadow-[0_6px_18px_rgba(131,140,127,0.12)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-[#566458]">{technique.name}</h3>
          <p className="mt-1 text-xs text-[#7E857B]">{technique.description}</p>
        </div>
        {technique.isCustom && (
          <span className="rounded-full bg-[#EFE8F4] px-2 py-1 text-[10px] font-medium text-[#7A6A89]">
            Custom
          </span>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <p className="text-xs text-[#9A9A95]">{minutes} min session</p>
        <button
          onClick={() => onStart(technique)}
          className="rounded-full bg-[#A9BCA2] px-3 py-1.5 text-xs font-medium text-white transition hover:bg-[#98AD91]"
        >
          Start
        </button>
      </div>
    </article>
  )
}
