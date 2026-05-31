import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'

interface Props {
  children: React.ReactNode
}

export default function PageTransition({ children }: Props) {
  const location = useLocation()
  const pageRef = useRef<HTMLDivElement>(null)
  const curtainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const page = pageRef.current
    const curtain = curtainRef.current
    if (!page || !curtain) return

    const tl = gsap.timeline()

    // Curtain sweep in
    tl.set(curtain, { scaleX: 0, transformOrigin: 'left center', display: 'block' })
    tl.to(curtain, {
      scaleX: 1,
      duration: 0.45,
      ease: 'power3.inOut',
    })
    // Page fades in from below while curtain sweeps out
    tl.set(page, { opacity: 0, y: 24 })
    tl.to(
      curtain,
      {
        scaleX: 0,
        transformOrigin: 'right center',
        duration: 0.45,
        ease: 'power3.inOut',
      },
      '+=0.05',
    )
    tl.to(
      page,
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      },
      '<0.1',
    )

    return () => {
      tl.kill()
    }
  }, [location.pathname])

  return (
    <div style={{ position: 'relative' }}>
      {/* Curtain overlay */}
      <div
        ref={curtainRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
          display: 'none',
          pointerEvents: 'none',
        }}
      />
      <div ref={pageRef}>
        {children}
      </div>
    </div>
  )
}
