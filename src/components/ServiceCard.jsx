import { useRef } from 'react'
import { motion } from 'framer-motion'

export default function ServiceCard({ service, index, onBook }) {
  const card = useRef(null)
  const move = (event) => {
    if (!card.current) return
    const rect = card.current.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    card.current.style.setProperty('--pointer-x', `${x}px`)
    card.current.style.setProperty('--pointer-y', `${y}px`)
    card.current.style.setProperty('--tilt-x', `${((y / rect.height) - 0.5) * -5}deg`)
    card.current.style.setProperty('--tilt-y', `${((x / rect.width) - 0.5) * 5}deg`)
  }
  const reset = () => {
    if (!card.current) return
    card.current.style.setProperty('--tilt-x', '0deg')
    card.current.style.setProperty('--tilt-y', '0deg')
  }
  return (
    <motion.article
      id={service._id}
      ref={card}
      className="service-card tilt-card"
      onMouseMove={move}
      onMouseLeave={reset}
      initial={{ opacity: 0, y: 38, scale: 0.96, filter: 'blur(7px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ delay: (index % 3) * 0.11, duration: 0.68, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="service-card-top"><span className="service-number">{String(index + 1).padStart(2, '0')}</span><span className="service-arrow">↗</span></div>
      <span className="category-badge">{service.category}</span>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
      {!!service.features?.length && <ul className="feature-list">{service.features.slice(0, 3).map((feature) => <li key={feature}>{feature}</li>)}</ul>}
      <div className="service-meta"><span>{service.timeline || service.price || 'Tailored to you'}</span><button className="text-button" type="button" onClick={() => onBook(service)}>Book service <span>↗</span></button></div>
    </motion.article>
  )
}
