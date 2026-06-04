export const EASE_OUT = [0.16, 1, 0.3, 1] as const
export const EASE_IN = [0.4, 0, 1, 1] as const

export const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE_OUT },
  },
}

export const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}
