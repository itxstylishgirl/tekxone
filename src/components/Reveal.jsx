import { motion } from 'framer-motion'

export default function Reveal({ children, className = '', delay = 0, duration = 0.65, as = 'div' }) {
  const Component = motion[as] || motion.div
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 22, skewY: 1.5 }}
      whileInView={{ opacity: 1, y: 0, skewY: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration, delay, ease: [0.2, 0.75, 0.25, 1] }}
    >
      {children}
    </Component>
  )
}
