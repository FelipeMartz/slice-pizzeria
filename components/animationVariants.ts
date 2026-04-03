import { Variants } from 'framer-motion'

// Variantes para animaciones de entrada
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.23, 1, 0.32, 1],
    },
  },
}

export const fadeInScale: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.23, 1, 0.32, 1],
    },
  },
}

// Variantes con stagger para listas
export const containerStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

export const itemStagger: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.23, 1, 0.32, 1],
    },
  },
}

// Efectos de hover 3D
export const cardHover3D = {
  scale: 1.02,
  rotateX: -5,
  rotateY: 5,
  transition: {
    type: 'spring',
    damping: 20,
    stiffness: 100,
  },
}

// Variantes para botones
export const buttonHover: Variants = {
  hover: {
    scale: 1.05,
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 400,
    },
  },
  tap: {
    scale: 0.95,
  },
}

// Animación de flotación continua
export const floatAnimation = {
  y: [0, -20, 0],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: 'easeInOut',
  },
}

// Animación de gradiente para backgrounds
export const gradientShift = {
  backgroundPosition: ['0% 0%', '100% 100%'],
  transition: {
    duration: 20,
    repeat: Infinity,
    repeatType: 'reverse' as const,
  },
}

// Variante de entrada con delay personalizado
export const createDelayedVariants = (delay: number = 0) => ({
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: delay + (i * 0.1),
      ease: [0.23, 1, 0.32, 1],
    },
  }),
})

// Variantes para transiciones de contenido (AnimatePresence)
export const pageTransition = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.4 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3 },
  },
}
