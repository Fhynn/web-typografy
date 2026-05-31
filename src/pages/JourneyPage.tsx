import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowLeft, ArrowUpRight, MapPin, Clock } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const TRIPS = [
  {
    id: '01',
    slug: 'amalfi-drift',
    title: 'Amalfi Drift',
    sub: 'Italy · Campania',
    duration: '7 nights',
    tag: 'Coastal',
    photo: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=900&q=85&auto=format&fit=crop',
    photoAlt: 'Amalfi Coast cliffside villages at dusk',
  },
  {
    id: '02',
    slug: 'kyoto-layers',
    title: 'Kyoto Layers',
    sub: 'Japan · Kansai',
    duration: '5 nights',
    tag: 'Culture',
    photo: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=700&q=85&auto=format&fit=crop',
    photoAlt: 'Bamboo grove in Kyoto morning light',
  },
  {
    id: '03',
    slug: 'atlas-high',
    title: 'Atlas High',
    sub: 'Morocco · Marrakech',
    duration: '6 nights',
    tag: 'Desert',
    photo: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=700&q=85&auto=format&fit=crop',
    photoAlt: 'Moroccan medina blue door',
  },
  {
    id: '04',
    slug: 'patagonia-edge',
    title: 'Patagonia Edge',
    sub: 'Argentina · Tierra del Fuego',
    duration: '10 nights',
    tag: 'Wilderness',
    photo: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=900&q=85&auto=format&fit=crop',
    photoAlt: 'Patagonia mountains and glacier',
  },
]

export default function JourneyPage() {
  const pageRef    = useRef<HTMLDivElement>(null)
  const headerRef  = useRef<HTMLDivElement>(null)
  const gridRef    = useRef<HTMLDivElement>(null)
  const footerRef  = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── 1. Header entrance — stagger words up ─────── */
      gsap.fromTo(
        headerRef.current!.querySelectorAll('[data-h]'),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.14, delay: 0.1 }
      )

      /* ── 2. Cards entrance — stagger in from below ─── */
      const cards = gridRef.current!.querySelectorAll<HTMLElement>('.jcard')
      gsap.fromTo(
        cards,
        { opacity: 0, y: 72 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 88%',
          },
        }
      )

      /* ── 3. Photo parallax — each card photo moves slower than scroll ── */
      cards.forEach((card) => {
        const img = card.querySelector<HTMLImageElement>('img')
        if (!img) return
        gsap.fromTo(img,
          { y: '-8%' },
          {
            y: '8%',
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          }
        )
      })

      /* ── 4. Header title subtle upward parallax on scroll ── */
      gsap.to(headerRef.current, {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })

      /* ── 5. Footer fade in ─────────────────────────── */
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: footerRef.current, start: 'top 95%' },
        }
      )
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef} className="min-h-screen" style={{ fontFamily: "'Inter', sans-serif", background: '#FF8243', color: '#1A0800' }}>

      {/* ── Nav ─── */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[92%] sm:w-[85%] max-w-7xl z-50 flex items-center justify-between px-6 py-4 rounded-full liquid-glass transition-all duration-300">
        <Link to="/" className="flex items-center gap-2.5 group" style={{ color: 'rgba(26,8,0,0.55)' }}>
          <ArrowLeft size={14} strokeWidth={2} className="group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="text-[10px] tracking-[0.18em] font-medium">WANDERFUL</span>
        </Link>
        <span className="text-[10px] tracking-[0.18em] font-medium" style={{ color: 'rgba(26,8,0,0.35)' }}>
          THE COLLECTION
        </span>
      </nav>

      {/* ── Header ─── */}
      <header ref={headerRef} className="pt-32 sm:pt-40 pb-14 px-6 sm:px-12 max-w-7xl mx-auto">
        <p data-h className="text-[10px] tracking-[0.22em] font-medium mb-7" style={{ color: 'rgba(26,8,0,0.4)' }}>
          01 — JOURNEY
        </p>
        <h1 className="font-light leading-[0.95] tracking-[-0.035em]" style={{ fontSize: 'clamp(42px, 6.5vw, 96px)' }}>
          <span data-h className="block">Where will your</span>
          <span data-h className="block" style={{ color: 'rgba(26,8,0,0.35)' }}>instinct take&nbsp;you?</span>
        </h1>
      </header>

      {/* ── Grid ─── */}
      <main ref={gridRef} className="px-6 sm:px-12 pb-32 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
          <TripCard trip={TRIPS[0]} className="md:col-span-2 h-[420px] sm:h-[560px]" />
          <TripCard trip={TRIPS[1]} className="md:col-span-1 h-[260px] sm:h-[560px]" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <TripCard trip={TRIPS[2]} className="md:col-span-1 h-[260px] sm:h-[480px]" />
          <TripCard trip={TRIPS[3]} className="md:col-span-2 h-[360px] sm:h-[480px]" />
        </div>
      </main>

      {/* ── Footer ─── */}
      <footer
        ref={footerRef}
        className="border-t px-6 sm:px-12 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 opacity-0"
        style={{ borderColor: 'rgba(26,8,0,0.15)' }}
      >
        <p className="text-[13px]" style={{ color: 'rgba(26,8,0,0.45)' }}>
          All itineraries are built personally for you — no templates, no repeats.
        </p>
        <div className="flex items-center gap-4">
          <Link to="/destinations" className="flex items-center gap-2 text-[12px] font-medium tracking-[0.1em] hover:gap-3 transition-all duration-300" style={{ color: '#1A0800' }}>
            DESTINATIONS <ArrowUpRight size={13} strokeWidth={2} />
          </Link>
          <Link to="/experiences" className="flex items-center gap-2 text-[12px] font-medium tracking-[0.1em] hover:gap-3 transition-all duration-300" style={{ color: '#1A0800' }}>
            EXPERIENCES <ArrowUpRight size={13} strokeWidth={2} />
          </Link>
          <Link to="/plan" className="flex items-center gap-2 text-[12px] font-medium tracking-[0.1em] hover:gap-3 transition-all duration-300" style={{ color: '#1A0800' }}>
            PLAN MY ESCAPE <ArrowUpRight size={13} strokeWidth={2} />
          </Link>
        </div>
      </footer>
    </div>
  )
}

/* ── TripCard ─────────────────────────────────────────── */
function TripCard({ trip, className = '' }: { trip: (typeof TRIPS)[0]; className?: string }) {
  const cardRef = useRef<HTMLAnchorElement>(null)

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = cardRef.current
    if (!el) return
    const { left, top, width, height } = el.getBoundingClientRect()
    const x = ((e.clientX - left) / width - 0.5) * 10
    const y = ((e.clientY - top) / height - 0.5) * -10
    gsap.to(el, { rotateX: y, rotateY: x, duration: 0.4, ease: 'power2.out', transformPerspective: 900 })
  }

  const handleLeave = () => {
    if (cardRef.current) gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power3.out' })
  }

  return (
    <Link
      ref={cardRef}
      to={`/journey/${trip.slug}`}
      className={`jcard group relative overflow-hidden rounded-xl cursor-pointer opacity-0 block ${className}`}
      style={{ background: 'rgba(26,8,0,0.12)', willChange: 'transform' }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {/* Photo — given extra height so parallax has room */}
      <img
        src={trip.photo}
        alt={trip.photoAlt}
        className="absolute inset-x-0 w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        style={{ top: '-8%', height: '116%', willChange: 'transform' }}
        loading="lazy"
      />

      {/* Scrim */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, rgba(6,6,6,0.12) 0%, rgba(6,6,6,0.0) 30%, rgba(6,6,6,0.72) 72%, rgba(6,6,6,0.97) 100%)' }}
      />

      {/* Tag */}
      <div className="absolute top-5 left-5 z-10">
        <span className="text-[9px] font-semibold tracking-[0.22em] px-3 py-1.5 rounded-full"
          style={{ background: 'rgba(240,237,232,0.1)', backdropFilter: 'blur(8px)', color: 'rgba(240,237,232,0.8)', border: '1px solid rgba(240,237,232,0.12)' }}>
          {trip.tag.toUpperCase()}
        </span>
      </div>
      <div className="absolute top-5 right-5 z-10 text-[11px] font-light" style={{ color: 'rgba(240,237,232,0.35)' }}>
        {trip.id}
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-5 sm:p-7">
        <h2 className="font-light leading-tight tracking-[-0.02em] mb-2 text-[#F0EDE8]" style={{ fontSize: 'clamp(22px, 2.8vw, 36px)' }}>
          {trip.title}
        </h2>
        <div className="flex items-center gap-4 text-[11px]" style={{ color: 'rgba(240,237,232,0.45)' }}>
          <span className="flex items-center gap-1.5"><MapPin size={10} strokeWidth={1.8} />{trip.sub}</span>
          <span className="flex items-center gap-1.5"><Clock size={10} strokeWidth={1.8} />{trip.duration}</span>
        </div>
        <div className="mt-4 flex items-center gap-2 text-[11px] font-medium tracking-[0.1em] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500" style={{ color: '#F0EDE8' }}>
          EXPLORE TRIP <ArrowUpRight size={12} strokeWidth={2} />
        </div>
      </div>
    </Link>
  )
}
