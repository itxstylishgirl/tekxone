import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import figmaIcon from 'simple-icons/icons/figma.svg'
import reactIcon from 'simple-icons/icons/react.svg'
import angularIcon from 'simple-icons/icons/angular.svg'
import flutterIcon from 'simple-icons/icons/flutter.svg'
import swiftIcon from 'simple-icons/icons/swift.svg'
import kotlinIcon from 'simple-icons/icons/kotlin.svg'
import appleIcon from 'simple-icons/icons/apple.svg'
import androidIcon from 'simple-icons/icons/android.svg'
import dotnetIcon from 'simple-icons/icons/dotnet.svg'
import openJdkIcon from 'simple-icons/icons/openjdk.svg'
import pythonIcon from 'simple-icons/icons/python.svg'
import nodeIcon from 'simple-icons/icons/nodedotjs.svg'
import swaggerIcon from 'simple-icons/icons/swagger.svg'
import graphqlIcon from 'simple-icons/icons/graphql.svg'
import tensorflowIcon from 'simple-icons/icons/tensorflow.svg'
import pytorchIcon from 'simple-icons/icons/pytorch.svg'
import databricksIcon from 'simple-icons/icons/databricks.svg'
import powerBiIcon from '../assets/power-bi.svg'
import azureIcon from '../assets/azure.svg'
import googleCloudIcon from 'simple-icons/icons/googlecloud.svg'
import awsIcon from '../assets/aws.svg'
import dockerIcon from 'simple-icons/icons/docker.svg'
import kubernetesIcon from 'simple-icons/icons/kubernetes.svg'
import terraformIcon from 'simple-icons/icons/terraform.svg'
import deviceShowcase from '../assets/device-showcase.svg'

const technologyCategories = [
  {
    label: 'Design, frontend and mobile',
    technologies: [
      { name: 'Figma', icon: figmaIcon },
      { name: 'React', icon: reactIcon },
      { name: 'Angular', icon: angularIcon },
      { name: 'Flutter', icon: flutterIcon },
      { name: 'Swift', icon: swiftIcon },
      { name: 'Kotlin', icon: kotlinIcon },
      { name: 'iOS', icon: appleIcon },
      { name: 'Android', icon: androidIcon },
    ],
  },
  {
    label: 'Backend and integrations',
    technologies: [
      { name: '.NET', icon: dotnetIcon },
      { name: 'Java', icon: openJdkIcon },
      { name: 'Python', icon: pythonIcon },
      { name: 'Node.js', icon: nodeIcon },
      { name: 'REST API', icon: swaggerIcon },
      { name: 'GraphQL', icon: graphqlIcon },
    ],
  },
  {
    label: 'AI, data and analytics',
    technologies: [
      { name: 'TensorFlow', icon: tensorflowIcon },
      { name: 'PyTorch', icon: pytorchIcon },
      { name: 'Databricks', icon: databricksIcon },
      { name: 'Power BI', icon: powerBiIcon, customIcon: true },
      { name: 'Azure Machine Learning', icon: azureIcon, customIcon: true },
      { name: 'Google Vertex', icon: googleCloudIcon },
    ],
  },
  {
    label: 'Cloud and DevOps',
    technologies: [
      { name: 'AWS', icon: awsIcon, customIcon: true, invertLight: true },
      { name: 'Azure', icon: azureIcon, customIcon: true },
      { name: 'Google Cloud', icon: googleCloudIcon },
      { name: 'Docker', icon: dockerIcon },
      { name: 'Kubernetes', icon: kubernetesIcon },
      { name: 'Terraform', icon: terraformIcon },
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
                        className={`technology-logo-image${technology.customIcon ? '' : ' technology-logo-simple'}${technology.invertLight ? ' technology-logo-invert-light' : ''}`}
                        src={technology.icon}
                        alt=""
                        loading="lazy"
                      />
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
