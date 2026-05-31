import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { Lock, Menu, X } from 'lucide-react'
import './index.css'

/* ─────────────────────────────────────────────────── */
/*  Constants                                          */
/* ─────────────────────────────────────────────────── */
const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260510_060007_60275ce7-030c-4668-a160-8f364ec537d3.mp4'

const NAV_LINKS = [
  { label: 'JOURNEY',   path: '/journey'   },
  { label: 'BENEFITS',  path: '/benefits'  },
  { label: 'JOURNAL',   path: '/journal'   },
  { label: 'GUIDEBOOK', path: '/guidebook' },
] as const

/* ─────────────────────────────────────────────────── */
/*  App                                                */
/* ─────────────────────────────────────────────────── */
export default function App() {
  /* Refs */
  const videoWrapRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  /* Fade-in state */
  const [heroVisible, setHeroVisible] = useState(false)
  const [bottomVisible, setBottomVisible] = useState(false)

  /* Mobile menu state */
  const [menuOpen, setMenuOpen] = useState(false)

  /* ── Fade in on mount ─────────────────────────── */
  useEffect(() => {
    const t1 = setTimeout(() => setHeroVisible(true), 80)
    const t2 = setTimeout(() => setBottomVisible(true), 300 + 80)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  /* ── Playback rate ────────────────────────────── */
  const handleLoadedMetadata = () => {
    if (videoRef.current) videoRef.current.playbackRate = 1.25
  }

  /* ── GSAP mouse parallax ──────────────────────── */
  useEffect(() => {
    let animId: number
    let currentX = 0
    let currentY = 0
    let targetX = 0
    let targetY = 0

    const onMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      targetX = ((e.clientX - cx) / cx) * 20
      targetY = ((e.clientY - cy) / cy) * 20
    }

    const loop = () => {
      currentX += (targetX - currentX) * 0.06
      currentY += (targetY - currentY) * 0.06
      if (videoWrapRef.current) {
        gsap.set(videoWrapRef.current, { x: currentX, y: currentY })
      }
      animId = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMouseMove)
    animId = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(animId)
    }
  }, [])

  /* ─────────────────────────────────────────────── */
  /*  Render                                         */
  /* ─────────────────────────────────────────────── */
  return (
    <div
      className="relative min-h-screen bg-black text-white overflow-x-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* ══════════════════════════════════════════ */}
      {/*  VIDEO BACKGROUND  (z-0)                  */}
      {/* ══════════════════════════════════════════ */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div
          ref={videoWrapRef}
          className="absolute inset-0 scale-[1.08] origin-center"
        >
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            autoPlay
            muted
            loop
            playsInline
            onLoadedMetadata={handleLoadedMetadata}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* subtle dark vignette overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/60 pointer-events-none" />
      </div>

      {/* ══════════════════════════════════════════ */}
      {/*  HEADER  (z-50)                           */}
      {/* ══════════════════════════════════════════ */}
      <header className="fixed top-0 inset-x-0 z-50 px-5 sm:px-10 py-5 sm:py-8 flex justify-between items-center">
        {/* Wordmark */}
        <a
          href="/"
          className="text-white no-underline select-none z-50"
          style={{ fontSize: 17, fontWeight: 600, letterSpacing: '-0.01em' }}
        >
          Wanderful<sup className="text-[10px] align-super ml-0.5 opacity-80">TM</sup>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex liquid-glass rounded-full px-2 py-2 items-center gap-1">
          {NAV_LINKS.map(({ label, path }) => (
            <Link
              key={label}
              to={path}
              className="text-[11px] font-medium tracking-[0.12em] text-white/90 hover:text-white px-4 py-1.5 rounded-full transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <Link
          to="/journey"
          className="hidden md:block liquid-glass rounded-full px-5 py-2.5 text-[11px] font-medium tracking-[0.12em] text-white/90 hover:text-white transition-colors duration-200"
        >
          GET ROAMING
        </Link>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden liquid-glass rounded-full p-2.5 text-white/90 hover:text-white transition-colors duration-200 z-50"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={18} strokeWidth={1.8} /> : <Menu size={18} strokeWidth={1.8} />}
        </button>
      </header>

      {/* ══════════════════════════════════════════ */}
      {/*  MOBILE MENU OVERLAY                      */}
      {/* ══════════════════════════════════════════ */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${
          menuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(20px)' }}
      >
        {NAV_LINKS.map(({ label, path }, i) => (
          <Link
            key={label}
            to={path}
            onClick={() => setMenuOpen(false)}
            className="text-white text-2xl font-medium tracking-[0.15em] hover:text-white/70 transition-all duration-300"
            style={{
              transform: menuOpen ? 'translateY(0)' : 'translateY(16px)',
              opacity: menuOpen ? 1 : 0,
              transition: `opacity 0.4s ease ${i * 0.06 + 0.1}s, transform 0.4s ease ${i * 0.06 + 0.1}s`,
            }}
          >
            {label}
          </Link>
        ))}
        <Link
          to="/journey"
          onClick={() => setMenuOpen(false)}
          className="mt-4 bg-white text-black text-sm font-medium rounded-full px-8 py-3 tracking-[0.1em] hover:bg-white/90 transition-colors duration-200"
          style={{
            transform: menuOpen ? 'translateY(0)' : 'translateY(16px)',
            opacity: menuOpen ? 1 : 0,
            transition: `opacity 0.4s ease 0.35s, transform 0.4s ease 0.35s`,
          }}
        >
          GET ROAMING
        </Link>
      </div>

      {/* ══════════════════════════════════════════ */}
      {/*  HERO HEADLINE  (z-20)                    */}
      {/* ══════════════════════════════════════════ */}
      <div
        className={`fixed inset-x-0 z-20 flex flex-col items-center text-center px-6 transition-all duration-1000 ${
          heroVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-6'
        }`}
        style={{ top: 'clamp(90px, 14vh, 140px)' }}
      >
        <h1
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: 'clamp(28px, 5.4vw, 72px)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          <span className="block text-white">Venture without edges.</span>
          <span className="block" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Uncover with keen instinct.
          </span>
        </h1>
      </div>

      {/* ══════════════════════════════════════════ */}
      {/*  BOTTOM BLOCK  (z-20)                     */}
      {/* ══════════════════════════════════════════ */}
      <div
        className={`fixed inset-x-0 bottom-8 sm:bottom-14 z-20 flex flex-col items-center gap-4 sm:gap-6 px-6 transition-all duration-1000 delay-300 ${
          bottomVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-6'
        }`}
      >
        {/* Descriptor paragraph */}
        <p
          className="max-w-[620px] text-[13px] sm:text-[15px] leading-relaxed text-center"
          style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 400 }}
        >
          <span className="text-white">
            Our smart itineraries shape around you — your rhythm, your vibe,
            your hunger for adventure.
          </span>
          <span style={{ color: 'rgba(255,255,255,0.55)' }}>
            {' '}
            Each getaway is tailored, seamless, and wholly yours.
          </span>
        </p>

        {/* CTA button */}
        <Link
          to="/journey"
          id="plan-escape-btn"
          className="
            bg-white text-black text-[13px] sm:text-[15px] font-medium rounded-full
            px-6 py-3 sm:px-8 sm:py-3.5
            transition-all duration-300 ease-out
            hover:scale-[1.03] hover:shadow-[0_0_32px_4px_rgba(255,255,255,0.2)]
            active:scale-[0.97]
            cursor-pointer
          "
          style={{ fontFamily: "'Barlow', sans-serif" }}
        >
          Plan my escape today
        </Link>

        {/* Trust badge */}
        <div className="flex items-center gap-2">
          <Lock size={13} strokeWidth={1.5} className="text-white/70" />
          <span
            className="text-[10px] sm:text-[11px] font-medium tracking-[0.14em] text-white/70"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            SECURE BY DESIGN. ALFHIN HIDAYAT.
          </span>
        </div>
      </div>
    </div>
  )
}
