import { motion } from 'framer-motion';
import type { PropsWithChildren } from 'react';

type AnimatedSectionProps = PropsWithChildren<{
  className?: string;
  id?: string;
  surface?: 'page' | 'white';
}>;

export function AnimatedSection({ children, className = '', id, surface = 'page' }: AnimatedSectionProps) {
  const sectionClass = surface === 'white' ? `bg-white ${className}` : className;

  return (
    <motion.section
      id={id}
      className={sectionClass}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}
