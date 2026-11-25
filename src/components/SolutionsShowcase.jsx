import { motion, useReducedMotion } from 'framer-motion'

const solutions = [
  ['AI Automation Tools', 'Reduce repetitive work by connecting everyday tools and automating the workflows your team depends on.'],
  ['Healthcare Technology', 'Create smoother healthcare experiences with connected, thoughtful tools for patients and care teams.'],
  ['Conversational AI', 'Build helpful assistants for customer questions, service teams, and searchable company knowledge.'],
  ['Education Platforms', 'Bring courses, learner progress, and useful insights together in one flexible learning experience.'],
  ['Influencer Marketing', 'Organize creator partnerships, campaign planning, and performance in one clear workspace.'],
  ['Legal Technology', 'Make document-heavy work easier with practical tools for legal teams and their clients.'],
  ['Productivity & Wellbeing', 'Help people build better routines, protect focus, and make sustainable progress at work.'],
  ['Recruitment & HR', 'Connect hiring and people operations with a smoother experience from application to onboarding.'],
]

export default function SolutionsShowcase() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="solutions-section" aria-labelledby="solutions-heading">
      <div className="page-shell">
        <motion.header
          className="solutions-heading"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div>
            <span className="eyebrow">What we can build</span>
            <h2 id="solutions-heading">Technology for <span>real-world needs.</span></h2>
          </div>
          <p>Explore a few ways thoughtful software and AI can make work and everyday experiences better.</p>
        </motion.header>

        <div className="solutions-list">
          {solutions.map(([title, description], index) => (
            <motion.article
              className="solution-row"
              key={title}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.42, delay: reduceMotion ? 0 : (index % 4) * 0.055, ease: 'easeOut' }}
            >
              <span className="solution-number">{String(index + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{description}</p>
              <span className="solution-arrow" aria-hidden="true">→</span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
