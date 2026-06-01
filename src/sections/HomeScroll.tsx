import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, Compass, MapPin, Sparkles, Route } from 'lucide-react'
import SplitText from '../components/SplitText'
import MagneticButton from '../components/MagneticButton'
import HorizontalScroll from '../components/HorizontalScroll'
import { prefersReducedMotion } from '../utils/motion'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────────────────── */
/*  Data                                                   */
/* ─────────────────────────────────────────────────────── */
const FEATURED = [
  { slug: 'amalfi-coast', name: 'Amalfi Coast', country: 'Italy',     photo: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=900&q=85&auto=format&fit=crop' },
  { slug: 'kyoto',        name: 'Kyoto',        country: 'Japan',     photo: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=900&q=85&auto=format&fit=crop' },
  { slug: 'marrakech',    name: 'Marrakech',    country: 'Morocco',   photo: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=900&q=85&auto=format&fit=crop' },
  { slug: 'patagonia',    name: 'Patagonia',    country: 'Argentina', photo: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=900&q=85&auto=format&fit=crop' },
  { slug: 'lisbon',       name: 'Lisbon',       country: 'Portugal',  photo: 'https://images.unsplash.com/photo-1513735492246-483525079686?w=900&q=85&auto=format&fit=crop' },
  { slug: 'bali',         name: 'Bali',         country: 'Indonesia', photo: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=900&q=85&auto=format&fit=crop' },
]

const STATS = [
  { to: 47,  suffix: '',   label: 'Countries' },
  { to: 200, suffix: '+',  label: 'Destinations' },
  { to: 6,   suffix: '',   label: 'Continents' },
  { to: 12,  suffix: 'k+', label: 'Trips planned' },
]

const STEPS = [
  { n: '01', icon: Compass,  title: 'Tell us your rhythm', desc: 'A short conversation about how you like to move, eat, rest and explore. No forms that feel like homework.' },
  { n: '02', icon: Route,    title: 'We design the route', desc: 'A travel designer shapes a day-by-day itinerary around you — pacing, places, and the gaps in between.' },
  { n: '03', icon: Sparkles, title: 'You just arrive',     desc: 'Bookings, transfers, reservations — handled. You show up; the trip already knows who you are.' },
]

const MARQUEE_WORDS = ['Wander', 'Explore', 'Drift', 'Discover', 'Escape', 'Roam']

/* ─────────────────────────────────────────────────────── */
/*  Intro / manifesto                                      */
/* ─────────────────────────────────────────────────────── */
function IntroSection() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current!.querySelectorAll('[data-r]'),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: { trigger: ref.current, start: 'top 80%' } })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="relative z-10 bg-[#060606] px-6 sm:px-12 py-28 sm:py-44">
      <div className="max-w-7xl mx-auto">
        <p data-r className="text-[10px] tracking-[0.24em] font-medium mb-10" style={{ color: '#FF8243' }}>
          01 — WHY WANDERFUL
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-12 lg:gap-20 items-end">
          <SplitText
            as="h2"
            className="font-light leading-[1.04] tracking-[-0.03em] text-white"
            style={{ fontSize: 'clamp(30px, 4.6vw, 76px)' }}
            stagger={0.012}
          >
            We don't sell trips. We design the feeling of arriving somewhere that already fits you.
          </SplitText>
          <p data-r className="text-[15px] sm:text-[16px] leading-[1.9] pb-2" style={{ color: 'rgba(240,237,232,0.5)' }}>
            Every itinerary is built by a real person who has walked the streets, eaten at the table, and learned where the light falls best at six in the morning.
          </p>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────── */
/*  Infinite marquee                                       */
/* ─────────────────────────────────────────────────────── */
function MarqueeSection() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, { xPercent: -50, repeat: -1, ease: 'none', duration: 22 })
    }, trackRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="relative z-10 bg-[#060606] py-10 sm:py-14 overflow-hidden border-y" style={{ borderColor: 'rgba(240,237,232,0.1)' }}>
      <div ref={trackRef} className="flex w-max">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center" aria-hidden={copy === 1}>
            {MARQUEE_WORDS.map((w, i) => (
              <span key={i} className="flex items-center">
                <span className="mx-6 sm:mx-10 font-light tracking-[-0.02em]" style={{ fontSize: 'clamp(34px, 6vw, 96px)', color: '#F0EDE8' }}>
                  {w}
                </span>
                <span className="inline-block rounded-full" style={{ width: 'clamp(7px,1vw,12px)', height: 'clamp(7px,1vw,12px)', background: '#FF8243' }} />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────── */
/*  Featured destinations (pinned horizontal scroll)       */
/* ─────────────────────────────────────────────────────── */
function FeaturedCard({ place }: { place: (typeof FEATURED)[0] }) {
  const imgRef = useRef<HTMLImageElement>(null)
  const onEnter = () => { if (imgRef.current) gsap.to(imgRef.current, { scale: 1.06, duration: 0.7, ease: 'power3.out' }) }
  const onLeave = () => { if (imgRef.current) gsap.to(imgRef.current, { scale: 1, duration: 0.7, ease: 'power3.out' }) }

  return (
    <Link
      to={`/destinations/${place.slug}`}
      className="group relative block overflow-hidden rounded-2xl h-[58vh] min-h-[400px]"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <img ref={imgRef} src={place.photo} alt={place.name}
        className="absolute inset-0 w-full h-full object-cover" style={{ willChange: 'transform' }} loading="lazy" />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(6,6,6,0.1) 0%, rgba(6,6,6,0) 35%, rgba(6,6,6,0.8) 100%)' }} />
      <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-9">
        <div className="flex items-center gap-2 mb-2" style={{ color: 'rgba(240,237,232,0.5)' }}>
          <MapPin size={11} strokeWidth={1.8} />
          <span className="text-[11px] tracking-[0.08em]">{place.country}</span>
        </div>
        <h3 className="font-light leading-tight tracking-[-0.02em] text-[#F0EDE8]" style={{ fontSize: 'clamp(26px, 3vw, 42px)' }}>
          {place.name}
        </h3>
        <div className="mt-4 flex items-center gap-2 text-[10px] font-medium tracking-[0.14em] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500" style={{ color: '#FF8243' }}>
          EXPLORE <ArrowUpRight size={11} strokeWidth={2} />
        </div>
      </div>
    </Link>
  )
}

function FeaturedSection() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current!.querySelectorAll('[data-r]'),
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: { trigger: ref.current, start: 'top 82%' } })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="relative z-10 bg-[#060606] pt-24 sm:pt-36 pb-10">
      <div className="px-6 sm:px-12 max-w-7xl mx-auto mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <p data-r className="text-[10px] tracking-[0.24em] font-medium mb-6" style={{ color: '#FF8243' }}>02 — FEATURED ATLAS</p>
          <h2 data-r className="font-light leading-[0.95] tracking-[-0.035em] text-white" style={{ fontSize: 'clamp(36px, 6vw, 92px)' }}>
            Places worth<br />the detour.
          </h2>
        </div>
        <Link data-r to="/destinations" className="group flex items-center gap-2 text-[12px] tracking-[0.12em] font-medium text-white/70 hover:text-white transition-colors">
          VIEW ALL DESTINATIONS
          <ArrowUpRight size={14} strokeWidth={2} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
        </Link>
      </div>

      <HorizontalScroll bgColor="#060606" panelClassName="w-[82vw] sm:w-[46vw] lg:w-[34vw] px-2.5 first:pl-6 sm:first:pl-12 last:pr-6 sm:last:pr-12">
        {FEATURED.map((p) => <FeaturedCard key={p.slug} place={p} />)}
      </HorizontalScroll>
    </section>
  )
}

/* ─────────────────────────────────────────────────────── */
/*  Stats with count-up                                    */
/* ─────────────────────────────────────────────────────── */
function Stat({ to, suffix, label }: { to: number; suffix: string; label: string }) {
  const numRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = numRef.current
    if (!el) return
    if (prefersReducedMotion()) { el.textContent = `${to}${suffix}`; return }
    const obj = { v: 0 }
    const st = ScrollTrigger.create({
      trigger: el, start: 'top 92%', once: true,
      onEnter: () => gsap.to(obj, {
        v: to, duration: 1.6, ease: 'power2.out',
        onUpdate: () => { el.textContent = `${Math.round(obj.v)}${suffix}` },
      }),
    })
    return () => st.kill()
  }, [to, suffix])

  return (
    <div className="stat-item flex flex-col gap-2">
      <span ref={numRef} className="font-light tracking-[-0.04em] tabular-nums text-white" style={{ fontSize: 'clamp(44px, 6vw, 92px)' }}>
        0{suffix}
      </span>
      <span className="text-[11px] tracking-[0.16em] font-medium" style={{ color: 'rgba(240,237,232,0.45)' }}>{label.toUpperCase()}</span>
    </div>
  )
}

function StatsSection() {
  return (
    <section className="relative z-10 bg-[#060606] px-6 sm:px-12 py-24 sm:py-32">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-y-14 gap-x-8 border-t pt-16" style={{ borderColor: 'rgba(240,237,232,0.1)' }}>
        {STATS.map((s) => <Stat key={s.label} to={s.to} suffix={s.suffix} label={s.label} />)}
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────── */
/*  How it works                                           */
/* ─────────────────────────────────────────────────────── */
function StepsSection() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current!.querySelectorAll('.step'),
        { opacity: 0, y: 56 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.14,
          scrollTrigger: { trigger: ref.current, start: 'top 78%' } })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section className="relative z-10 bg-[#0A0A0A] px-6 sm:px-12 py-28 sm:py-40">
      <div className="max-w-7xl mx-auto">
        <p className="text-[10px] tracking-[0.24em] font-medium mb-6" style={{ color: '#FF8243' }}>03 — HOW IT WORKS</p>
        <h2 className="font-light leading-[0.95] tracking-[-0.035em] text-white mb-16 sm:mb-24" style={{ fontSize: 'clamp(36px, 6vw, 92px)' }}>
          Three steps.<br />Zero spreadsheets.
        </h2>
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: 'rgba(240,237,232,0.1)' }}>
          {STEPS.map((s) => {
            const Icon = s.icon
            return (
              <div key={s.n} className="step bg-[#0A0A0A] p-8 sm:p-10 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <Icon size={26} strokeWidth={1.2} style={{ color: '#FF8243' }} />
                  <span className="text-[12px] font-light" style={{ color: 'rgba(240,237,232,0.3)' }}>{s.n}</span>
                </div>
                <h3 className="font-light tracking-[-0.02em] text-white" style={{ fontSize: 'clamp(22px, 2.4vw, 30px)' }}>{s.title}</h3>
                <p className="text-[14px] leading-[1.8]" style={{ color: 'rgba(240,237,232,0.5)' }}>{s.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────── */
/*  Big quote (mask reveal)                                */
/* ─────────────────────────────────────────────────────── */
function QuoteSection() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set(ref.current!.querySelectorAll('[data-q]'), { opacity: 1, clipPath: 'inset(0 0 0% 0)' })
        return
      }
      gsap.fromTo(ref.current!.querySelectorAll('[data-q]'),
        { opacity: 0, y: 30, clipPath: 'inset(0 0 100% 0)' },
        { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 1.1, ease: 'power4.out', stagger: 0.16,
          scrollTrigger: { trigger: ref.current, start: 'top 75%' } })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="relative z-10 bg-[#060606] px-6 sm:px-12 py-32 sm:py-48">
      <div className="max-w-5xl mx-auto text-center">
        <p data-q className="font-light italic leading-[1.2] tracking-[-0.01em]" style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(30px, 5vw, 78px)', color: '#F0EDE8' }}>
          “The best journeys answer questions
        </p>
        <p data-q className="font-light italic leading-[1.2] tracking-[-0.01em]" style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(30px, 5vw, 78px)', color: 'rgba(240,237,232,0.45)' }}>
          you didn't know you'd asked.”
        </p>
        <p data-q className="mt-10 text-[11px] tracking-[0.2em] font-medium" style={{ color: '#FF8243' }}>— THE WANDERFUL CREED</p>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────── */
/*  Final CTA                                              */
/* ─────────────────────────────────────────────────────── */
function CTASection() {
  return (
    <section className="relative z-10 bg-[#060606] px-6 sm:px-12 pb-28 sm:pb-40">
      <div className="max-w-7xl mx-auto rounded-3xl px-8 sm:px-20 py-20 sm:py-32 text-center" style={{ background: '#FF8243', color: '#1A0800' }}>
        <p className="text-[10px] tracking-[0.24em] font-medium mb-8" style={{ color: 'rgba(26,8,0,0.5)' }}>04 — YOUR MOVE</p>
        <SplitText as="h2" className="font-light leading-[0.92] tracking-[-0.04em]" style={{ fontSize: 'clamp(40px, 8vw, 130px)' }}>
          Your next escape
        </SplitText>
        <SplitText as="h2" className="font-light leading-[0.92] tracking-[-0.04em]" style={{ fontSize: 'clamp(40px, 8vw, 130px)', color: 'rgba(26,8,0,0.5)' }}>
          starts with hello.
        </SplitText>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton to="/contact" className="rounded-full px-9 py-4 text-[14px] font-medium tracking-[0.04em]" style={{ background: '#1A0800', color: '#FF8243', fontFamily: "'Barlow', sans-serif" }}>
            Start planning <ArrowUpRight size={15} strokeWidth={2} />
          </MagneticButton>
          <Link to="/journey" className="rounded-full px-9 py-4 text-[14px] font-medium tracking-[0.04em] transition-all duration-300 hover:gap-3 flex items-center gap-2" style={{ border: '1px solid rgba(26,8,0,0.3)', color: '#1A0800', fontFamily: "'Barlow', sans-serif" }}>
            Browse trips <ArrowUpRight size={15} strokeWidth={2} />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────── */
/*  Footer (with creator credits moved here)               */
/* ─────────────────────────────────────────────────────── */
const FOOTER_LINKS = [
  { label: 'Journey',      to: '/journey' },
  { label: 'Journal',      to: '/journal' },
  { label: 'Guidebook',    to: '/guidebook' },
  { label: 'Destinations', to: '/destinations' },
  { label: 'Experiences',  to: '/experiences' },
  { label: 'About',        to: '/about' },
  { label: 'Contact',      to: '/contact' },
]

function SiteFooter() {
  const toTop = () => {
    if (prefersReducedMotion()) window.scrollTo(0, 0)
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative z-10 bg-[#060606] border-t px-6 sm:px-12 pt-20 pb-10" style={{ borderColor: 'rgba(240,237,232,0.1)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between gap-14 mb-20">
          <div className="max-w-sm">
            <span className="text-white" style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.01em' }}>
              Wanderful<sup className="text-[10px] align-super ml-0.5 opacity-70">TM</sup>
            </span>
            <p className="mt-5 text-[14px] leading-[1.8]" style={{ color: 'rgba(240,237,232,0.45)' }}>
              Smart itineraries shaped around you — your rhythm, your vibe, your hunger for adventure.
            </p>
          </div>

          <nav className="grid grid-cols-2 sm:grid-cols-3 gap-x-12 gap-y-3">
            {FOOTER_LINKS.map((l) => (
              <Link key={l.to} to={l.to} className="group flex items-center gap-1.5 text-[14px] font-light text-white/60 hover:text-white transition-colors w-fit">
                {l.label}
                <ArrowUpRight size={12} strokeWidth={2} className="opacity-0 group-hover:opacity-60 transition-opacity" />
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t" style={{ borderColor: 'rgba(240,237,232,0.1)' }}>
          <div className="flex items-center gap-6">
            <a href="https://instagram.com/fhinz_anxiety" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-300">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              <span className="text-[11px] tracking-[0.1em] font-medium" style={{ fontFamily: "'Barlow', sans-serif" }}>@fhinz_anxiety</span>
            </a>
            <a href="https://github.com/Fhynn" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-300">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              <span className="text-[11px] tracking-[0.1em] font-medium" style={{ fontFamily: "'Barlow', sans-serif" }}>Fhynn</span>
            </a>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-[11px] tracking-[0.12em]" style={{ color: 'rgba(240,237,232,0.35)' }}>SECURE BY DESIGN. ALFHIN HIDAYAT.</span>
            <button onClick={toTop} className="text-[11px] tracking-[0.12em] font-medium text-white/50 hover:text-white transition-colors">BACK TO TOP ↑</button>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ─────────────────────────────────────────────────────── */
/*  Composed scroll content                                */
/* ─────────────────────────────────────────────────────── */
export default function HomeScroll() {
  return (
    <div className="relative z-10">
      <IntroSection />
      <MarqueeSection />
      <FeaturedSection />
      <StatsSection />
      <StepsSection />
      <QuoteSection />
      <CTASection />
      <SiteFooter />
    </div>
  )
}
