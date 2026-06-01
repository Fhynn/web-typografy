import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { prefersReducedMotion } from '../utils/motion'

/**
 * Preloader — first-load intro overlay (lusion.co style).
 * Counts 0 → 100 with a progress bar, reveals the wordmark, then slides away
 * to uncover the page. Shows once per browser session (sessionStorage guard),
 * so internal route changes don't replay it.
 */
export default function Preloader() {
  const [done, setDone] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true
    // Skip the intro if it already played this session or the user prefers
    // reduced motion. (App.tsx reveals its hero immediately in both cases.)
    return sessionStorage.getItem('wf_preloaded') === '1' || prefersReducedMotion()
  })

  const rootRef  = useRef<HTMLDivElement>(null)
  const numRef   = useRef<HTMLSpanElement>(null)
  const barRef   = useRef<HTMLDivElement>(null)
  const markRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (done) return
    const root = rootRef.current
    const num  = numRef.current
    const bar  = barRef.current
    const mark = markRef.current
    if (!root || !num || !bar || !mark) return

    // Lock scroll while the intro plays.
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const counter = { v: 0 }
    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem('wf_preloaded', '1')
        document.body.style.overflow = prevOverflow
        setDone(true)
        // Let the landing hero start its entrance exactly as the curtain lifts,
        // and nudge ScrollTrigger to recalc now that the overlay is gone.
        window.dispatchEvent(new Event('wf:loaded'))
        window.dispatchEvent(new Event('resize'))
      },
    })

    gsap.set(mark, { opacity: 0, y: 24 })
    gsap.set(num,  { opacity: 0, y: 24 })

    tl.to(mark, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
      .to(num,  { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.4')
      .to(counter, {
        v: 100,
        duration: 1.6,
        ease: 'power2.inOut',
        onUpdate: () => {
          const v = Math.round(counter.v)
          num.textContent = String(v).padStart(3, '0')
          bar.style.transform = `scaleX(${counter.v / 100})`
        },
      }, '-=0.2')
      .to([mark, num], { opacity: 0, y: -24, duration: 0.45, ease: 'power3.in' }, '+=0.15')
      .to(root, { yPercent: -100, duration: 0.9, ease: 'power4.inOut' }, '-=0.05')

    return () => {
      tl.kill()
      document.body.style.overflow = prevOverflow
    }
  }, [done])

  if (done) return null

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[1000000] flex flex-col items-center justify-center"
      style={{ background: '#060606', color: '#F0EDE8' }}
    >
      <div
        ref={markRef}
        className="select-none"
        style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 'clamp(22px, 4vw, 40px)', letterSpacing: '-0.02em' }}
      >
        Wanderful<sup className="align-super ml-0.5 opacity-70" style={{ fontSize: '0.4em' }}>TM</sup>
      </div>

      <span
        ref={numRef}
        className="mt-5 tabular-nums"
        style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300, fontSize: 'clamp(13px, 1.4vw, 16px)', letterSpacing: '0.3em', color: 'rgba(240,237,232,0.5)' }}
      >
        000
      </span>

      <div className="absolute left-0 right-0 bottom-0 h-[2px]" style={{ background: 'rgba(240,237,232,0.12)' }}>
        <div ref={barRef} className="h-full origin-left" style={{ background: '#F0EDE8', transform: 'scaleX(0)' }} />
      </div>
    </div>
  )
}
