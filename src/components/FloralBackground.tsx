import { motion, useReducedMotion } from 'framer-motion'

export default function FloralBackground() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      <motion.img
        src="/floral-cluster-a.svg"
        alt=""
        aria-hidden
        className="absolute -left-28 -top-16 h-[360px] w-[360px] opacity-60 md:h-[440px] md:w-[440px]"
        animate={shouldReduceMotion ? undefined : { y: [0, -5, 0] }}
        transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
      />

      <motion.img
        src="/floral-cluster-b.svg"
        alt=""
        aria-hidden
        className="absolute -right-28 -top-12 h-[350px] w-[350px] opacity-56 md:h-[420px] md:w-[420px]"
        animate={shouldReduceMotion ? undefined : { y: [0, -4, 0] }}
        transition={{ duration: 16, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut', delay: 0.6 }}
      />

      <motion.img
        src="/floral-cluster-b.svg"
        alt=""
        aria-hidden
        className="absolute -left-28 -bottom-16 h-[320px] w-[320px] rotate-[10deg] opacity-52 md:h-[390px] md:w-[390px]"
        animate={shouldReduceMotion ? undefined : { y: [0, 4, 0] }}
        transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut', delay: 0.9 }}
      />

      <motion.img
        src="/floral-cluster-a.svg"
        alt=""
        aria-hidden
        className="absolute -right-28 -bottom-16 h-[340px] w-[340px] scale-x-[-1] opacity-56 md:h-[420px] md:w-[420px]"
        animate={shouldReduceMotion ? undefined : { y: [0, 5, 0] }}
        transition={{ duration: 17, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut', delay: 0.3 }}
      />
    </div>
  )
}
