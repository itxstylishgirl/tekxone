import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useServices } from '../lib/ServicesContext'
import Reveal from '../components/Reveal'
import ServiceCard from '../components/ServiceCard'
import BackgroundVideo from '../components/BackgroundVideo'
import TypewriterHeading from '../components/TypewriterHeading'

const NeuralScene = lazy(() => import('../components/NeuralScene'))
const headlines = ['AI-Driven Web Solutions', 'Next-Gen Software', 'Intelligent Automation']

export default function Home() {
  const [headlineIndex, setHeadlineIndex] = useState(0)
  const statsRef = useRef(null)
  const { services, openBooking } = useServices()

  useEffect(() => {
    const timer = window.setInterval(() => setHeadlineIndex((current) => (current + 1) % headlines.length), 3600)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const target = statsRef.current
    if (!target) return undefined

    let cancelled = false
    let context
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()

      Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([gsapModule, scrollTriggerModule]) => {
        if (cancelled) return
        const gsap = gsapModule.gsap
        gsap.registerPlugin(scrollTriggerModule.ScrollTrigger)
        context = gsap.context(() => {
          gsap.fromTo('.stat-value', { innerText: 0 }, {
            innerText: (index, element) => Number(element.dataset.value),
            duration: 1.8,
            snap: { innerText: 1 },
            ease: 'power2.out',
            scrollTrigger: { trigger: target, start: 'top 82%', once: true },
          })
        }, target)
      }).catch((error) => {
        console.error('Failed to load the stats animation.', error)
      })
    }, { rootMargin: '100px 0px' })

    observer.observe(target)
    return () => {
      cancelled = true
      observer.disconnect()
      context?.revert()
    }
  }, [])

  return (
    <>
      <section className="hero page-shell">
        <div className="hero-copy">
          <span className="eyebrow"><span className="status-dot" /> Digital ideas, made real</span>
          <TypewriterHeading aria-label="Build what’s next. Better.">
            Build what’s
            <br />
            <span className="gradient-text">next. Better.</span>
          </TypewriterHeading>
          <div className="rotating-headline" aria-live="polite">
            <span className="headline-label">We create</span>
            <AnimatePresence mode="wait">
              <motion.span key={headlineIndex} className="headline-rotator" initial={{ opacity: 0, y: 22, rotateX: -45 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} exit={{ opacity: 0, y: -18, rotateX: 38 }} transition={{ duration: 0.42 }}>
                {headlines[headlineIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
          <p>We bring AI, web, and mobile together to help ambitious businesses make their next big move.</p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/services">Explore our services <span>↗</span></Link>
            <Link className="text-link" to="/about">Meet tekxone <span>→</span></Link>
          </div>
          <div className="hero-note"><span className="note-line" /> Strategy, creativity &amp; technology — all in one team.</div>
        </div>
        <div className="hero-visual">
          <div className="visual-glow" />
          <Suspense fallback={<div className="neural-placeholder" />}>
            <NeuralScene />
          </Suspense>
          <div className="floating-chip chip-top"><span className="chip-pulse" /> AI that works for you</div>
          <div className="floating-chip chip-bottom"><span>↗</span> Ideas into impact</div>
          <div className="visual-caption">NEURAL SYSTEMS · 01</div>
        </div>
        <a className="scroll-cue" href="#expertise"><span /> Scroll to explore</a>
      </section>

      <section className="services-section" id="expertise">
        <div className="page-shell">
          <div className="section-heading">
            <Reveal><span className="eyebrow">Our expertise</span><h2>One team. <span>More possibilities.</span></h2></Reveal>
            {/* <Reveal delay={0.1}><p>From the first idea to the final launch, we make technology work for you.</p></Reveal> */}
          </div>
          <div className="service-cards home-services">
            {services.slice(0, 3).map((service, index) => <ServiceCard key={service._id} service={service} index={index} onBook={openBooking} />)}
          </div>
          {/* <div className="section-link-row"><span>From first spark to full scale.</span><Link className="text-link" to="/services">View all services <span>→</span></Link></div> */}
        </div>
      </section>

      <section className="process-section page-shell">
        <Reveal><div className="section-heading"><div><span className="eyebrow">How we work</span><h2>Big ideas. <span>Clear next steps.</span></h2></div></div></Reveal>
        <div className="process-grid">
          {[['01', 'Discover', 'We get to know your goals, users, and the opportunity in front of you.'], ['02', 'Design', 'We turn the best ideas into a focused plan and a tangible first look.'], ['03', 'Build', 'We create, test, and refine with you — every step of the way.'], ['04', 'Grow', 'We launch with care, learn from real use, and keep making it better.']].map(([number, title, copy], index) => (
            <motion.div
              key={title}
              className="process-card-reveal"
              initial={{ opacity: 0, y: 38, scale: 0.96, filter: 'blur(7px)' }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              whileHover={{ y: -7, scale: 1.015 }}
              viewport={{ once: true, amount: 0.16 }}
              transition={{ delay: (index % 3) * 0.11, duration: 0.68, ease: [0.16, 1, 0.3, 1] }}
            >
              <article
                className="process-step"
                onMouseMove={(event) => {
                  const rect = event.currentTarget.getBoundingClientRect()
                  const x = event.clientX - rect.left
                  const y = event.clientY - rect.top
                  event.currentTarget.style.setProperty('--pointer-x', `${x}px`)
                  event.currentTarget.style.setProperty('--pointer-y', `${y}px`)
                  event.currentTarget.style.setProperty('--tilt-x', `${((y / rect.height) - 0.5) * -5}deg`)
                  event.currentTarget.style.setProperty('--tilt-y', `${((x / rect.width) - 0.5) * 5}deg`)
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.setProperty('--tilt-x', '0deg')
                  event.currentTarget.style.setProperty('--tilt-y', '0deg')
                }}
              >
                <span className="process-number">{number}</span><div className="process-connector" /><h3>{title}</h3><p>{copy}</p>
              </article>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="stats-band" ref={statsRef}>
        <div className="page-shell stats-grid">
          {[['40', 'Projects shipped'], ['6', 'Areas of expertise'], ['100', 'Percent committed']].map(([value, label]) => <div className="stat-item" key={label}><strong><span className="stat-value" data-value={value}>0</span><span className="stat-suffix">{value === '100' ? '%' : '+'}</span></strong><span>{label}</span></div>)}
        </div>
      </section>

      <section className="cta-section">
        <BackgroundVideo className="cta-background-video" />
        <div className="cta-orb" />
        <Reveal><span className="eyebrow">Your next move starts here</span><h2>Let’s build something <span className="gradient-text">meaningful.</span></h2><p>Have an idea, a challenge, or just a question? We’re all ears.</p><Link className="button button-primary" to="/contact">Start a conversation <span>↗</span></Link></Reveal>
      </section>
    </>
  )
}
