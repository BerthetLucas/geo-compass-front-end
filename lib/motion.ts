export const EASE_OUT = [0.16, 1, 0.3, 1] as const
export const EASE_SNAPPY = [0.25, 0.46, 0.45, 0.94] as const
export const EASE_IN = [0.4, 0, 1, 1] as const

export const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: EASE_SNAPPY },
  },
}

export const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

export const tabFade = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.15, ease: EASE_SNAPPY } },
  exit: { opacity: 0, transition: { duration: 0.1, ease: EASE_IN } },
}

export const cardHoverSpring = {
  type: "spring" as const,
  stiffness: 300,
  damping: 20,
}
