import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowLeft, ArrowUpRight, FileText } from 'lucide-react'
import SplitText from '../components/SplitText'

gsap.registerPlugin(ScrollTrigger)

const GUIDES = [
  {
    id: '01',
    title: 'The Hidden Amalfi',
    tagline: 'Beyond the postcard',
    pages: 32,
    photo: 'https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?w=800&q=80&auto=format&fit=crop',
    photoAlt: 'Amalfi coast narrow street with lemon trees',
  },
  {
    id: '02',
    title: 'Kyoto Without the Crowds',
    tagline: 'Silence between the temples',
    pages: 28,
    photo: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80&auto=format&fit=crop',
    photoAlt: 'Torii gates in Kyoto morning mist',
  },
  {
    id: '03',
    title: 'Desert Journeys: Morocco',
    tagline: 'From medina to dune',
    pages: 40,
    photo: 'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=800&q=80&auto=format&fit=crop',
    photoAlt: 'Sahara desert dunes at sunset',
  },
]

export default function GuidebookPage() {
  const pageRef     = useRef<HTMLDivElement>(null)
  const headerRef   = useRef<HTMLDivElement>(null)
  const previewRef  = useRef<HTMLDivElement>(null)
  const previewImgRef = useRef<HTMLImageElement>(null)
  const guideRef    = useRef<HTMLDivElement>(null)
  const formRef     = useRef<HTMLDivElement>(null)

  const [activeGuide, setActiveGuide] = useState(0)
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── 1. Header stagger entrance ─────────────────── */
      gsap.fromTo(
        headerRef.current!.querySelectorAll('[data-h]'),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.14, delay: 0.1 }
      )

      /* ── 2. Preview pane entrance + photo parallax ─── */
      gsap.fromTo(previewRef.current,
        { opacity: 0, x: -48, scale: 0.97 },
        {
          opacity: 1, x: 0, scale: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: previewRef.current, start: 'top 82%' },
        }
      )

      if (previewImgRef.current) {
        gsap.fromTo(previewImgRef.current,
          { y: '-8%' },
          {
            y: '8%',
            ease: 'none',
            scrollTrigger: {
              trigger: previewRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.9,
            },
          }
        )
      }

      /* ── 3. Guide rows stagger from right ───────────── */
      const rows = guideRef.current!.querySelectorAll('.guide-row')
      gsap.fromTo(rows,
        { opacity: 0, x: 60 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: { trigger: guideRef.current, start: 'top 80%' },
        }
      )

      /* ── 4. Form section reveal ──────────────────────── */
      gsap.fromTo(formRef.current,
        { opacity: 0, y: 48 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: formRef.current, start: 'top 88%' },
        }
      )

      /* ── 5. Header title parallax upward ────────────── */
      gsap.to(headerRef.current, {
        y: -55,
        ease: 'none',
        scrollTrigger: {
          trigger: pageRef.current,
          start: 'top top',
          end: '35% top',
          scrub: 1.2,
        },
      })

    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef} className="min-h-screen" style={{ fontFamily: "'Inter', sans-serif", background: '#069494', color: '#E0F4F4' }}>

      {/* Nav */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[92%] sm:w-[85%] max-w-7xl z-50 flex items-center justify-between px-6 py-4 rounded-full liquid-glass transition-all duration-300">
        <Link to="/" className="flex items-center gap-2.5 group" style={{ color: 'rgba(224,244,244,0.55)' }}>
          <ArrowLeft size={14} strokeWidth={2} className="group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="text-[10px] tracking-[0.18em] font-medium">WANDERFUL</span>
        </Link>
        <span className="text-[10px] tracking-[0.18em] font-medium" style={{ color: 'rgba(224,244,244,0.35)' }}>GUIDEBOOK</span>
      </nav>

      {/* ── Header ─────────────────────────────────────── */}
      <header ref={headerRef} className="pt-32 sm:pt-40 pb-16 px-6 sm:px-12 max-w-7xl mx-auto">
        <p data-h className="text-[10px] tracking-[0.22em] font-medium mb-7" style={{ color: 'rgba(224,244,244,0.45)' }}>
          04 — GUIDEBOOK
        </p>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <SplitText data-h className="font-light leading-[0.93] tracking-[-0.035em]" style={{ fontSize: 'clamp(44px, 7vw, 110px)' }} trigger={false} delay={0.1}>
            Travel lore, distilled.
          </SplitText>
          <p data-h className="text-[13px] leading-relaxed max-w-[260px] sm:text-right pb-2" style={{ color: 'rgba(224,244,244,0.5)' }}>
            Free offline guides — written by people who have actually been there.
          </p>
        </div>
      </header>

      {/* ── Guides layout ──────────────────────────────── */}
      <main className="px-6 sm:px-12 max-w-7xl mx-auto pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3">

          {/* Preview pane */}
          <div
            ref={previewRef}
            className="relative overflow-hidden rounded-xl opacity-0"
            style={{ minHeight: 480 }}
          >
            {/* Stack all photos, switch with opacity */}
            {GUIDES.map((g, i) => (
              <img
                key={g.id}
                src={g.photo}
                alt={g.photoAlt}
                className="absolute inset-x-0 w-full object-cover transition-opacity duration-700"
                ref={i === 0 ? previewImgRef : undefined}
                style={{ top: '-8%', height: '116%', opacity: activeGuide === i ? 1 : 0, willChange: 'transform, opacity' }}
                loading={i === 0 ? 'eager' : 'lazy'}
              />
            ))}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(6,57,57,0.06) 0%, rgba(6,57,57,0.55) 100%)' }} />
            {/* Overlay info */}
            <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-9">
              <p className="text-[10px] tracking-[0.2em] font-medium mb-2" style={{ color: 'rgba(224,244,244,0.55)' }}>
                {GUIDES[activeGuide].id} OF 03
              </p>
              <h2 className="font-light leading-[1.0] tracking-[-0.025em] text-[#E0F4F4]" style={{ fontSize: 'clamp(26px, 3vw, 42px)' }}>
                {GUIDES[activeGuide].title}
              </h2>
              <p className="mt-1 text-[13px]" style={{ color: 'rgba(224,244,244,0.55)' }}>
                {GUIDES[activeGuide].tagline}
              </p>
            </div>
          </div>

          {/* Guide rows */}
          <div ref={guideRef} className="flex flex-col" style={{ gap: 2 }}>
            {GUIDES.map((g, i) => (
              <div
                key={g.id}
                className="guide-row group flex items-center justify-between px-7 py-7 rounded-xl cursor-pointer transition-all duration-300 opacity-0"
                style={{
                  background: activeGuide === i ? 'rgba(224,244,244,0.12)' : 'rgba(224,244,244,0.04)',
                  border: `1px solid ${activeGuide === i ? 'rgba(224,244,244,0.2)' : 'rgba(224,244,244,0.08)'}`,
                }}
                onMouseEnter={() => setActiveGuide(i)}
              >
                <div className="flex items-start gap-5">
                  <span className="text-[11px] font-light mt-0.5" style={{ color: 'rgba(224,244,244,0.3)' }}>{g.id}</span>
                  <div>
                    <h3 className="text-[16px] sm:text-[18px] font-light tracking-[-0.01em] mb-1">{g.title}</h3>
                    <p className="text-[12px]" style={{ color: 'rgba(224,244,244,0.5)' }}>{g.tagline}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <span className="flex items-center gap-1.5 text-[10px] tracking-[0.1em]" style={{ color: 'rgba(224,244,244,0.4)' }}>
                    <FileText size={10} strokeWidth={1.8} />
                    {g.pages} pages
                  </span>
                  <button className="flex items-center gap-1.5 text-[10px] font-medium tracking-[0.12em] transition-all duration-200 group-hover:gap-2" style={{ color: '#E0F4F4' }}>
                    FREE PDF <ArrowUpRight size={10} strokeWidth={2} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Email CTA ─────────────────────────────────── */}
        <div
          ref={formRef}
          className="opacity-0 rounded-xl px-8 sm:px-12 py-12"
          style={{ background: 'rgba(224,244,244,0.06)', border: '1px solid rgba(224,244,244,0.12)' }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-[10px] tracking-[0.2em] font-medium mb-5" style={{ color: 'rgba(224,244,244,0.4)' }}>
                NEW GUIDES EVERY MONTH
              </p>
              <h2 className="font-light leading-[1.05] tracking-[-0.025em] mb-4" style={{ fontSize: 'clamp(24px, 2.8vw, 38px)' }}>
                Get them before anyone else.
              </h2>
              <p className="text-[14px] leading-[1.75]" style={{ color: 'rgba(224,244,244,0.5)' }}>
                One guide a month, curated and written by people who actually went.
                No newsletters. No noise.
              </p>
            </div>
            <div>
              {sent ? (
                <div className="py-6">
                  <p className="text-[15px] font-light" style={{ color: '#E0F4F4' }}>You're in. Watch your inbox.</p>
                  <p className="text-[13px] mt-2" style={{ color: 'rgba(224,244,244,0.45)' }}>First guide lands within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); if (email) setSent(true) }} className="flex flex-col gap-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full rounded-full px-6 py-4 text-[14px] outline-none transition-all duration-200"
                    style={{ background: 'rgba(224,244,244,0.08)', border: '1px solid rgba(224,244,244,0.18)', color: '#E0F4F4' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(224,244,244,0.4)')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(224,244,244,0.18)')}
                  />
                  <button
                    type="submit"
                    className="w-full rounded-full py-4 text-[13px] font-medium tracking-[0.06em] transition-all duration-300 hover:scale-[1.01]"
                    style={{ fontFamily: "'Barlow', sans-serif", background: '#E0F4F4', color: '#003838' }}
                  >
                    Send me guides
                  </button>
                </form>
              )}
              <p className="text-[11px] mt-4 text-center" style={{ color: 'rgba(224,244,244,0.3)' }}>
                Unsubscribe any time. We mean it.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
