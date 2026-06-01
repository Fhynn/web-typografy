import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowLeft, ArrowUpRight, MapPin } from 'lucide-react'
import SplitText from '../components/SplitText'

gsap.registerPlugin(ScrollTrigger)

/* ── Palette ── */
const BG    = '#E8D5B7'
const INK   = '#1A1208'
const MUTED = 'rgba(26,18,8,0.4)'
const FAINT = 'rgba(26,18,8,0.12)'

const PLACES = [
  {
    id: '01',
    slug: 'amalfi-coast',
    name: 'Amalfi Coast',
    country: 'Italy',
    region: 'Mediterranean',
    tagline: 'Where roads dissolve into the sea',
    photo: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=900&q=85&auto=format&fit=crop',
    size: 'large', // large card
  },
  {
    id: '02',
    slug: 'kyoto',
    name: 'Kyoto',
    country: 'Japan',
    region: 'East Asia',
    tagline: 'Temples wrapped in morning silence',
    photo: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=700&q=85&auto=format&fit=crop',
    size: 'small',
  },
  {
    id: '03',
    slug: 'marrakech',
    name: 'Marrakech',
    country: 'Morocco',
    region: 'North Africa',
    tagline: 'A city that breathes colour',
    photo: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=700&q=85&auto=format&fit=crop',
    size: 'small',
  },
  {
    id: '04',
    slug: 'patagonia',
    name: 'Patagonia',
    country: 'Argentina',
    region: 'South America',
    tagline: 'Edge of the world, start of yourself',
    photo: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=900&q=85&auto=format&fit=crop',
    size: 'large',
  },
  {
    id: '05',
    slug: 'lisbon',
    name: 'Lisbon',
    country: 'Portugal',
    region: 'Atlantic Europe',
    tagline: 'Cobblestones remember everything',
    photo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=85&auto=format&fit=crop',
    size: 'small',
  },
  {
    id: '06',
    slug: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    region: 'Southeast Asia',
    tagline: 'Where ritual is the rhythm of the day',
    photo: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=700&q=85&auto=format&fit=crop',
    size: 'small',
  },
]

/* ── Stats ── */
const STATS = [
  { value: '47', label: 'Countries' },
  { value: '200+', label: 'Destinations' },
  { value: '6', label: 'Continents' },
  { value: '12k+', label: 'Trips planned' },
]

export default function DestinationsPage() {
  const pageRef   = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const statsRef  = useRef<HTMLDivElement>(null)
  const gridRef   = useRef<HTMLDivElement>(null)
  const ctaRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── 1. Header — clip-path mask reveal ── */
      const headEls = headerRef.current!.querySelectorAll('[data-h]')
      gsap.fromTo(headEls,
        { opacity: 0, y: 56, clipPath: 'inset(0 0 100% 0)' },
        { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 1.1, ease: 'power4.out', stagger: 0.14, delay: 0.05 }
      )

      /* ── 2. Stats counter roll-up ── */
      const statEls = statsRef.current!.querySelectorAll('.stat-item')
      gsap.fromTo(statEls,
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: { trigger: statsRef.current, start: 'top 85%' },
        }
      )

      /* ── 3. Grid cards stagger ── */
      const cards = gridRef.current!.querySelectorAll('.dest-card')
      gsap.fromTo(cards,
        { opacity: 0, y: 72, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out', stagger: 0.08,
          scrollTrigger: { trigger: gridRef.current, start: 'top 82%' },
        }
      )

      /* ── 4. Photo parallax inside each card ── */
      cards.forEach((card) => {
        const img = card.querySelector<HTMLElement>('img')
        if (!img) return
        gsap.fromTo(img,
          { y: '-8%' },
          {
            y: '8%', ease: 'none',
            scrollTrigger: {
              trigger: card, start: 'top bottom', end: 'bottom top', scrub: 0.7,
            },
          }
        )
      })

      /* ── 5. Header parallax upward ── */
      gsap.to(headerRef.current, {
        y: -60, ease: 'none',
        scrollTrigger: {
          trigger: pageRef.current, start: 'top top', end: '30% top', scrub: 1.2,
        },
      })

      /* ── 6. CTA reveal ── */
      gsap.fromTo(ctaRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: ctaRef.current, start: 'top 88%' },
        }
      )

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
        <span className="text-[10px] tracking-[0.18em] font-medium" style={{ color: 'rgba(26,18,8,0.3)' }}>THE ATLAS</span>
      </nav>

      {/* ── Header ── */}
      <header ref={headerRef} className="pt-32 sm:pt-44 pb-16 px-6 sm:px-12 max-w-7xl mx-auto">
        <p data-h className="text-[10px] tracking-[0.22em] font-medium mb-7" style={{ color: MUTED }}>
          05 — DESTINATIONS
        </p>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8">
          <SplitText data-h className="font-light leading-[0.93] tracking-[-0.035em]" style={{ fontSize: 'clamp(44px, 7vw, 110px)' }} trigger={false} delay={0.1}>
            The Atlas.
          </SplitText>
          <p data-h className="text-[15px] leading-[1.8] max-w-[340px] sm:text-right pb-2" style={{ color: MUTED }}>
            Every place we send people to has been walked, eaten in, and slept in by someone on our team first.
          </p>
        </div>
      </header>

      {/* ── Stats strip ── */}
      <div ref={statsRef} className="border-t border-b px-6 sm:px-12 py-10 max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8"
        style={{ borderColor: FAINT }}>
        {STATS.map((s) => (
          <div key={s.label} className="stat-item flex flex-col gap-1">
            <span className="font-light tracking-[-0.04em]" style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>{s.value}</span>
            <span className="text-[11px] tracking-[0.14em] font-medium" style={{ color: MUTED }}>{s.label.toUpperCase()}</span>
          </div>
        ))}
      </div>

      {/* ── Destination Grid ── */}
      <main ref={gridRef} className="px-6 sm:px-12 py-12 max-w-7xl mx-auto">

        {/* Row 1: large + small */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
          <DestCard place={PLACES[0]} className="md:col-span-2 h-[480px] sm:h-[600px]" />
          <DestCard place={PLACES[1]} className="md:col-span-1 h-[280px] sm:h-[600px]" />
        </div>

        {/* Row 2: small + large */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
          <DestCard place={PLACES[2]} className="md:col-span-1 h-[280px] sm:h-[520px]" />
          <DestCard place={PLACES[3]} className="md:col-span-2 h-[420px] sm:h-[520px]" />
        </div>

        {/* Row 3: equal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <DestCard place={PLACES[4]} className="h-[320px] sm:h-[440px]" />
          <DestCard place={PLACES[5]} className="h-[320px] sm:h-[440px]" />
        </div>
      </main>

      {/* ── CTA ── */}
      <div ref={ctaRef}
        className="mx-6 sm:mx-12 mb-20 rounded-2xl px-8 sm:px-16 py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8"
        style={{ background: INK, color: BG }}>
        <div>
          <p className="font-light leading-[1.1] tracking-[-0.03em] mb-3" style={{ fontSize: 'clamp(26px, 3.5vw, 50px)' }}>
            Don't see your dream destination?
          </p>
          <p className="text-[14px] leading-relaxed" style={{ color: 'rgba(232,213,183,0.5)' }}>
            We plan to places that don't appear in listicles.
          </p>
        </div>
        <Link
          to="/journey"
          className="flex items-center gap-2.5 rounded-full px-8 py-4 text-[13px] font-medium tracking-[0.06em] transition-all duration-300 hover:scale-[1.03] whitespace-nowrap"
          style={{ fontFamily: "'Barlow', sans-serif", background: BG, color: INK }}
        >
          Browse trips <ArrowUpRight size={14} strokeWidth={2} />
        </Link>
      </div>
    </div>
  )
}

/* ── DestCard ── */
function DestCard({ place, className = '' }: { place: typeof PLACES[0]; className?: string }) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  const imgRef  = useRef<HTMLImageElement>(null)

  /* Hover tilt micro-interaction */
  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = cardRef.current
    if (!el) return
    const { left, top, width, height } = el.getBoundingClientRect()
    const x = ((e.clientX - left) / width - 0.5) * 8
    const y = ((e.clientY - top) / height - 0.5) * -8
    gsap.to(el, { rotateX: y, rotateY: x, duration: 0.4, ease: 'power2.out', transformPerspective: 800 })
  }
  // GSAP-driven zoom so it composes with the parallax 'y' instead of being
  // overwritten by GSAP's inline transform (a CSS hover class would be).
  const handleEnter = () => {
    if (imgRef.current) gsap.to(imgRef.current, { scale: 1.05, duration: 0.7, ease: 'power3.out' })
  }
  const handleLeave = () => {
    if (cardRef.current)
      gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power3.out' })
    if (imgRef.current) gsap.to(imgRef.current, { scale: 1, duration: 0.7, ease: 'power3.out' })
  }

  return (
    <Link
      to={`/destinations/${place.slug}`}
      ref={cardRef}
      className={`dest-card group relative block overflow-hidden rounded-2xl cursor-pointer opacity-0 ${className}`}
      style={{ background: 'rgba(26,18,8,0.08)', willChange: 'transform' }}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <img
        ref={imgRef}
        src={place.photo}
        alt={place.name}
        className="absolute inset-x-0 w-full object-cover"
        style={{ top: '-8%', height: '116%', willChange: 'transform' }}
        loading="lazy"
      />
      {/* Scrim */}
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, rgba(6,6,6,0.06) 0%, rgba(6,6,6,0) 30%, rgba(6,6,6,0.65) 68%, rgba(6,6,6,0.95) 100%)' }}
      />

      {/* Region badge */}
      <div className="absolute top-5 left-5 z-10">
        <span className="text-[9px] font-semibold tracking-[0.2em] px-3 py-1.5 rounded-full"
          style={{ background: 'rgba(240,237,232,0.1)', backdropFilter: 'blur(8px)', color: 'rgba(240,237,232,0.8)', border: '1px solid rgba(240,237,232,0.14)' }}>
          {place.region.toUpperCase()}
        </span>
      </div>
      <div className="absolute top-5 right-5 z-10 text-[11px] font-light" style={{ color: 'rgba(240,237,232,0.3)' }}>
        {place.id}
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-5 sm:p-7">
        <div className="flex items-center gap-2 mb-2" style={{ color: 'rgba(240,237,232,0.45)' }}>
          <MapPin size={10} strokeWidth={1.8} />
          <span className="text-[11px] tracking-[0.06em]">{place.country}</span>
        </div>
        <h2 className="font-light leading-tight tracking-[-0.02em] mb-1.5 text-[#F0EDE8]" style={{ fontSize: 'clamp(20px, 2.5vw, 34px)' }}>
          {place.name}
        </h2>
        <p className="text-[12px] leading-snug max-w-[300px]" style={{ color: 'rgba(240,237,232,0.45)' }}>
          {place.tagline}
        </p>
        <div className="mt-4 flex items-center gap-2 text-[10px] font-medium tracking-[0.12em] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500"
          style={{ color: '#F0EDE8' }}>
          EXPLORE <ArrowUpRight size={10} strokeWidth={2} />
        </div>
      </div>
    </Link>
  )
}
