import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { createWhatsAppUrl } from '../lib/whatsapp'
import { useServices } from '../lib/ServicesContext'
import { categories } from '../lib/services'
import Brand from './Brand'

const currentYear = new Date().getFullYear()

function Header({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const { pathname } = useLocation()
  const { services } = useServices()
  const close = () => {
    setOpen(false)
    setServicesOpen(false)
  }
  return (
    <header className="site-header">
      <nav className="navbar page-shell" aria-label="Main navigation">
        <Brand theme={theme} />
        <button className={`menu-toggle${open ? ' is-open' : ''}`} type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
          <span /><span /><span />
        </button>
        <div className={`nav-content${open ? ' is-open' : ''}`}>
          <div className="nav-links">
            {[['/', 'Home'], ['/about', 'About']].map(([to, label]) => (
              <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} onClick={close}>{label}</NavLink>
            ))}
            <div className={`nav-service-menu${servicesOpen ? ' is-open' : ''}`}>
              <div className="nav-service-trigger">
                <button className={`nav-link nav-service-trigger-button${pathname === '/services' ? ' active' : ''}`} type="button" aria-haspopup="true" aria-controls="services-menu" aria-expanded={servicesOpen} onClick={() => setServicesOpen((isOpen) => !isOpen)}>Services</button>
              </div>
              <div id="services-menu" className="nav-service-dropdown" aria-label="Service categories">
                {categories.map((category) => {
                  const categoryServices = services.filter((service) => service.category === category)
                  const categoryUrl = `/services?category=${encodeURIComponent(category)}`
                  return (
                    <div className="nav-service-group" key={category}>
                      <Link className="nav-category-title" to={categoryUrl} onClick={close}>{category}<span>↗</span></Link>
                      {categoryServices.map((service) => (
                        <Link className="nav-service-item" key={service._id} to={`${categoryUrl}#${service._id}`} onClick={close}>{service.title}</Link>
                      ))}
                    </div>
                  )
                })}
              </div>
            </div>
            <NavLink to="/contact" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} onClick={close}>Contact</NavLink>
          </div>
          <Link className="nav-cta" to="/services" onClick={close}>Book a service <span>↗</span></Link>
          <button className="theme-toggle" type="button" aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} aria-pressed={theme === 'light'} onClick={onToggleTheme}>
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></svg>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.2 15.4A8.5 8.5 0 0 1 8.6 3.8 8.6 8.6 0 1 0 20.2 15.4Z" /></svg>
            )}
            <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>
        </div>
      </nav>
    </header>
  )
}

function Footer({ theme }) {
  const whatsappUrl = createWhatsAppUrl('Hi tekxone, I’d like to discuss a project.')
  return (
    <footer className="site-footer">
      <div className="page-shell footer-grid">
        <div><Brand footer theme={theme} /><p>Technology with purpose.<br />Built for what comes next.</p></div>
        <div className="footer-links"><span className="eyebrow">Explore</span><Link to="/about">Our story</Link><Link to="/services">Services</Link><Link to="/contact">Get in touch</Link></div>
        <div className="footer-contact"><span className="eyebrow">Start a conversation</span><a href="mailto:hello@tekxone.com">hello@tekxone.com</a>{whatsappUrl && <a href={whatsappUrl} target="_blank" rel="noreferrer">Chat on WhatsApp ↗</a>}</div>
      </div>
      <div className="page-shell footer-bottom"><span>© {currentYear} tekxone. Made for what’s next.</span><span>AI · Web · Product · Growth</span></div>
    </footer>
  )
}

export default function SiteLayout() {
  const location = useLocation()
  const [theme, setTheme] = useState(() => window.localStorage.getItem('tekxone-theme') === 'light' ? 'light' : 'dark')
  const toggleTheme = () => setTheme((current) => current === 'dark' ? 'light' : 'dark')

  useEffect(() => { window.scrollTo(0, 0) }, [location.pathname])
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('tekxone-theme', theme)
  }, [theme])

  return (
    <>
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <main key={location.pathname}><Outlet /></main>
      <Footer theme={theme} />
    </>
  )
}
