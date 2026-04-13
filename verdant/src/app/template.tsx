'use client'

import { useReducedMotion } from 'framer-motion'
import { MotionDiv } from '@/components/ui/MotionDiv'
import { ease } from '@/constants/animation'

const pageTransition = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: ease.out } },
}

export default function Template({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) return <>{children}</>

  return (
    <MotionDiv
      variants={pageTransition}
      initial="hidden"
      animate="visible"
    >
      {children}
    </MotionDiv>
  )
}
