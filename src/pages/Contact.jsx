import { lazy, Suspense, useState } from 'react'
import { createWhatsAppUrl } from '../lib/whatsapp'
import Reveal from '../components/Reveal'
import TypewriterHeading from '../components/TypewriterHeading'

const ContactScene = lazy(() => import('../canvas/ContactScene'))

export default function Contact() {
  const [status, setStatus] = useState('')
  const [whatsappUrl, setWhatsappUrl] = useState('')

  function submit(event) {
    event.preventDefault()
    const values = Object.fromEntries(new FormData(event.currentTarget).entries())
    const message = [
      'Hi tekxone, I have a project enquiry.',
      '',
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Topic: ${values.topic}`,
      `Message: ${values.message}`,
    ].join('\n')
    const url = createWhatsAppUrl(message)
    if (!url) {
      setWhatsappUrl('')
      setStatus('WhatsApp contact is not configured yet. Set VITE_WHATSAPP_NUMBER in .env to enable it.')
      return
    }
    setWhatsappUrl(url)
    setStatus('Your message is ready. WhatsApp should open in a new tab; if it does not, use the link below.')
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      <section className="page-hero page-shell contact-hero">
        <Reveal duration={0.08}><span className="eyebrow">Let’s talk</span><TypewriterHeading>Tell us what’s<br /><span className="gradient-text">on your mind.</span></TypewriterHeading><p>Big plans, small questions, early ideas — we’d love to hear what you’re thinking.</p></Reveal>
        <Suspense fallback={<div className="page-scene contact-hero-scene scene-placeholder" aria-hidden="true" />}><ContactScene /></Suspense>
      </section>
      <section className="contact-section page-shell">
        <div className="contact-details"><Reveal><span className="eyebrow">Get in touch</span><h2>A good conversation<br />can change everything.</h2><p>Share a little about what you need. We’ll get back to you as soon as we can.</p><a className="contact-email" href="mailto:hello@tekxone.com">hello@tekxone.com <span>↗</span></a><div className="contact-map"><div className="contact-map-heading"><div><span className="eyebrow">Find us</span><strong>Lahore, Pakistan</strong></div><a href="https://www.openstreetmap.org/?mlat=31.5204&mlon=74.3587#map=13/31.5204/74.3587" target="_blank" rel="noreferrer">Open map ↗</a></div><iframe title="Map showing Lahore, Pakistan" src="https://www.openstreetmap.org/export/embed.html?bbox=74.284%2C31.49%2C74.435%2C31.565&layer=mapnik&marker=31.5204%2C74.3587" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div></Reveal></div>
        <Reveal delay={0.1}><form className="contact-form" onSubmit={submit}><label>Your name<input name="name" autoComplete="name" required maxLength="120" /></label><label>Email address<input name="email" type="email" autoComplete="email" required maxLength="254" /></label><label>What can we help with?<select name="topic" defaultValue="" required><option value="" disabled>Choose a topic</option><option>Web development</option><option>Software & AI</option><option>Mobile apps</option><option>Digital marketing</option><option>UI/UX design</option><option>Medical billing</option><option>Something else</option></select></label><label>Your message<textarea name="message" rows="5" required minLength="10" maxLength="3000" placeholder="A few details about what you have in mind..." /></label>{status && <div className="form-message" role="status"><p>{status}</p>{whatsappUrl && <a className="whatsapp-fallback" href={whatsappUrl} target="_blank" rel="noreferrer">Open WhatsApp ↗</a>}</div>}<button className="button button-primary" type="submit">Continue to WhatsApp <span>↗</span></button></form></Reveal>
      </section>
    </>
  )
}
