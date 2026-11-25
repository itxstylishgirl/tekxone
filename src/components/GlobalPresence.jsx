import { motion, useReducedMotion } from 'framer-motion'

const locations = [
  ['Pakistan', 'HQ · Lahore'],
  ['Saudi Arabia', 'Region'],
  ['UAE', 'Region'],
  ['United Kingdom', 'Region'],
  ['United States', 'Region'],
]

export default function GlobalPresence() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="global-presence-section">
      <div className="page-shell">
        <motion.div
          className="global-presence-heading"
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <span className="eyebrow">Global presence</span>
          <h2>Serving organizations<br />across the world.</h2>
        </motion.div>
        <div className="global-presence-grid">
          {locations.map(([country, detail], index) => (
            <motion.article
              className="presence-card"
              key={country}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={reduceMotion ? undefined : { y: -6 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: reduceMotion ? 0 : index * 0.08, ease: 'easeOut' }}
            >
              <span className="presence-dot" aria-hidden="true" />
              <h3>{country}</h3>
              <p>{detail}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
