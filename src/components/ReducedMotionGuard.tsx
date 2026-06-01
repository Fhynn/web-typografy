import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../utils/motion'

gsap.registerPlugin(ScrollTrigger)

/**
 * ReducedMotionGuard — when the user prefers reduced motion, neutralise every
 * scroll-linked ("scrub") parallax across the app after each route mounts.
 *
 * Pages build their own ScrollTriggers in their effects; this runs just after
 * (next frame + a couple of fallbacks + on every ScrollTrigger refresh) and
 * kills the scrub ones, clearing their transform so the element sits at its
 * natural layout position. Entrance fade-ins (non-scrub) are intentionally
 * left alone — they reveal content and a soft fade isn't a vestibular trigger.
 * All scrub tweens in this project animate transform only (never opacity),
 * so clearing transform never hides anything.
 */
export default function ReducedMotionGuard() {
  const location = useLocation()

  useEffect(() => {
    if (!prefersReducedMotion()) return

    const neutralize = () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (!st.vars || !st.vars.scrub) return
        // Scrub animations in this project are all tweens (gsap.to / fromTo).
        const anim = st.animation as gsap.core.Tween | undefined
        const targets =
          anim && typeof anim.targets === 'function' ? anim.targets() : []
        st.kill()
        if (targets && targets.length) {
          gsap.set(targets, { clearProps: 'transform' })
        }
      })
    }

    const raf = requestAnimationFrame(neutralize)
    const t1 = setTimeout(neutralize, 150)
    // PageTransition dispatches a 'resize' after the curtain lifts, which
    // refreshes ScrollTrigger; re-run then to catch anything rebuilt.
    const t2 = setTimeout(neutralize, 700)
    ScrollTrigger.addEventListener('refresh', neutralize)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(t1)
      clearTimeout(t2)
      ScrollTrigger.removeEventListener('refresh', neutralize)
    }
  }, [location.pathname])

  return null
}
