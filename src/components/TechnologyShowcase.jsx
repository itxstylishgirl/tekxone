import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import deviceShowcase from '../assets/device-showcase.svg'

const technologyCategories = [
  {
    label: 'Design, frontend and mobile',
    technologies: [
      { name: 'Figma', slug: 'figma' },
      { name: 'React', slug: 'react' },
      { name: 'Angular', slug: 'angular' },
      { name: 'Flutter', slug: 'flutter' },
      { name: 'Swift', slug: 'swift' },
      { name: 'Kotlin', slug: 'kotlin' },
      { name: 'iOS', slug: 'apple' },
      { name: 'Android', slug: 'android' },
    ],
  },
  {
    label: 'Backend and integrations',
    technologies: [
      { name: '.NET', slug: 'dotnet' },
      { name: 'Java', slug: 'openjdk' },
      { name: 'Python', slug: 'python' },
      { name: 'Node.js', slug: 'nodedotjs' },
      { name: 'REST API', slug: 'swagger' },
      { name: 'GraphQL', slug: 'graphql' },
    ],
  },
  {
    label: 'AI, data and analytics',
    technologies: [
      { name: 'TensorFlow', slug: 'tensorflow' },
      { name: 'PyTorch', slug: 'pytorch' },
      { name: 'Databricks', slug: 'databricks' },
      { name: 'Power BI', slug: 'powerbi' },
      { name: 'Azure Machine Learning', slug: 'microsoftazure' },
      { name: 'Google Vertex', slug: 'googlecloud' },
    ],
  },
  {
    label: 'Cloud and DevOps',
    technologies: [
      { name: 'AWS', slug: 'amazonwebservices' },
      { name: 'Azure', slug: 'microsoftazure' },
      { name: 'Google Cloud', slug: 'googlecloud' },
      { name: 'Docker', slug: 'docker' },
      { name: 'Kubernetes', slug: 'kubernetes' },
      { name: 'Terraform', slug: 'terraform' },
    ],
  },
]

export default function TechnologyShowcase() {
  const [activeTechnology, setActiveTechnology] = useState(0)
  const reduceMotion = useReducedMotion()
  const activeCategory = technologyCategories[activeTechnology]

  return (
    <section className="technology-showcase" aria-label="Technology expertise">
      <div className="page-shell">
        <div className="technology-heading">
          <div>
            <span className="eyebrow">Technology, thoughtfully applied</span>
            <h2>Made for every <span>screen.</span></h2>
          </div>
          <p>From the first sketch to a polished product, we create digital experiences that feel right on desktop, iOS, and Android.</p>
        </div>

        <div className="technology-layout">
          <figure className="technology-visual">
            <span className="technology-visual-glow" aria-hidden="true" />
            <motion.img
              className="technology-device-art"
              src={deviceShowcase}
              alt="A web experience displayed on a laptop and two smartphones"
              animate={reduceMotion ? undefined : { y: [0, -9, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.span
              className="technology-os-badge technology-ios-badge"
              animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              iOS
            </motion.span>
            <motion.span
              className="technology-os-badge technology-android-badge"
              animate={reduceMotion ? undefined : { y: [0, 5, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              Android
            </motion.span>
            <figcaption>One design system. Every device.</figcaption>
          </figure>

          <div className="technology-content">
            <div className="technology-tabs" role="tablist" aria-label="Technology categories">
              {technologyCategories.map((category, index) => (
                <button
                  key={category.label}
                  className={`technology-tab${activeTechnology === index ? ' active' : ''}`}
                  type="button"
                  role="tab"
                  aria-selected={activeTechnology === index}
                  aria-controls={`technology-panel-${index}`}
                  id={`technology-tab-${index}`}
                  onClick={() => setActiveTechnology(index)}
                >
                  {category.label}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeTechnology}
                className="technology-grid"
                id={`technology-panel-${activeTechnology}`}
                role="tabpanel"
                aria-labelledby={`technology-tab-${activeTechnology}`}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
              >
                {activeCategory.technologies.map((technology, index) => (
                  <motion.article
                    className="technology-card"
                    key={technology.name}
                    initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.28, delay: reduceMotion ? 0 : index * 0.035 }}
                  >
                    <div className="technology-logo">
                      <img
                        src={`https://cdn.simpleicons.org/${technology.slug}`}
                        alt=""
                        loading="lazy"
                        onError={(event) => {
                          event.currentTarget.style.display = 'none'
                          event.currentTarget.nextElementSibling?.removeAttribute('hidden')
                        }}
                      />
                      <span className="technology-logo-fallback" hidden>{technology.name.slice(0, 2).toUpperCase()}</span>
                    </div>
                    <h3>{technology.name}</h3>
                  </motion.article>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
