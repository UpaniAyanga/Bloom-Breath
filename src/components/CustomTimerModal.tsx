import { useState } from 'react'
import type { BreathingTechnique, BreathingStep } from '../data/breathingTechniques'

interface CustomTimerModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (technique: BreathingTechnique) => void
}

const initialValues = {
  inhale: '4',
  hold: '4',
  exhale: '4',
  duration: '4',
}

export default function CustomTimerModal({
  isOpen,
  onClose,
  onSave,
}: CustomTimerModalProps) {
  const [values, setValues] = useState(initialValues)

  if (!isOpen) {
    return null
  }

  const updateValue = (key: keyof typeof values, value: string) => {
    setValues((previous) => ({ ...previous, [key]: value }))
  }

  const handleSave = () => {
    const inhale = Math.max(1, Number(values.inhale) || 1)
    const hold = Math.max(0, Number(values.hold) || 0)
    const exhale = Math.max(1, Number(values.exhale) || 1)
    const durationMinutes = Math.max(1, Number(values.duration) || 1)

    const steps: BreathingStep[] = [
      { phase: 'inhale', seconds: inhale },
      ...(hold > 0 ? [{ phase: 'hold' as const, seconds: hold }] : []),
      { phase: 'exhale', seconds: exhale },
    ]

    const technique: BreathingTechnique = {
      id: `custom-${Date.now()}`,
      name: `Custom ${inhale}-${hold}-${exhale}`,
      steps,
      totalDurationSeconds: durationMinutes * 60,
      description: `Inhale ${inhale} • ${hold > 0 ? `Hold ${hold} • ` : ''}Exhale ${exhale}`,
      isCustom: true,
    }

    onSave(technique)
    setValues(initialValues)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-[#352D2A]/25 px-4">
      <div className="w-full max-w-sm rounded-3xl bg-[#FDFBF7] p-5 shadow-[0_16px_50px_rgba(83,93,80,0.2)]">
        <h3 className="text-base font-semibold text-[#566458]">Create custom timer</h3>
        <p className="mt-1 text-xs text-[#8A8A87]">Set your cycle and total session length.</p>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <label className="text-xs text-[#70756E]">
            Inhale (s)
            <input
              type="number"
              min={1}
              value={values.inhale}
              onChange={(event) => updateValue('inhale', event.target.value)}
              className="mt-1 w-full rounded-xl border border-[#E0DDD5] bg-white px-3 py-2 text-sm text-[#4E554E] outline-none focus:border-[#A9BCA2]"
            />
          </label>

          <label className="text-xs text-[#70756E]">
            Hold (s)
            <input
              type="number"
              min={0}
              value={values.hold}
              onChange={(event) => updateValue('hold', event.target.value)}
              className="mt-1 w-full rounded-xl border border-[#E0DDD5] bg-white px-3 py-2 text-sm text-[#4E554E] outline-none focus:border-[#A9BCA2]"
            />
          </label>

          <label className="text-xs text-[#70756E]">
            Exhale (s)
            <input
              type="number"
              min={1}
              value={values.exhale}
              onChange={(event) => updateValue('exhale', event.target.value)}
              className="mt-1 w-full rounded-xl border border-[#E0DDD5] bg-white px-3 py-2 text-sm text-[#4E554E] outline-none focus:border-[#A9BCA2]"
            />
          </label>

          <label className="text-xs text-[#70756E]">
            Duration (min)
            <input
              type="number"
              min={1}
              value={values.duration}
              onChange={(event) => updateValue('duration', event.target.value)}
              className="mt-1 w-full rounded-xl border border-[#E0DDD5] bg-white px-3 py-2 text-sm text-[#4E554E] outline-none focus:border-[#A9BCA2]"
            />
          </label>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-full border border-[#DDD7CE] px-4 py-2 text-xs font-medium text-[#72776F]"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="rounded-full bg-[#A9BCA2] px-4 py-2 text-xs font-medium text-white"
          >
            Save timer
          </button>
        </div>
      </div>
    </div>
  )
}
