'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

interface FadeUpProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function FadeUp({ children, delay = 0, className }: FadeUpProps) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: prefersReduced ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: prefersReduced ? 0.2 : 0.5,
        ease: [0.16, 1, 0.3, 1],
        delay,
      }}
      viewport={{ once: true, margin: '-80px' }}
    >
      {children}
    </motion.div>
  );
}
