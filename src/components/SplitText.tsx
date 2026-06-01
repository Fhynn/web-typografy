import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../utils/motion'

gsap.registerPlugin(ScrollTrigger)

/**
 * SplitText — splits text into words/chars and animates them in on scroll.
 * Used on all hero headings for Awwwards-level text reveals.
 */
export default function SplitText({
  children,
  className = '',
  style = {},
  as: Tag = 'h1',
  delay = 0,
  stagger = 0.035,
  duration = 0.9,
  y = 80,
  trigger = true,   // if false, plays immediately (for above-fold)
}: {
  children: string
  className?: string
  style?: React.CSSProperties
  as?: React.ElementType
  delay?: number
  stagger?: number
  duration?: number
  y?: number
  trigger?: boolean
}) {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const chars = el.querySelectorAll('.split-char')

    // Reduced motion: reveal instantly, no per-character animation.
    if (prefersReducedMotion()) {
      gsap.set(chars, { opacity: 1, y: 0, rotateX: 0 })
      return
    }

    const anim = gsap.fromTo(chars,
      { y, opacity: 0, rotateX: -60 },
      {
        y: 0, opacity: 1, rotateX: 0,
        duration,
        ease: 'power4.out',
        stagger,
        delay: trigger ? 0 : delay,
        ...(trigger ? {
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          }
        } : {}),
      }
    )

    if (!trigger) {
      gsap.delayedCall(delay, () => anim.play())
    }

    return () => { anim.kill() }
  }, [])

  // Split into words, then chars
  const words = children.split(' ')

  return (
    <Tag ref={containerRef} className={className} style={{ ...style, perspective: '600px' }}>
      {words.map((word, wi) => (
        <span key={wi} className="split-word" style={{ display: 'inline-block', overflow: 'hidden' }}>
          {word.split('').map((char, ci) => (
            <span key={ci} className="split-char" style={{ display: 'inline-block', willChange: 'transform', opacity: 0 }}>
              {char}
            </span>
          ))}
          {wi < words.length - 1 && <span className="split-char" style={{ display: 'inline-block', opacity: 0 }}>&nbsp;</span>}
        </span>
      ))}
    </Tag>
  )
}
