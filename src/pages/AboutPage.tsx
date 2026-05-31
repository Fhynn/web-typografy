import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import SplitText from '../components/SplitText'

gsap.registerPlugin(ScrollTrigger)

/* ── Palette ── */
const BG     = '#069494'
const INK    = '#E0F4F4'
const MUTED  = 'rgba(224,244,244,0.45)'
const FAINT  = 'rgba(224,244,244,0.1)'
const ACCENT = '#FCE883'

/* ── Team ── */
const TEAM = [
  {
    name: 'Alfhin Hidayat',
    role: 'Founder & Head of Itineraries',
    origin: 'Jakarta, Indonesia',
    countries: 39,
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&q=80&auto=format&fit=crop',
    quote: '"A good trip changes the way you see the place you left."',
  },
  {
    name: 'Nadia Osei',
    role: 'Lead Destination Curator',
    origin: 'Accra, Ghana',
    countries: 52,
    photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&q=80&auto=format&fit=crop',
    quote: '"Every destination has a secret. We find it before you arrive."',
  },
  {
    name: 'Rafael Moreira',
    role: 'Local Experiences Director',
    origin: 'Lisbon, Portugal',
    countries: 31,
    photo: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=500&q=80&auto=format&fit=crop',
    quote: '"The best meal of your life is always in a place with no menu."',
  },
]

/* ── Values ── */
const VALUES = [
  {
    num: '01',
    title: 'Human-first planning',
    body: 'We never outsource the thinking. Every itinerary has a real person behind it who has read your notes, understood your pace, and made decisions with you in mind.',
  },
  {
    num: '02',
    title: 'Places before platforms',
    body: 'We go to the destination first. We eat, sleep, wander, get lost, and then — only then — we recommend. No review aggregators. No algorithm.',
  },
  {
    num: '03',
    title: 'Slow over speed',
    body: 'We believe fewer places done deeply is always better than many places done quickly. We actively push back against overstuffed itineraries.',
  },
]

export default function AboutPage() {
  const pageRef      = useRef<HTMLDivElement>(null)
  const heroRef      = useRef<HTMLDivElement>(null)
  const manifestoRef = useRef<HTMLDivElement>(null)
  const valuesRef    = useRef<HTMLDivElement>(null)
  const teamRef      = useRef<HTMLDivElement>(null)
  const ctaRef       = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── 1. Hero entrance — large text splits up ── */
      const heroEls = heroRef.current!.querySelectorAll('[data-h]')
      gsap.fromTo(heroEls,
        { opacity: 0, y: 70, clipPath: 'inset(0 0 100% 0)' },
        { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 1.2, ease: 'power4.out', stagger: 0.18, delay: 0.05 }
      )

      /* ── 2. Manifesto — horizontal line wipe ── */
      const lines = manifestoRef.current!.querySelectorAll('.manifesto-line')
      gsap.fromTo(lines,
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0, duration: 0.85, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: { trigger: manifestoRef.current, start: 'top 80%' },
        }
      )

      /* ── 3. Values — stagger from bottom ── */
      const vals = valuesRef.current!.querySelectorAll('.value-item')
      gsap.fromTo(vals,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.15,
          scrollTrigger: { trigger: valuesRef.current, start: 'top 78%' },
        }
      )

      /* ── 4. Value items — left border scale on scroll ── */
      vals.forEach((val) => {
        const bar = val.querySelector('.value-bar')
        if (!bar) return
        gsap.fromTo(bar,
          { scaleY: 0, transformOrigin: 'top' },
          {
            scaleY: 1, duration: 0.6, ease: 'power2.out',
            scrollTrigger: { trigger: val, start: 'top 82%' },
          }
        )
      })

      /* ── 5. Team cards stagger + photo parallax ── */
      const cards = teamRef.current!.querySelectorAll('.team-card')
      gsap.fromTo(cards,
        { opacity: 0, y: 60, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.85, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: { trigger: teamRef.current, start: 'top 82%' },
        }
      )

      cards.forEach((card) => {
        const img = card.querySelector<HTMLElement>('.team-img')
        if (!img) return
        gsap.fromTo(img,
          { y: '-6%' },
          {
            y: '6%', ease: 'none',
            scrollTrigger: {
              trigger: card, start: 'top bottom', end: 'bottom top', scrub: 0.6,
            },
          }
        )
      })

      /* ── 6. CTA reveal ── */
      gsap.fromTo(ctaRef.current,
        { opacity: 0, y: 44 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: ctaRef.current, start: 'top 88%' },
        }
      )

      /* ── 7. Hero parallax upward ── */
      gsap.to(heroRef.current, {
        y: -70, ease: 'none',
        scrollTrigger: {
          trigger: pageRef.current, start: 'top top', end: '35% top', scrub: 1.3,
        },
      })

    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef} className="min-h-screen" style={{ background: BG, color: INK, fontFamily: "'Inter', sans-serif" }}>

      {/* Nav */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[92%] sm:w-[85%] max-w-7xl z-50 flex items-center justify-between px-6 py-4 rounded-full liquid-glass transition-all duration-300">
        <Link to="/" className="flex items-center gap-2.5 group" style={{ color: MUTED }}>
          <ArrowLeft size={14} strokeWidth={2} className="group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="text-[10px] tracking-[0.18em] font-medium">WANDERFUL</span>
        </Link>
        <span className="text-[10px] tracking-[0.18em] font-medium" style={{ color: 'rgba(224,244,244,0.28)' }}>OUR STORY</span>
      </nav>

      {/* ── Hero ── */}
      <header ref={heroRef} className="min-h-[90vh] flex flex-col justify-end px-6 sm:px-12 pt-36 pb-16 max-w-7xl mx-auto">
        <p data-h className="text-[10px] tracking-[0.22em] font-medium mb-8" style={{ color: MUTED }}>
          06 — ABOUT
        </p>
        <SplitText data-h className="font-light leading-[0.9] tracking-[-0.04em]" style={{ fontSize: 'clamp(52px, 9vw, 140px)' }} trigger={false} delay={0.1}>
          We believe travel is listening.
        </SplitText>
        <p data-h className="mt-10 text-[15px] sm:text-[17px] leading-[1.85] max-w-[520px]" style={{ color: MUTED }}>
          Wanderful started because we got tired of the same itineraries, the same hotels, 
          the same experience repackaged in a different currency. We wanted something honest.
        </p>
      </header>

      {/* ── Manifesto strip ── */}
      <section ref={manifestoRef} className="border-t border-b px-6 sm:px-12 py-16 max-w-7xl mx-auto"
        style={{ borderColor: FAINT }}>
        {[
          'We go first.',
          'We ask more questions than we answer.',
          'We build for the traveller, not the sale.',
          'We believe the best places take time to earn.',
        ].map((line, i) => (
          <div key={i} className="manifesto-line flex items-baseline gap-6 py-5 border-b last:border-0"
            style={{ borderColor: FAINT }}>
            <span className="text-[10px] tracking-[0.18em] shrink-0 mt-1" style={{ color: MUTED }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <p className="font-light leading-tight tracking-[-0.025em]"
              style={{ fontSize: 'clamp(22px, 3.5vw, 52px)', color: i % 2 === 0 ? INK : 'rgba(224,244,244,0.35)' }}>
              {line}
            </p>
          </div>
        ))}
      </section>

      {/* ── Values ── */}
      <section ref={valuesRef} className="px-6 sm:px-12 py-20 max-w-7xl mx-auto">
        <p className="text-[10px] tracking-[0.22em] font-medium mb-14" style={{ color: MUTED }}>
          WHAT WE STAND FOR
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {VALUES.map((v) => (
            <div key={v.num} className="value-item relative pl-7 py-10 pr-8 rounded-2xl"
              style={{ background: FAINT }}>
              {/* Animated left bar */}
              <div className="value-bar absolute left-0 top-0 w-[2px] h-full rounded-full"
                style={{ background: ACCENT }} />
              <span className="text-[10px] tracking-[0.2em] font-medium mb-6 block" style={{ color: MUTED }}>
                {v.num}
              </span>
              <h3 className="font-light leading-[1.15] tracking-[-0.02em] mb-5"
                style={{ fontSize: 'clamp(20px, 2.2vw, 30px)' }}>
                {v.title}
              </h3>
              <p className="text-[14px] leading-[1.8]" style={{ color: MUTED }}>
                {v.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Team ── */}
      <section className="px-6 sm:px-12 pb-20 max-w-7xl mx-auto">
        <div className="border-t pt-14 mb-12" style={{ borderColor: FAINT }}>
          <p className="text-[10px] tracking-[0.22em] font-medium" style={{ color: MUTED }}>THE PEOPLE BEHIND THE TRIPS</p>
        </div>
        <div ref={teamRef} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {TEAM.map((person) => (
            <div key={person.name} className="team-card group rounded-2xl overflow-hidden flex flex-col"
              style={{ background: FAINT }}>
              {/* Photo */}
              <div className="relative overflow-hidden h-72">
                <img
                  className="team-img absolute inset-x-0 w-full object-cover object-top"
                  src={person.photo}
                  alt={person.name}
                  style={{ top: '-6%', height: '112%', willChange: 'transform' }}
                  loading="lazy"
                />
                <div className="absolute inset-0"
                  style={{ background: `linear-gradient(to bottom, transparent 50%, ${BG} 100%)` }} />
              </div>
              {/* Info */}
              <div className="px-7 pb-7 pt-2 flex flex-col gap-1.5">
                <h3 className="text-[17px] font-light tracking-[-0.01em]">{person.name}</h3>
                <p className="text-[11px] tracking-[0.06em]" style={{ color: ACCENT }}>{person.role}</p>
                <p className="text-[11px] mt-1" style={{ color: MUTED }}>{person.origin} · {person.countries} countries</p>
                <p className="text-[12px] leading-[1.7] mt-4 italic" style={{ color: 'rgba(224,244,244,0.5)', fontFamily: "'Instrument Serif', serif", fontSize: 14 }}>
                  {person.quote}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <div ref={ctaRef}
        className="mx-6 sm:mx-12 mb-20 rounded-2xl overflow-hidden relative"
        style={{ minHeight: 320 }}>
        <img
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1400&q=85&auto=format&fit=crop"
          alt="Traveller with map"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'rgba(6,148,148,0.75)' }} />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 px-10 sm:px-16 py-16">
          <div>
            <p className="font-light leading-[1.1] tracking-[-0.025em] mb-3"
              style={{ fontSize: 'clamp(24px, 3.5vw, 50px)', color: INK }}>
              Ready to travel with us?
            </p>
            <p className="text-[14px]" style={{ color: MUTED }}>
              Your first call is free. No pitch — just listening.
            </p>
          </div>
          <Link
            to="/journey"
            className="flex items-center gap-2.5 rounded-full px-8 py-4 text-[13px] font-medium tracking-[0.06em] transition-all duration-300 hover:scale-[1.03] whitespace-nowrap"
            style={{ fontFamily: "'Barlow', sans-serif", background: ACCENT, color: BG }}
          >
            See our trips <ArrowUpRight size={14} strokeWidth={2} />
          </Link>
        </div>
      </div>
    </div>
  )
}
