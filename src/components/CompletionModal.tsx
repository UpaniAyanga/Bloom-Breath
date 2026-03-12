import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import type { BloomVariant } from '../data/bloomVariants'
import BloomingFlower from './BloomingFlower'

interface CompletionModalProps {
  isOpen: boolean
  bloomVariant: BloomVariant
  onClose: () => void
}

export default function CompletionModal({
  isOpen,
  bloomVariant,
  onClose,
}: CompletionModalProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#302823]/20 px-6 backdrop-blur-[1px]"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0.1 : 0.25 }}
        >
          <motion.div
            className="w-full max-w-sm rounded-3xl border border-[#ECE6DC] bg-[#FFFDF9] p-6 text-center shadow-[0_20px_52px_rgba(84,92,80,0.2)]"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: shouldReduceMotion ? 0.12 : 0.35, ease: 'easeOut' }}
          >
            <p className="text-xs font-medium tracking-[0.22em] text-[#8A9382] uppercase">Completed</p>
            <h2 className="mt-2 text-2xl font-medium tracking-[0.01em] text-[#44503E]">
              Beautiful bloom
            </h2>
            <div className="my-2 flex justify-center">
              <BloomingFlower progress={100} size={144} variant={bloomVariant} />
            </div>
            <p className="mt-2 text-sm text-[#6D7366]">
              Your full flower has blossomed. You completed this breathing session beautifully.
            </p>

            <button
              onClick={onClose}
              className="mt-5 rounded-full bg-[#A8BE9A] px-5 py-2 text-sm font-medium text-white"
            >
              Back to garden
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
