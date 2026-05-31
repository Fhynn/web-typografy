import { useEffect, useRef } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowLeft, ArrowUpRight, MapPin, Clock, Calendar, Star } from 'lucide-react'
import SplitText from '../components/SplitText'
import MagneticButton from '../components/MagneticButton'
import HorizontalScroll from '../components/HorizontalScroll'

gsap.registerPlugin(ScrollTrigger)

const BG = '#FF8243'
const INK = '#1A0800'
const MUTED = 'rgba(26,8,0,0.45)'
const FAINT = 'rgba(26,8,0,0.1)'

/* Full trip data */
const TRIPS: Record<string, {
  title: string; sub: string; duration: string; tag: string
  hero: string; heroAlt: string
  tagline: string; description: string; bestFor: string; season: string
  highlights: { title: string; desc: string; photo: string }[]
  gallery: string[]
  relatedExp: { title: string; slug: string }[]
}> = {
  'amalfi-drift': {
    title: 'Amalfi Drift', sub: 'Italy · Campania', duration: '7 nights', tag: 'Coastal',
    hero: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=1600&q=90&auto=format&fit=crop',
    heroAlt: 'Amalfi Coast at dusk',
    tagline: 'Where roads dissolve into the sea.',
    description: 'A week tracing the Amalfi coastline — not the tourist version, but the one locals keep for themselves. You start in Ravello, high above the noise, and work your way down through lemon groves, hidden coves, and fishing villages that haven\'t changed in a century. Every meal is planned by someone who lives here.',
    bestFor: 'Couples, slow travellers, food lovers',
    season: 'May – October',
    highlights: [
      { title: 'Ravello Sunset Terrace', desc: 'A private aperitivo on a cliffside terrace overlooking the coast. Just you, Aperol, and 180° of Mediterranean blue.', photo: 'https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?w=800&q=85&auto=format&fit=crop' },
      { title: 'Fishing with Locals', desc: 'Board a trabucco at 5am with a third-generation fisherman. You catch, he cooks. Lunch on the water.', photo: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=85&auto=format&fit=crop' },
      { title: 'Hidden Lemon Grove', desc: 'An estate producing limoncello since 1820. Walk the terraces, taste straight from the tree, and bring home a bottle they don\'t export.', photo: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=85&auto=format&fit=crop' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=700&q=85',
      'https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?w=700&q=85',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=700&q=85',
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=700&q=85',
    ],
    relatedExp: [
      { title: 'Dawn Kayaking', slug: 'dawn-kayaking' },
      { title: 'Fado in the Alfama', slug: 'fado-alfama' },
    ],
  },
  'kyoto-layers': {
    title: 'Kyoto Layers', sub: 'Japan · Kansai', duration: '5 nights', tag: 'Culture',
    hero: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1600&q=90&auto=format&fit=crop',
    heroAlt: 'Bamboo grove in Kyoto',
    tagline: 'Silence between the temples.',
    description: 'Five days in Kyoto, but not the Kyoto you\'ve googled. We take you to the temple that closes to the public, the teahouse with three tables, the garden designed for one viewer at a time. You\'ll eat kaiseki prepared by a chef who trained for 12 years before opening.',
    bestFor: 'Culture seekers, solo travellers',
    season: 'March – May, October – November',
    highlights: [
      { title: 'Private Temple Visit', desc: 'A 400-year-old zen temple opens its doors before sunrise — just for you. The head monk walks you through a meditation practice while moss gardens catch the first light.', photo: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=85&auto=format&fit=crop' },
      { title: 'Kaiseki Dinner', desc: 'Twelve courses, each a poem. A chef trained under Kikunoi prepares a meal that changes with what the mountain offered that morning.', photo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=85&auto=format&fit=crop' },
      { title: 'Bamboo at Dawn', desc: 'Arashiyama before anyone else. A local photographer takes you through paths tourists never find. You\'ll hear the bamboo creak in silence.', photo: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=85&auto=format&fit=crop' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=700&q=85',
      'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=700&q=85',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=700&q=85',
    ],
    relatedExp: [
      { title: 'Private Tea Ceremony', slug: 'tea-ceremony' },
    ],
  },
  'atlas-high': {
    title: 'Atlas High', sub: 'Morocco · Marrakech', duration: '6 nights', tag: 'Desert',
    hero: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=1600&q=90&auto=format&fit=crop',
    heroAlt: 'Moroccan medina',
    tagline: 'From medina to dune, nothing in between.',
    description: 'Morocco isn\'t one place — it\'s a hundred. You\'ll start in the sensory overload of Marrakech\'s medina, then vanish into the Atlas mountains for two nights in a Berber village, before ending under the stars in the Sahara. Every transfer, every guide, every meal — arranged.',
    bestFor: 'Adventurers, photographers, first-timers to Africa',
    season: 'September – May',
    highlights: [
      { title: 'Medina at Midnight', desc: 'A local historian walks you through Marrakech after the tourists leave. Lantern-lit alleys, secret riads, and the sound of the city winding down.', photo: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&q=85&auto=format&fit=crop' },
      { title: 'Berber Homestay', desc: 'Two nights with a family in the High Atlas. You cook together, hike to waterfalls, and learn why Moroccan hospitality is legendary.', photo: 'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=800&q=85&auto=format&fit=crop' },
      { title: 'Desert Stars', desc: 'A private camp in the Sahara. No electricity. Tagine by lantern, then a local astronomer points out constellations you\'ve never seen.', photo: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=85&auto=format&fit=crop' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=700&q=85',
      'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=700&q=85',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=700&q=85',
    ],
    relatedExp: [
      { title: 'Sahara Star Camp', slug: 'star-camp' },
    ],
  },
  'patagonia-edge': {
    title: 'Patagonia Edge', sub: 'Argentina · Tierra del Fuego', duration: '10 nights', tag: 'Wilderness',
    hero: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1600&q=90&auto=format&fit=crop',
    heroAlt: 'Patagonia mountains',
    tagline: 'Edge of the world, start of yourself.',
    description: 'Ten nights at the bottom of the earth. Glaciers, guanacos, and silence so complete it becomes its own sound. You trek with a glaciologist, ride with gauchos, and eat lamb cooked over open flame at an estancia that hasn\'t changed since the 1920s.',
    bestFor: 'Hikers, nature lovers, solitude seekers',
    season: 'November – March',
    highlights: [
      { title: 'Glacier Walk', desc: 'Crampons on, walking across Perito Moreno with a glaciologist. You hear 250-year-old ice cracking beneath your feet.', photo: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=85&auto=format&fit=crop' },
      { title: 'Gaucho Ride', desc: 'A full day on horseback with real gauchos. Asado lunch at an estancia, mate at sunset, and a story about what it means to live this far south.', photo: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=85&auto=format&fit=crop' },
      { title: 'Torres at Sunrise', desc: 'A 4am start for the classic Torres del Paine sunrise. Your guide knows the exact spot — no crowds, just the towers turning gold.', photo: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=85&auto=format&fit=crop' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=700&q=85',
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=700&q=85',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=700&q=85',
    ],
    relatedExp: [
      { title: 'Glacier Trek', slug: 'glacier-trek' },
    ],
  },
}

export default function TripDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const trip = slug ? TRIPS[slug] : null

  const heroRef     = useRef<HTMLDivElement>(null)
  const heroImgRef  = useRef<HTMLImageElement>(null)
  const detailsRef  = useRef<HTMLDivElement>(null)
  const ctaRef      = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!trip) return
    const ctx = gsap.context(() => {
      /* Hero image parallax */
      if (heroImgRef.current) {
        gsap.fromTo(heroImgRef.current,
          { y: '0%', scale: 1.15 },
          { y: '-15%', scale: 1, ease: 'none',
            scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 1.5 } })
      }

      /* Details stagger */
      if (detailsRef.current) {
        gsap.fromTo(detailsRef.current.querySelectorAll('[data-reveal]'),
          { opacity: 0, y: 44 },
          { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', stagger: 0.12,
            scrollTrigger: { trigger: detailsRef.current, start: 'top 80%' } })
      }

      /* CTA reveal */
      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: ctaRef.current, start: 'top 88%' } })
      }
    })
    return () => ctx.revert()
  }, [trip])

  if (!trip) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: BG, color: INK }}>
        <div className="text-center">
          <p className="text-[80px] font-light mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>404</p>
          <p className="text-[14px] mb-8" style={{ color: MUTED }}>This trip doesn't exist yet.</p>
          <button onClick={() => navigate('/journey')} className="text-[12px] tracking-[0.14em] font-medium underline" style={{ color: INK }}>
            ← Back to all trips
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ background: BG, color: INK, fontFamily: "'Inter', sans-serif" }}>

      {/* Nav */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[92%] sm:w-[85%] max-w-7xl z-50 flex items-center justify-between px-6 py-4 rounded-full liquid-glass transition-all duration-300">
        <Link to="/journey" className="flex items-center gap-2.5 group" style={{ color: 'rgba(26,8,0,0.55)' }}>
          <ArrowLeft size={14} strokeWidth={2} className="group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="text-[10px] tracking-[0.18em] font-medium">ALL TRIPS</span>
        </Link>
        <span className="text-[10px] tracking-[0.18em] font-medium" style={{ color: 'rgba(26,8,0,0.3)' }}>
          {trip.tag.toUpperCase()}
        </span>
      </nav>

      {/* ── Hero — full viewport image ── */}
      <div ref={heroRef} className="relative h-screen overflow-hidden">
        <img ref={heroImgRef} src={trip.hero} alt={trip.heroAlt}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ willChange: 'transform' }} />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(255,130,67,0.15) 0%, rgba(255,130,67,0) 40%, rgba(255,130,67,0.6) 80%, #FF8243 100%)' }} />

        {/* Hero text overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-12 pb-16 max-w-5xl">
          <span className="text-[10px] tracking-[0.22em] font-medium mb-5 block" style={{ color: MUTED }}>
            {trip.sub.toUpperCase()} — {trip.duration.toUpperCase()}
          </span>
          <SplitText
            className="font-light leading-[0.92] tracking-[-0.04em] mb-5"
            style={{ fontSize: 'clamp(48px, 8vw, 120px)' }}
            trigger={false}
            delay={0.3}
          >
            {trip.title}
          </SplitText>
          <p className="text-[16px] sm:text-[20px] leading-relaxed max-w-[500px] italic"
            style={{ fontFamily: "'Instrument Serif', serif", color: 'rgba(26,8,0,0.6)' }}>
            {trip.tagline}
          </p>
        </div>
      </div>

      {/* ── Details section ── */}
      <div ref={detailsRef} className="px-6 sm:px-12 py-20 max-w-5xl mx-auto">
        {/* Meta row */}
        <div data-reveal className="flex flex-wrap gap-8 mb-14 pb-14 border-b" style={{ borderColor: FAINT }}>
          <div className="flex items-center gap-2">
            <MapPin size={14} strokeWidth={1.5} style={{ color: MUTED }} />
            <div>
              <p className="text-[10px] tracking-[0.14em] font-medium" style={{ color: MUTED }}>DESTINATION</p>
              <p className="text-[14px] mt-1">{trip.sub}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={14} strokeWidth={1.5} style={{ color: MUTED }} />
            <div>
              <p className="text-[10px] tracking-[0.14em] font-medium" style={{ color: MUTED }}>DURATION</p>
              <p className="text-[14px] mt-1">{trip.duration}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={14} strokeWidth={1.5} style={{ color: MUTED }} />
            <div>
              <p className="text-[10px] tracking-[0.14em] font-medium" style={{ color: MUTED }}>BEST TIME</p>
              <p className="text-[14px] mt-1">{trip.season}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Star size={14} strokeWidth={1.5} style={{ color: MUTED }} />
            <div>
              <p className="text-[10px] tracking-[0.14em] font-medium" style={{ color: MUTED }}>BEST FOR</p>
              <p className="text-[14px] mt-1">{trip.bestFor}</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div data-reveal>
          <p className="text-[10px] tracking-[0.22em] font-medium mb-6" style={{ color: MUTED }}>THE ITINERARY</p>
          <p className="text-[16px] sm:text-[18px] leading-[1.9] max-w-[640px]" style={{ color: 'rgba(26,8,0,0.7)' }}>
            {trip.description}
          </p>
        </div>
      </div>

      {/* ── Highlights horizontal scroll ── */}
      <div className="mb-6 px-6 sm:px-12 max-w-5xl mx-auto">
        <p className="text-[10px] tracking-[0.22em] font-medium mb-4" style={{ color: MUTED }}>HIGHLIGHTS</p>
      </div>
      <HorizontalScroll
        bgColor={BG}
        panelClassName="w-[85vw] sm:w-[60vw] lg:w-[45vw] px-3 first:pl-6 sm:first:pl-12"
      >
        {trip.highlights.map((h, i) => (
          <div key={i} className="group rounded-2xl overflow-hidden h-[60vh] min-h-[400px] relative cursor-pointer">
            <img src={h.photo} alt={h.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(to bottom, transparent 30%, rgba(6,6,6,0.85) 100%)' }} />
            <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-10">
              <span className="text-[10px] tracking-[0.18em] font-medium block mb-3" style={{ color: 'rgba(240,237,232,0.4)' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-[22px] sm:text-[28px] font-light tracking-[-0.02em] mb-3 text-[#F0EDE8]">
                {h.title}
              </h3>
              <p className="text-[13px] leading-[1.8] max-w-[360px]" style={{ color: 'rgba(240,237,232,0.55)' }}>
                {h.desc}
              </p>
            </div>
          </div>
        ))}
      </HorizontalScroll>

      {/* ── Related experiences cross-links ── */}
      {trip.relatedExp.length > 0 && (
        <div className="px-6 sm:px-12 py-20 max-w-5xl mx-auto">
          <p className="text-[10px] tracking-[0.22em] font-medium mb-10" style={{ color: MUTED }}>RELATED EXPERIENCES</p>
          <div className="flex flex-wrap gap-3">
            {trip.relatedExp.map((exp) => (
              <Link key={exp.slug} to="/experiences"
                className="group flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-300 hover:gap-4"
                style={{ background: FAINT, border: `1px solid ${FAINT}` }}>
                <span className="text-[14px] font-light">{exp.title}</span>
                <ArrowUpRight size={13} strokeWidth={2} className="opacity-40 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
            <Link to="/gallery"
              className="group flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-300 hover:gap-4"
              style={{ background: FAINT, border: `1px solid ${FAINT}` }}>
              <span className="text-[14px] font-light">View Gallery</span>
              <ArrowUpRight size={13} strokeWidth={2} className="opacity-40 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>
        </div>
      )}

      {/* ── CTA ── */}
      <div ref={ctaRef}
        className="mx-6 sm:mx-12 mb-20 rounded-2xl px-8 sm:px-16 py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8"
        style={{ background: INK, color: BG }}>
        <div>
          <p className="font-light leading-[1.1] tracking-[-0.03em] mb-3" style={{ fontSize: 'clamp(24px, 3vw, 44px)' }}>
            Ready for {trip.title}?
          </p>
          <p className="text-[14px]" style={{ color: 'rgba(255,130,67,0.5)' }}>
            Your consultation is free. We'll build it around you.
          </p>
        </div>
        <MagneticButton to="/plan"
          className="rounded-full px-8 py-4 text-[13px] font-medium tracking-[0.06em]"
          style={{ background: BG, color: INK, fontFamily: "'Barlow', sans-serif" }}>
          Plan this trip <ArrowUpRight size={14} strokeWidth={2} />
        </MagneticButton>
      </div>
    </div>
  )
}
