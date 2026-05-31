import { useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'

/**
 * MagneticButton — follows cursor within its bounds for a magnetic pull effect.
 * Used on CTAs. Professional web agencies use this on every primary button.
 */
export default function MagneticButton({
  children,
  to,
  className = '',
  style = {},
  strength = 0.35,
}: {
  children: React.ReactNode
  to: string
  className?: string
  style?: React.CSSProperties
  strength?: number
}) {
  const btnRef = useRef<HTMLAnchorElement>(null)
  const txtRef = useRef<HTMLSpanElement>(null)

  const onMove = (e: React.MouseEvent) => {
    const el = btnRef.current
    if (!el) return
    const { left, top, width, height } = el.getBoundingClientRect()
    const cx = e.clientX - left - width / 2
    const cy = e.clientY - top - height / 2
    gsap.to(el, { x: cx * strength, y: cy * strength, duration: 0.4, ease: 'power3.out' })
    if (txtRef.current) {
      gsap.to(txtRef.current, { x: cx * strength * 0.5, y: cy * strength * 0.5, duration: 0.4, ease: 'power3.out' })
    }
  }

  const onLeave = () => {
    gsap.to(btnRef.current, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' })
    if (txtRef.current) {
      gsap.to(txtRef.current, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' })
    }
  }

  return (
    <Link
      ref={btnRef}
      to={to}
      className={`magnetic-btn inline-flex items-center gap-2.5 ${className}`}
      style={{ ...style, willChange: 'transform' }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <span ref={txtRef} className="flex items-center gap-2.5" style={{ willChange: 'transform' }}>
        {children}
      </span>
    </Link>
  )
}
