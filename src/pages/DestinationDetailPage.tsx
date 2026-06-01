import { useEffect, useRef } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowLeft, ArrowUpRight, MapPin, Globe2, Compass } from 'lucide-react'
import SplitText from '../components/SplitText'
import MagneticButton from '../components/MagneticButton'
import HorizontalScroll from '../components/HorizontalScroll'

gsap.registerPlugin(ScrollTrigger)

type Place = {
  name: string; country: string; region: string; theme: string; ink: string
  hero: string; tagline: string; intro: string
  whenToGo: string; goodFor: string; language: string
  knownFor: { title: string; desc: string; photo: string }[]
  relatedTrip: { title: string; slug: string } | null
}

/* ── Destination data, keyed by slug (matches DestinationsPage cards) ── */
const DESTINATIONS: Record<string, Place> = {
  'amalfi-coast': {
    name: 'Amalfi Coast', country: 'Italy', region: 'Mediterranean',
    theme: '#FF8243', ink: '#1A0800',
    hero: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=1600&q=90&auto=format&fit=crop',
    tagline: 'Where roads dissolve into the sea.',
    intro: 'Thirteen villages stitched into a vertical coastline, each one a different shade of lemon and terracotta. The Amalfi Coast rewards the slow traveller — those who linger over an espresso while the boats come in, who take the staircase instead of the road, who eat where the menu is only spoken.',
    whenToGo: 'May – October', goodFor: 'Couples · Food lovers', language: 'Italian',
    knownFor: [
      { title: 'Cliffside terraces', desc: 'Lemon groves carved into near-vertical hillsides, tended by hand for five centuries.', photo: 'https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?w=800&q=85&auto=format&fit=crop' },
      { title: 'Hidden coves', desc: 'Pebble beaches reachable only by boat, where the water turns an impossible blue at noon.', photo: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=85&auto=format&fit=crop' },
      { title: 'Limoncello estates', desc: 'Family producers pressing the same Sfusato lemons their grandparents grew.', photo: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=85&auto=format&fit=crop' },
    ],
    relatedTrip: { title: 'Amalfi Drift — 7 nights', slug: 'amalfi-drift' },
  },
  'kyoto': {
    name: 'Kyoto', country: 'Japan', region: 'East Asia',
    theme: '#069494', ink: '#04201F',
    hero: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1600&q=90&auto=format&fit=crop',
    tagline: 'Temples wrapped in morning silence.',
    intro: 'For a thousand years Kyoto was the capital, and it still moves at the pace of ceremony. Two thousand temples, a geisha district that closes to outsiders, and a cuisine built around what the season just offered. The trick is to arrive before the day does — the city belongs to whoever wakes first.',
    whenToGo: 'Mar – May · Oct – Nov', goodFor: 'Culture · Solo travellers', language: 'Japanese',
    knownFor: [
      { title: 'Zen gardens', desc: 'Raked gravel and moss designed to be read like a poem, one viewer at a time.', photo: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=85&auto=format&fit=crop' },
      { title: 'Kaiseki dining', desc: 'Twelve seasonal courses from chefs who trained over a decade before opening.', photo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=85&auto=format&fit=crop' },
      { title: 'Bamboo at dawn', desc: 'Arashiyama before the crowds, when you can actually hear the stalks creak.', photo: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=85&auto=format&fit=crop' },
    ],
    relatedTrip: { title: 'Kyoto Layers — 5 nights', slug: 'kyoto-layers' },
  },
  'marrakech': {
    name: 'Marrakech', country: 'Morocco', region: 'North Africa',
    theme: '#E8975A', ink: '#2A1505',
    hero: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=1600&q=90&auto=format&fit=crop',
    tagline: 'A city that breathes colour.',
    intro: 'The Red City is sensory overload by design — a medina that loops back on itself, souks that change their mind every fifty metres, and a main square that becomes a different city at dusk. Beyond the walls, the Atlas mountains and the desert wait, an hour and a world away.',
    whenToGo: 'Sep – May', goodFor: 'Adventurers · Photographers', language: 'Arabic · French',
    knownFor: [
      { title: 'The medina', desc: 'A UNESCO labyrinth of riads, lanterns and craftsmen working as they have for centuries.', photo: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&q=85&auto=format&fit=crop' },
      { title: 'Atlas villages', desc: 'Berber hamlets in the high mountains where hospitality is a way of life.', photo: 'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=800&q=85&auto=format&fit=crop' },
      { title: 'Desert nights', desc: 'Private camps in the Sahara — tagine by lantern, then a sky with no edges.', photo: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=85&auto=format&fit=crop' },
    ],
    relatedTrip: { title: 'Atlas High — 6 nights', slug: 'atlas-high' },
  },
  'patagonia': {
    name: 'Patagonia', country: 'Argentina', region: 'South America',
    theme: '#5C7A99', ink: '#0B1620',
    hero: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1600&q=90&auto=format&fit=crop',
    tagline: 'Edge of the world, start of yourself.',
    intro: 'At the bottom of the Americas the map runs out and the wind takes over. Patagonia is glaciers that calve like thunder, granite towers that turn gold at dawn, and a silence so total it becomes its own sound. You come for the landscape and leave having met yourself.',
    whenToGo: 'Nov – March', goodFor: 'Hikers · Solitude seekers', language: 'Spanish',
    knownFor: [
      { title: 'Glacier fields', desc: 'Walking on 250-year-old ice with a glaciologist who reads it like a book.', photo: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=85&auto=format&fit=crop' },
      { title: 'Estancia life', desc: 'A day on horseback with gauchos, asado lunch, mate at a sunset that lasts hours.', photo: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=85&auto=format&fit=crop' },
      { title: 'Torres at sunrise', desc: 'The classic Torres del Paine dawn — no crowds, just the towers catching fire.', photo: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=85&auto=format&fit=crop' },
    ],
    relatedTrip: { title: 'Patagonia Edge — 10 nights', slug: 'patagonia-edge' },
  },
  'lisbon': {
    name: 'Lisbon', country: 'Portugal', region: 'Atlantic Europe',
    theme: '#D98E73', ink: '#2A130C',
    hero: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=90&auto=format&fit=crop',
    tagline: 'Cobblestones remember everything.',
    intro: 'Built on seven hills above the Tagus, Lisbon is a city of viewpoints, yellow trams and tiled façades fading beautifully in the salt air. It is melancholic and warm at once — the word the Portuguese use is saudade, and you feel it most when the fado starts in a tiny Alfama bar.',
    whenToGo: 'Mar – Jun · Sep – Oct', goodFor: 'City wanderers · Music lovers', language: 'Portuguese',
    knownFor: [
      { title: 'Alfama lanes', desc: 'The oldest quarter — laundry lines, azulejo tiles and fado drifting from doorways.', photo: 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=800&q=85&auto=format&fit=crop' },
      { title: 'Miradouros', desc: 'Terraced viewpoints where the whole city tumbles down to the river below.', photo: 'https://images.unsplash.com/photo-1513735492246-483525079686?w=800&q=85&auto=format&fit=crop' },
      { title: 'Pastéis & coffee', desc: 'Warm custard tarts dusted with cinnamon, eaten standing at a marble counter.', photo: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=85&auto=format&fit=crop' },
    ],
    relatedTrip: null,
  },
  'bali': {
    name: 'Bali', country: 'Indonesia', region: 'Southeast Asia',
    theme: '#5E8C61', ink: '#0E1F10',
    hero: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1600&q=90&auto=format&fit=crop',
    tagline: 'Where ritual is the rhythm of the day.',
    intro: 'On Bali, the sacred and the everyday share the same street. Offerings appear on doorsteps at dawn, rice terraces step down the hillsides like green staircases, and the whole island seems to exhale at sunset. Move inland from the beaches and you find the Bali that the Balinese keep for themselves.',
    whenToGo: 'Apr – Oct', goodFor: 'Slow travellers · Surfers', language: 'Indonesian · Balinese',
    knownFor: [
      { title: 'Rice terraces', desc: 'Centuries-old subak irrigation carving the hills into shimmering green steps.', photo: 'https://images.unsplash.com/photo-1531592937781-344ad608fabf?w=800&q=85&auto=format&fit=crop' },
      { title: 'Temple ritual', desc: 'Water temples and cliffside shrines where daily ceremony is simply life.', photo: 'https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800&q=85&auto=format&fit=crop' },
      { title: 'Ubud jungle', desc: 'Mornings in the mist above the Ayung river, far from the southern beaches.', photo: 'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?w=800&q=85&auto=format&fit=crop' },
    ],
    relatedTrip: null,
  },
}

export default function DestinationDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const place = slug ? DESTINATIONS[slug] : null

  const heroRef    = useRef<HTMLDivElement>(null)
  const heroImgRef = useRef<HTMLImageElement>(null)
  const detailsRef = useRef<HTMLDivElement>(null)
  const ctaRef     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!place) return
    const ctx = gsap.context(() => {
      if (heroImgRef.current) {
        gsap.fromTo(heroImgRef.current,
          { y: '0%', scale: 1.15 },
          { y: '-15%', scale: 1, ease: 'none',
            scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 1.5 } })
      }
      if (detailsRef.current) {
        gsap.fromTo(detailsRef.current.querySelectorAll('[data-reveal]'),
          { opacity: 0, y: 44 },
          { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', stagger: 0.12,
            scrollTrigger: { trigger: detailsRef.current, start: 'top 80%' } })
      }
      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: ctaRef.current, start: 'top 88%' } })
      }
    })
    return () => ctx.revert()
  }, [place])

  if (!place) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#E8D5B7', color: '#1A1208' }}>
        <div className="text-center">
          <p className="text-[80px] font-light mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>404</p>
          <p className="text-[14px] mb-8" style={{ color: 'rgba(26,18,8,0.4)' }}>We don't map that place yet.</p>
          <button onClick={() => navigate('/destinations')} className="text-[12px] tracking-[0.14em] font-medium underline" style={{ color: '#1A1208' }}>
            ← Back to the Atlas
          </button>
        </div>
      </div>
    )
  }

  const BG = place.theme
  const INK = place.ink
  const MUTED = `${hexToRgba(INK, 0.5)}`
  const FAINT = `${hexToRgba(INK, 0.12)}`

  return (
    <div className="min-h-screen" style={{ background: BG, color: INK, fontFamily: "'Inter', sans-serif" }}>

      {/* Nav */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[92%] sm:w-[85%] max-w-7xl z-50 flex items-center justify-between px-6 py-4 rounded-full liquid-glass transition-all duration-300">
        <Link to="/destinations" className="flex items-center gap-2.5 group" style={{ color: MUTED }}>
          <ArrowLeft size={14} strokeWidth={2} className="group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="text-[10px] tracking-[0.18em] font-medium">THE ATLAS</span>
        </Link>
        <span className="text-[10px] tracking-[0.18em] font-medium" style={{ color: hexToRgba(INK, 0.3) }}>
          {place.region.toUpperCase()}
        </span>
      </nav>

      {/* ── Hero ── */}
      <div ref={heroRef} className="relative h-screen overflow-hidden">
        <img ref={heroImgRef} src={place.hero} alt={place.name}
          className="absolute inset-0 w-full h-full object-cover" style={{ willChange: 'transform' }} />
        <div className="absolute inset-0"
          style={{ background: `linear-gradient(to bottom, ${hexToRgba(BG, 0.15)} 0%, ${hexToRgba(BG, 0)} 40%, ${hexToRgba(BG, 0.6)} 80%, ${BG} 100%)` }} />

        <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-12 pb-16 max-w-5xl">
          <span className="text-[10px] tracking-[0.22em] font-medium mb-5 block" style={{ color: MUTED }}>
            {place.country.toUpperCase()} — {place.region.toUpperCase()}
          </span>
          <SplitText className="font-light leading-[0.92] tracking-[-0.04em] mb-5" style={{ fontSize: 'clamp(48px, 9vw, 130px)' }} trigger={false} delay={0.3}>
            {place.name}
          </SplitText>
          <p className="text-[16px] sm:text-[20px] leading-relaxed max-w-[500px] italic"
            style={{ fontFamily: "'Instrument Serif', serif", color: hexToRgba(INK, 0.65) }}>
            {place.tagline}
          </p>
        </div>
      </div>

      {/* ── Details ── */}
      <div ref={detailsRef} className="px-6 sm:px-12 py-20 max-w-5xl mx-auto">
        <div data-reveal className="flex flex-wrap gap-8 mb-14 pb-14 border-b" style={{ borderColor: FAINT }}>
          <Meta icon={<Compass size={14} strokeWidth={1.5} style={{ color: MUTED }} />} label="WHEN TO GO" value={place.whenToGo} muted={MUTED} />
          <Meta icon={<MapPin size={14} strokeWidth={1.5} style={{ color: MUTED }} />} label="GOOD FOR" value={place.goodFor} muted={MUTED} />
          <Meta icon={<Globe2 size={14} strokeWidth={1.5} style={{ color: MUTED }} />} label="LANGUAGE" value={place.language} muted={MUTED} />
        </div>

        <div data-reveal>
          <p className="text-[10px] tracking-[0.22em] font-medium mb-6" style={{ color: MUTED }}>THE PLACE</p>
          <p className="text-[16px] sm:text-[18px] leading-[1.9] max-w-[640px]" style={{ color: hexToRgba(INK, 0.72) }}>
            {place.intro}
          </p>
        </div>
      </div>

      {/* ── Known for — horizontal scroll ── */}
      <div className="mb-6 px-6 sm:px-12 max-w-5xl mx-auto">
        <p className="text-[10px] tracking-[0.22em] font-medium mb-4" style={{ color: MUTED }}>KNOWN FOR</p>
      </div>
      <HorizontalScroll bgColor={BG} panelClassName="w-[85vw] sm:w-[60vw] lg:w-[45vw] px-3 first:pl-6 sm:first:pl-12">
        {place.knownFor.map((h, i) => (
          <div key={i} className="group rounded-2xl overflow-hidden h-[60vh] min-h-[400px] relative cursor-pointer">
            <img src={h.photo} alt={h.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 30%, rgba(6,6,6,0.85) 100%)' }} />
            <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-10">
              <span className="text-[10px] tracking-[0.18em] font-medium block mb-3" style={{ color: 'rgba(240,237,232,0.4)' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-[22px] sm:text-[28px] font-light tracking-[-0.02em] mb-3 text-[#F0EDE8]">{h.title}</h3>
              <p className="text-[13px] leading-[1.8] max-w-[360px]" style={{ color: 'rgba(240,237,232,0.55)' }}>{h.desc}</p>
            </div>
          </div>
        ))}
      </HorizontalScroll>

      {/* ── Related trip cross-link ── */}
      <div className="px-6 sm:px-12 py-20 max-w-5xl mx-auto">
        <p className="text-[10px] tracking-[0.22em] font-medium mb-10" style={{ color: MUTED }}>
          {place.relatedTrip ? 'TRAVEL HERE WITH US' : 'EXPLORE MORE'}
        </p>
        <div className="flex flex-wrap gap-3">
          {place.relatedTrip && (
            <Link to={`/journey/${place.relatedTrip.slug}`}
              className="group flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-300 hover:gap-4"
              style={{ background: FAINT, border: `1px solid ${FAINT}` }}>
              <span className="text-[14px] font-light">{place.relatedTrip.title}</span>
              <ArrowUpRight size={13} strokeWidth={2} className="opacity-40 group-hover:opacity-100 transition-opacity" />
            </Link>
          )}
          <Link to="/journey"
            className="group flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-300 hover:gap-4"
            style={{ background: FAINT, border: `1px solid ${FAINT}` }}>
            <span className="text-[14px] font-light">All trips</span>
            <ArrowUpRight size={13} strokeWidth={2} className="opacity-40 group-hover:opacity-100 transition-opacity" />
          </Link>
          <Link to="/gallery"
            className="group flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-300 hover:gap-4"
            style={{ background: FAINT, border: `1px solid ${FAINT}` }}>
            <span className="text-[14px] font-light">View gallery</span>
            <ArrowUpRight size={13} strokeWidth={2} className="opacity-40 group-hover:opacity-100 transition-opacity" />
          </Link>
        </div>
      </div>

      {/* ── CTA ── */}
      <div ref={ctaRef}
        className="mx-6 sm:mx-12 mb-20 rounded-2xl px-8 sm:px-16 py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8"
        style={{ background: INK, color: BG }}>
        <div>
          <p className="font-light leading-[1.1] tracking-[-0.03em] mb-3" style={{ fontSize: 'clamp(24px, 3vw, 44px)' }}>
            Take me to {place.name}.
          </p>
          <p className="text-[14px]" style={{ color: hexToRgba(BG, 0.6) }}>
            Free consultation. We'll shape the whole thing around you.
          </p>
        </div>
        <MagneticButton to="/contact"
          className="rounded-full px-8 py-4 text-[13px] font-medium tracking-[0.06em]"
          style={{ background: BG, color: INK, fontFamily: "'Barlow', sans-serif" }}>
          Start planning <ArrowUpRight size={14} strokeWidth={2} />
        </MagneticButton>
      </div>
    </div>
  )
}

/* ── Small helpers ── */
function Meta({ icon, label, value, muted }: { icon: React.ReactNode; label: string; value: string; muted: string }) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <div>
        <p className="text-[10px] tracking-[0.14em] font-medium" style={{ color: muted }}>{label}</p>
        <p className="text-[14px] mt-1">{value}</p>
      </div>
    </div>
  )
}

/** Convert a #RRGGBB hex to an rgba() string at the given alpha. */
function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
