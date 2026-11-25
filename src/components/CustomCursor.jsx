import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const ring = useRef(null)
  const dot = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    let ringX = window.innerWidth / 2
    let ringY = window.innerHeight / 2
    let pointerX = ringX
    let pointerY = ringY
    let visible = false
    let frame

    const move = (event) => {
      pointerX = event.clientX
      pointerY = event.clientY
      visible = true

      if (dot.current) {
        dot.current.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`
        dot.current.dataset.visible = 'true'
      }
      if (ring.current) {
        ring.current.dataset.visible = 'true'
        const interactive = event.target.closest('a, button, input, textarea, select, [role="button"]')
        ring.current.dataset.active = interactive ? 'true' : 'false'
      }
    }

    const animate = () => {
      ringX += (pointerX - ringX) * 0.16
      ringY += (pointerY - ringY) * 0.16
      if (ring.current) {
        ring.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`
      }
      frame = window.requestAnimationFrame(animate)
    }

    const hide = () => {
      visible = false
      if (ring.current) ring.current.dataset.visible = 'false'
      if (dot.current) dot.current.dataset.visible = 'false'
    }

    const show = () => {
      if (visible) {
        if (ring.current) ring.current.dataset.visible = 'true'
        if (dot.current) dot.current.dataset.visible = 'true'
      }
    }

    window.addEventListener('mousemove', move)
    document.documentElement.addEventListener('mouseleave', hide)
    document.documentElement.addEventListener('mouseenter', show)
    frame = window.requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', move)
      document.documentElement.removeEventListener('mouseleave', hide)
      document.documentElement.removeEventListener('mouseenter', show)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <>
      <div ref={ring} className="custom-cursor-ring" aria-hidden="true" />
      <div ref={dot} className="custom-cursor-dot" aria-hidden="true" />
    </>
  )
}
