import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * HorizontalScroll — wraps children in a GSAP-powered horizontal scroll section.
 * Scroll down on the page = panels move left. Pinned while scrolling through.
 */
export default function HorizontalScroll({
  children,
  className = '',
  panelClassName = '',
  bgColor = 'transparent',
}: {
  children: ReactNode[]
  className?: string
  panelClassName?: string
  bgColor?: string
}) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className={`horizontal-section ${className}`} style={{ background: bgColor, overflow: 'hidden' }}>
      <div ref={trackRef} className="horizontal-track flex">
        {Array.isArray(children) && children.map((child, i) => (
          <div key={i} className={`horizontal-panel shrink-0 ${panelClassName}`}>
            {child}
          </div>
        ))}
      </div>
    </div>
  )
}
