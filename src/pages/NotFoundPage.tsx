import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ArrowUpRight, Compass } from 'lucide-react'
import SplitText from '../components/SplitText'
import MagneticButton from '../components/MagneticButton'

/* ── Palette (matches the home / contact dark theme) ── */
const BG    = '#0C0C0C'
const INK   = '#F0EDE8'
const MUTED = 'rgba(240,237,232,0.45)'
const FAINT = 'rgba(240,237,232,0.12)'

const LINKS = [
  { label: 'Journey',      to: '/journey' },
  { label: 'The Atlas',    to: '/destinations' },
  { label: 'About',        to: '/about' },
  { label: 'Contact',      to: '/contact' },
]

export default function NotFoundPage() {
  const location = useLocation()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current!.querySelectorAll('[data-r]'),
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1, delay: 0.35 }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={ref}
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ background: BG, color: INK, fontFamily: "'Inter', sans-serif" }}
    >
      <div data-r className="flex items-center gap-2 mb-8" style={{ color: MUTED }}>
        <Compass size={14} strokeWidth={1.6} />
        <span className="text-[10px] tracking-[0.22em] font-medium">OFF THE MAP</span>
      </div>

      <SplitText
        className="font-light leading-[0.85] tracking-[-0.04em]"
        style={{ fontSize: 'clamp(96px, 22vw, 320px)' }}
        trigger={false}
        delay={0.1}
      >
        404
      </SplitText>

      <p data-r className="text-[15px] sm:text-[17px] leading-relaxed max-w-[440px] mt-8" style={{ color: MUTED }}>
        This route doesn't exist on our atlas
        <span className="block mt-1 break-all" style={{ color: 'rgba(240,237,232,0.3)' }}>
          {location.pathname}
        </span>
      </p>

      {/* Quick links */}
      <div data-r className="flex flex-wrap items-center justify-center gap-3 mt-10">
        {LINKS.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className="group flex items-center gap-2 px-5 py-3 rounded-full text-[13px] font-light transition-all duration-300 hover:gap-3"
            style={{ background: FAINT, border: `1px solid ${FAINT}` }}
          >
            {l.label}
            <ArrowUpRight size={13} strokeWidth={2} className="opacity-40 group-hover:opacity-100 transition-opacity" />
          </Link>
        ))}
      </div>

      {/* Primary CTA back home */}
      <div data-r className="mt-12">
        <MagneticButton
          to="/"
          className="rounded-full px-8 py-4 text-[13px] font-medium tracking-[0.06em]"
          style={{ background: INK, color: BG, fontFamily: "'Barlow', sans-serif" }}
        >
          Take me home <ArrowUpRight size={14} strokeWidth={2} />
        </MagneticButton>
      </div>
    </div>
  )
}
