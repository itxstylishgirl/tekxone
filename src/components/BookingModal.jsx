import { useEffect, useState } from 'react'
import { createWhatsAppUrl } from '../lib/whatsapp'

export default function BookingModal({ service, onClose }) {
  const [status, setStatus] = useState('')
  const [whatsappUrl, setWhatsappUrl] = useState('')
  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event) => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = previous; window.removeEventListener('keydown', onKey) }
  }, [onClose])

  function submit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const values = Object.fromEntries(new FormData(form).entries())
    const message = [
      'Hi tekxone, I’d like to book a service.',
      '',
      `Service: ${service.title}`,
      `Category: ${service.category}`,
      `Name: ${values.clientName}`,
      `Email: ${values.email}`,
      values.phone && `Phone / WhatsApp: ${values.phone}`,
      values.company && `Company: ${values.company}`,
      values.budget && `Estimated budget: ${values.budget}`,
      `Project: ${values.description}`,
    ].filter(Boolean).join('\n')
    const url = createWhatsAppUrl(message)
    if (!url) {
      setWhatsappUrl('')
      setStatus('WhatsApp orders are not configured yet. Set VITE_WHATSAPP_NUMBER in .env to enable them.')
      return
    }
    setWhatsappUrl(url)
    setStatus('Your order details are ready. WhatsApp should open in a new tab; if it does not, use the link below.')
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title">
        <button className="modal-close" type="button" onClick={onClose} aria-label="Close dialog">×</button>
        <span className="eyebrow">Let’s make it happen</span>
        <h2 id="booking-title">Book a service</h2>
        <p className="modal-intro">Tell us a little about your project and we’ll take it from here.</p>
        <form className="form-grid" onSubmit={submit}>
          <label>Full name<input name="clientName" autoComplete="name" required maxLength="120" /></label>
          <label>Email address<input name="email" type="email" autoComplete="email" required maxLength="254" /></label>
          <label>Phone / WhatsApp<input name="phone" type="tel" autoComplete="tel" maxLength="40" /></label>
          <label>Company name<input name="company" autoComplete="organization" maxLength="120" /></label>
          <label>Selected service<input value={`${service.title} · ${service.category}`} readOnly /></label>
          <label>Estimated budget<select name="budget" defaultValue=""><option value="" disabled>Select a range</option><option>Under $2,500</option><option>$2,500–$10,000</option><option>$10,000–$25,000</option><option>$25,000+</option><option>Let’s discuss</option></select></label>
          <label className="field-full">Project description<textarea name="description" rows="4" required minLength="10" maxLength="3000" placeholder="What are you looking to build?" /></label>
          {status && <div className="form-message field-full" role="status"><p>{status}</p>{whatsappUrl && <a className="whatsapp-fallback" href={whatsappUrl} target="_blank" rel="noreferrer">Open WhatsApp ↗</a>}</div>}
          <button className="button button-primary field-full" type="submit">Continue to WhatsApp <span>↗</span></button>
        </form>
      </section>
    </div>
  )
}
