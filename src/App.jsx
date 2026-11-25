import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { lazy, Suspense, useState } from 'react'
import { services } from './lib/services'
import { ServicesContext } from './lib/ServicesContext'
import CustomCursor from './components/CustomCursor'
import './App.css'

const SiteLayout = lazy(() => import('./components/SiteLayout'))
const BookingModal = lazy(() => import('./components/BookingModal'))
// Load each route only when it is visited so unused pages stay out of the startup bundle.
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const Contact = lazy(() => import('./pages/Contact'))
function AppRoutes() {
  const [bookingService, setBookingService] = useState(null)

  const context = {
    services,
    openBooking: setBookingService,
  }

  return (
    <ServicesContext.Provider value={context}>
      <Suspense fallback={<div className="page-loading" role="status">Loading tekxone…</div>}>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        {bookingService && (
          <BookingModal service={bookingService} onClose={() => setBookingService(null)} />
        )}
      </Suspense>
    </ServicesContext.Provider>
  )
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <CustomCursor />
      <AppRoutes />
    </BrowserRouter>
  )
}
