import { lazy, Suspense, useRef } from 'react'
import { motion } from 'framer-motion'
import Reveal from '../components/Reveal'
import TypewriterHeading from '../components/TypewriterHeading'
import BackgroundVideo from '../components/BackgroundVideo'
import GlobalPresence from '../components/GlobalPresence'

const AboutScene = lazy(() => import('../canvas/AboutScene'))
const technologies = ['React', 'AI / ML', 'Node.js', 'Figma', 'Three.js', 'Cloud', 'Mobile', 'TypeScript']
const values = [
  ['Integrity', 'We do the right thing, always.'],
  ['Collaboration', 'Great things happen when we work together.'],
  ['Innovation', 'We challenge the status quo and build what’s next.'],
  ['Excellence', 'We are committed to quality in everything we do.'],
  ['Impact', 'We create technology that empowers people and transforms lives.'],
]

export default function About() {
  const orbit = useRef(null)
  function moveOrbit(event) {
    if (!orbit.current) return
    const bounds = orbit.current.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5
    orbit.current.style.transform = `perspective(700px) rotateX(${y * -9}deg) rotateY(${x * 11}deg)`
  }
  function resetOrbit() {
    if (orbit.current) orbit.current.style.transform = 'perspective(700px) rotateX(0) rotateY(0)'
  }
  return (
    <>
      <section className="page-hero page-shell">
        <Reveal duration={0.08}><span className="eyebrow">About tekxone</span><TypewriterHeading>Good technology<br />should <span className="gradient-text">move you forward.</span></TypewriterHeading><p>We’re an independent digital team bringing sharp thinking and thoughtful technology together to make ambitious ideas real.</p></Reveal>
        <Suspense fallback={<div className="page-scene about-scene scene-placeholder" aria-hidden="true" />}><AboutScene /></Suspense>
      </section>
      <section className="story-section story-video">
        <BackgroundVideo className="story-background-video" />
        <div className="page-shell story-grid"><Reveal><span className="eyebrow">Our point of view</span><h2>People first.<br /><span>Possibility always.</span></h2></Reveal><Reveal delay={0.12}><p className="story-copy">Tekxone started with a simple belief: technology is at its best when it helps people do something remarkable. We bring design, engineering, and strategy together to solve real problems — with a human touch and an eye on what’s next.</p><p className="story-copy">No off-the-shelf thinking. No needless complexity. Just curious minds, collaborative work, and digital experiences made to last.</p></Reveal></div>
      </section>
      <section className="page-shell mission-section">
        <Reveal><div className="section-heading"><div><span className="eyebrow">What guides us</span><h2>Clear intent. <span>Better outcomes.</span></h2></div></div></Reveal>
        <div className="mission-grid">
          <motion.article className="mission-card" whileHover={{ y: -7, rotateX: 2 }} transition={{ type: 'spring', stiffness: 190 }}><span className="mission-icon">✳</span><span className="eyebrow">Our mission</span><h3>Make the complex feel possible.</h3><p>We make useful, human-centered technology that helps good organizations do their best work.</p></motion.article>
          <motion.article className="mission-card mission-card-blue" whileHover={{ y: -7, rotateX: 2 }} transition={{ type: 'spring', stiffness: 190 }}><span className="mission-icon">↗</span><span className="eyebrow">Our vision</span><h3>A future built with intention.</h3><p>We imagine a world where innovation is accessible, responsible, and genuinely useful to everyone.</p></motion.article>
        </div>
      </section>
      <section className="values-section">
        <div className="page-shell">
          <div className="values-heading">
            <span className="eyebrow">What drives us</span>
            <h2>Our values.</h2>
          </div>
          <div className="values-grid">
            {values.map(([title, description]) => (
              <article className="value-card" key={title}>
                <span className="value-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="m6 12 4 4 8-8" /></svg>
                </span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <GlobalPresence />
      <section className="tech-section">
        <div className="page-shell tech-grid"><Reveal><span className="eyebrow">Our toolkit</span><h2>The right tools<br /><span>for the right reason.</span></h2><p>Technology evolves fast. We stay curious, choose carefully, and make the stack serve the idea.</p></Reveal><div ref={orbit} className="tech-orbit" onPointerMove={moveOrbit} onPointerLeave={resetOrbit} aria-label="Interactive technology stack orbit">{technologies.map((technology, index) => <motion.span key={technology} className={`tech-pill tech-${index}`} animate={{ y: [0, -7, 0] }} transition={{ duration: 3 + index * 0.25, repeat: Infinity, delay: index * 0.12 }}>{technology}</motion.span>)}<div className="tech-center">tek<span>x</span>one</div></div></div>
      </section>
    </>
  )
}
