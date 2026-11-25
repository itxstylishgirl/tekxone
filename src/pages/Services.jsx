import { lazy, Suspense, useEffect, useMemo } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { useServices } from '../lib/ServicesContext'
import { categories } from '../lib/services'
import Reveal from '../components/Reveal'
import ServiceCard from '../components/ServiceCard'
import TypewriterHeading from '../components/TypewriterHeading'
import ProcessList from '../components/ProcessList'

const ServicesScene = lazy(() => import('../canvas/ServicesScene'))

export default function Services() {
  const [searchParams, setSearchParams] = useSearchParams()
  const requestedCategory = searchParams.get('category')
  const active = categories.includes(requestedCategory) ? requestedCategory : 'All'
  const { services, openBooking } = useServices()
  const { hash } = useLocation()
  const groups = useMemo(() => {
    const activeCategories = active === 'All' ? categories : [active]
    return activeCategories.map((category) => ({
      category,
      services: services.filter((service) => service.category === category),
    })).filter((group) => group.services.length > 0)
  }, [active, services])

  useEffect(() => {
    if (!hash) return
    const serviceId = hash.slice(1)
    document.getElementById(serviceId)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [active, hash, services])

  function selectCategory(category) {
    const nextParams = new URLSearchParams(searchParams)
    if (category === 'All') nextParams.delete('category')
    else nextParams.set('category', category)
    setSearchParams(nextParams, { replace: true })
  }

  return (
    <>
      <section className="page-hero page-shell services-hero">
        <Reveal duration={0.08}>
          <span className="eyebrow">What we do</span>
          <TypewriterHeading>Digital services<br />built for <span className="gradient-text">what’s next.</span></TypewriterHeading>
          <p>Thoughtful strategy and digital craftsmanship, in one team. Find the right starting point for your idea.</p>
        </Reveal>
        <Suspense fallback={<div className="page-scene services-hero-scene scene-placeholder" aria-hidden="true" />}>
          <ServicesScene />
        </Suspense>
        <div className="hero-aside"><span>01 — 06</span><span>Our capabilities</span><div className="aside-line" /></div>
      </section>
      <section className="services-list-section services-cards-only">
        <div className="page-shell">
          <div className="filter-tabs" role="tablist" aria-label="Filter services">
            {['All', ...categories].map((category) => (
              <button
                key={category}
                className={`filter-tab${active === category ? ' active' : ''}`}
                type="button"
                role="tab"
                aria-selected={active === category}
                onClick={() => selectCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          {groups.length ? (
            <section className="service-category-section">
              <div className="service-cards all-services">
                {groups.flatMap((group) => group.services).map((service, index) => (
                  <ServiceCard key={service._id} service={service} index={index} onBook={openBooking} />
                ))}
              </div>
            </section>
          ) : (
            <div className="empty-state">
              <span className="eyebrow">Coming into focus</span>
              <h2>No services in this category just yet.</h2>
              <p>Check back soon or get in touch to tell us what you need.</p>
            </div>
          )}
        </div>
      </section>
      <ProcessList />
    </>
  )
}
