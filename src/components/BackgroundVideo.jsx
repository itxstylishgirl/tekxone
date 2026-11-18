import { useEffect, useRef } from 'react'

const videoSource = 'https://videos.pexels.com/video-files/32399073/13820342_2560_1440_30fps.mp4'

export default function BackgroundVideo({ className }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return undefined

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!video.hasAttribute('src')) {
          video.src = videoSource
          video.load()
        }
        video.play().catch((error) => {
          if (error.name === 'AbortError') return
          console.error('Background video playback failed.', error)
        })
      } else {
        video.pause()
      }
    }, { rootMargin: '200px 0px', threshold: 0.01 })

    observer.observe(video)
    return () => {
      observer.disconnect()
      video.pause()
    }
  }, [])

  return (
    <video ref={videoRef} className={className} muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1} />
  )
}
