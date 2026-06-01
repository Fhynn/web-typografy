import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../utils/motion'

/**
 * CustomCursor — Awwwards-style cursor.
 * A small dot tracks the pointer 1:1 while a larger ring trails behind with
 * smoothing (lerp). The ring grows + fills when hovering interactive elements.
 * Uses mix-blend-mode: difference so it stays visible on every page colour.
 * Automatically disabled on touch / coarse-pointer devices.
 */
export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Skip on touch devices (no pointer to follow) and when the user
    // prefers reduced motion (keep the native cursor, no trailing ring).
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (prefersReducedMotion()) return

    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    document.documentElement.classList.add('wf-cursor-on')

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let ringX  = mouseX
    let ringY  = mouseY
    let raf = 0
    let revealed = false

    // Park both elements at centre (hidden) so there's no corner-flash on load.
    dot.style.transform  = `translate(-50%, -50%) translate(${mouseX}px, ${mouseY}px)`
    ring.style.transform = `translate(-50%, -50%) translate(${ringX}px, ${ringY}px)`

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = `translate(-50%, -50%) translate(${mouseX}px, ${mouseY}px)`
      if (!revealed) {
        revealed = true
        ringX = mouseX
        ringY = mouseY
        dot.style.opacity = '1'
        ring.style.opacity = '1'
      }
    }

    const onOver = (e: MouseEvent) => {
      const t = (e.target as Element | null)?.closest(
        'a, button, input, textarea, label, [data-cursor]'
      )
      ring.classList.toggle('wf-cursor-ring--active', !!t)
    }

    const onDown = () => ring.classList.add('wf-cursor-ring--down')
    const onUp   = () => ring.classList.remove('wf-cursor-ring--down')
    const onLeave = () => { dot.style.opacity = '0'; ring.style.opacity = '0' }
    const onEnter = () => { dot.style.opacity = '1'; ring.style.opacity = '1' }

    const loop = () => {
      ringX += (mouseX - ringX) * 0.16
      ringY += (mouseY - ringY) * 0.16
      ring.style.transform = `translate(-50%, -50%) translate(${ringX}px, ${ringY}px)`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      document.documentElement.classList.remove('wf-cursor-on')
    }
  }, [])

  return (
    <>
      <div ref={ringRef} className="wf-cursor-ring" aria-hidden />
      <div ref={dotRef} className="wf-cursor-dot" aria-hidden />
    </>
  )
}
