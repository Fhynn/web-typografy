import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLocation } from 'react-router-dom'
import { prefersReducedMotion } from '../utils/motion'

gsap.registerPlugin(ScrollTrigger)

export function useLenis() {
  const location = useLocation()
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Reduced motion: no smooth-scroll hijack — use the browser's native
    // scrolling. ScrollTrigger keeps working off native scroll events.
    if (prefersReducedMotion()) {
      window.scrollTo(0, 0)
      return
    }

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    })
    lenisRef.current = lenis

    /* Sync with GSAP ticker */
    const raf = (time: number) => { lenis.raf(time * 1000) }
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    /* scroll to top on route change */
    lenis.scrollTo(0, { immediate: true })

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [location.pathname])

  return lenisRef
}
