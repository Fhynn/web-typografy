import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowLeft, X, Clock, ArrowUpRight } from 'lucide-react'
import SplitText from '../components/SplitText'

gsap.registerPlugin(ScrollTrigger)

const BG    = '#FF8243'
const INK   = '#1A0800'
const MUTED = 'rgba(26,8,0,0.45)'
const FAINT = 'rgba(26,8,0,0.1)'
const ACCENT = '#069494'

const EXPS = [
  { id:'01', title:'Dawn Kayaking', location:'Amalfi Coast, Italy', duration:'3 hours', tag:'Water',
    tagline:'Glass water, cliffs still asleep',
    desc:'Before the tourist boats arrive, the Amalfi water is mirror-still. A local guide takes you through sea caves only accessible at low tide, past fishing villages that wake at 5am. You\'ll have the coast almost entirely to yourself.',
    photo:'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1400&q=90&auto=format&fit=crop' },
  { id:'02', title:'Private Tea Ceremony', location:'Uji, Kyoto', duration:'2 hours', tag:'Culture',
    tagline:'Silence has a flavour here',
    desc:'In a 200-year-old machiya townhouse 20 minutes from Kyoto, a fourth-generation tea master guides you through chado. No tourists, no rush. Just water, warmth, and something that takes an hour to understand.',
    photo:'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1400&q=90&auto=format&fit=crop' },
  { id:'03', title:'Sahara Star Camp', location:'Merzouga, Morocco', duration:'Overnight', tag:'Wilderness',
    tagline:'No light pollution, no limit',
    desc:'A 90-minute camel ride into the dunes leads to a camp with no electricity — just lanterns, argan-scented tagine, and a sky so dense with stars it looks painted. A local astronomer joins after dinner.',
    photo:'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=1400&q=90&auto=format&fit=crop' },
  { id:'04', title:'Glacier Trek', location:'Perito Moreno, Patagonia', duration:'5 hours', tag:'Adventure',
    tagline:'Blue ice older than language',
    desc:'Crampons on, you walk across the Perito Moreno glacier with a glaciologist who explains what a 250-year-old crevasse sounds like at midday. The silence between the creaks is unlike anything on earth.',
    photo:'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1400&q=90&auto=format&fit=crop' },
  { id:'05', title:'Fado in the Alfama', location:'Lisbon, Portugal', duration:'Evening', tag:'Culture',
    tagline:'The most honest music in Europe',
    desc:'Not tourist fado. A small house in Alfama, twelve tables, one singer, and a story about the city told only through music. Dinner included: petiscos, bacalhau, and Alentejo wine.',
    photo:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=90&auto=format&fit=crop' },
  { id:'06', title:'Rice Terrace Dawn', location:'Tegalalang, Bali', duration:'4 hours', tag:'Nature',
    tagline:'Before the selfie sticks arrive',
    desc:'A 5am start brings you to Tegalalang before any other visitors. A Balinese farmer walks you through the subak irrigation his grandfather built. You harvest rice, eat breakfast in a field shack. It\'s perfect.',
    photo:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1400&q=90&auto=format&fit=crop' },
]
type Exp = typeof EXPS[0]

const TICKER = ['KAYAKING','TEA CEREMONY','STAR CAMP','GLACIER TREK','FADO NIGHT','RICE TERRACE DAWN','BOOK AN EXPERIENCE','WANDER DEEPER']

export default function ExperiencesPage() {
  const pageRef    = useRef<HTMLDivElement>(null)
  const headerRef  = useRef<HTMLDivElement>(null)
  const tickerRef  = useRef<HTMLDivElement>(null)
  const gridRef    = useRef<HTMLDivElement>(null)
  const lightboxRef    = useRef<HTMLDivElement>(null)
  const lbContentRef   = useRef<HTMLDivElement>(null)
  const srcRectRef     = useRef<DOMRect | null>(null)
  const [active, setActive] = useState<Exp | null>(null)

  /* ── Entrance animations ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current!.querySelectorAll('[data-h]'),
        { opacity:0, y:60, clipPath:'inset(0 0 100% 0)' },
        { opacity:1, y:0, clipPath:'inset(0 0 0% 0)', duration:1.1, ease:'power4.out', stagger:0.16, delay:0.05 })

      /* Ticker infinite scroll */
      const ticker = tickerRef.current
      if (ticker) {
        const totalW = ticker.scrollWidth / 2
        gsap.to(ticker, { x: -totalW, duration: 24, ease:'none', repeat:-1, modifiers: {
          x: (x) => `${parseFloat(x) % totalW}px`
        }})
      }

      /* Cards stagger */
      gsap.fromTo(gridRef.current!.querySelectorAll('.exp-card'),
        { opacity:0, y:64, scale:0.95 },
        { opacity:1, y:0, scale:1, duration:0.85, ease:'power3.out', stagger:0.1,
          scrollTrigger:{ trigger:gridRef.current, start:'top 82%' }})

      /* Header parallax */
      gsap.to(headerRef.current, { y:-60, ease:'none',
        scrollTrigger:{ trigger:pageRef.current, start:'top top', end:'30% top', scrub:1.2 }})
    }, pageRef)
    return () => ctx.revert()
  }, [])

  /* ── Lightbox open ── */
  useEffect(() => {
    if (!active || !lightboxRef.current || !lbContentRef.current) return
    const rect = srcRectRef.current
    if (!rect) return
    const vw = window.innerWidth, vh = window.innerHeight
    const t = (rect.top / vh * 100).toFixed(2)
    const r = ((vw - rect.right) / vw * 100).toFixed(2)
    const b = ((vh - rect.bottom) / vh * 100).toFixed(2)
    const l = (rect.left / vw * 100).toFixed(2)

    gsap.fromTo(lightboxRef.current,
      { clipPath:`inset(${t}% ${r}% ${b}% ${l}% round 16px)` },
      { clipPath:'inset(0% 0% 0% 0% round 0px)', duration:0.78, ease:'expo.inOut' })
    gsap.fromTo(lbContentRef.current,
      { opacity:0, y:36 },
      { opacity:1, y:0, duration:0.55, ease:'power3.out', delay:0.65 })
  }, [active])

  const openExp = (exp: Exp, e: React.MouseEvent<HTMLDivElement>) => {
    srcRectRef.current = e.currentTarget.getBoundingClientRect()
    setActive(exp)
  }

  const closeExp = () => {
    if (!lightboxRef.current) return
    gsap.to(lightboxRef.current, {
      clipPath:'inset(15% 15% 15% 15% round 20px)', opacity:0,
      duration:0.5, ease:'expo.in', onComplete:() => { setActive(null); gsap.set(lightboxRef.current!, { opacity:1 }) }
    })
  }

  /* ── Magnetic card hover ── */
  const onCardMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    const { left, top, width, height } = el.getBoundingClientRect()
    const x = ((e.clientX - left) / width - 0.5) * 14
    const y = ((e.clientY - top) / height - 0.5) * -14
    gsap.to(el, { rotateX:y, rotateY:x, duration:0.35, ease:'power2.out', transformPerspective:900 })
  }
  const onCardLeave = (e: React.MouseEvent<HTMLDivElement>) =>
    gsap.to(e.currentTarget, { rotateX:0, rotateY:0, duration:0.6, ease:'power3.out' })

  return (
    <div ref={pageRef} className="min-h-screen" style={{ background:BG, color:INK, fontFamily:"'Inter', sans-serif" }}>

      {/* Nav */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[92%] sm:w-[85%] max-w-7xl z-50 flex items-center justify-between px-6 py-4 rounded-full liquid-glass transition-all duration-300">
        <Link to="/" className="flex items-center gap-2.5 group" style={{ color:'rgba(26,8,0,0.5)' }}>
          <ArrowLeft size={14} strokeWidth={2} className="group-hover:-translate-x-1 transition-transform duration-300"/>
          <span className="text-[10px] tracking-[0.18em] font-medium">WANDERFUL</span>
        </Link>
        <span className="text-[10px] tracking-[0.18em] font-medium" style={{ color:'rgba(223,242,233,0.28)' }}>EXPERIENCES</span>
      </nav>

      {/* Header */}
      <header ref={headerRef} className="pt-36 sm:pt-48 pb-10 px-6 sm:px-12 max-w-7xl mx-auto">
        <p data-h className="text-[10px] tracking-[0.22em] font-medium mb-7" style={{ color:MUTED }}>07 — EXPERIENCES</p>
        <SplitText data-h className="font-light leading-[0.9] tracking-[-0.04em]" style={{ fontSize:'clamp(48px,9vw,140px)' }} trigger={false} delay={0.1}>
          Live it, don't just photograph it.
        </SplitText>
      </header>

      {/* Ticker */}
      <div className="overflow-hidden border-y py-4 my-4" style={{ borderColor:FAINT }}>
        <div ref={tickerRef} className="flex gap-12 whitespace-nowrap" style={{ willChange:'transform' }}>
          {[...TICKER,...TICKER,...TICKER].map((t,i) => (
            <span key={i} className="text-[11px] font-medium tracking-[0.28em] shrink-0" style={{ color:i%2===0?MUTED:ACCENT }}>
              ✦ {t}
            </span>
          ))}
        </div>
      </div>

      {/* Grid */}
      <main ref={gridRef} className="px-6 sm:px-12 py-14 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
        {EXPS.map((exp) => (
          <div key={exp.id}
            className="exp-card group relative overflow-hidden rounded-2xl cursor-pointer opacity-0"
            style={{ height:'420px', willChange:'transform' }}
            onClick={(e) => openExp(exp, e)}
            onMouseMove={onCardMove}
            onMouseLeave={onCardLeave}
          >
            <img src={exp.photo} alt={exp.title}
              className="absolute inset-x-0 w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
              style={{ top:'-8%', height:'116%', willChange:'transform' }} loading="lazy"/>
            <div className="absolute inset-0" style={{ background:'linear-gradient(to bottom,rgba(13,40,24,0.08) 0%,rgba(13,40,24,0) 30%,rgba(13,40,24,0.75) 68%,rgba(13,40,24,0.97) 100%)' }}/>
            {/* Tag */}
            <div className="absolute top-5 left-5">
              <span className="text-[9px] font-semibold tracking-[0.22em] px-3 py-1.5 rounded-full"
                style={{ background:'rgba(6,148,148,0.12)', backdropFilter:'blur(8px)', color:ACCENT, border:'1px solid rgba(6,148,148,0.2)' }}>
                {exp.tag.toUpperCase()}
              </span>
            </div>
            <div className="absolute top-5 right-5 text-[11px] font-light" style={{ color:MUTED }}>{exp.id}</div>
            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-7 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              <div className="flex items-center gap-2 mb-2" style={{ color:MUTED }}>
                <Clock size={10} strokeWidth={1.8}/><span className="text-[10px] tracking-[0.1em]">{exp.duration}</span>
              </div>
              <h2 className="font-light leading-tight tracking-[-0.02em] mb-1 text-[#DFF2E9]" style={{ fontSize:'clamp(22px,2.5vw,32px)' }}>{exp.title}</h2>
              <p className="text-[12px]" style={{ color:MUTED }}>{exp.location}</p>
              <div className="mt-4 flex items-center gap-2 text-[10px] font-medium tracking-[0.14em] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500"
                style={{ color:ACCENT }}>EXPLORE <ArrowUpRight size={10} strokeWidth={2}/></div>
            </div>
          </div>
        ))}
      </main>

      {/* Lightbox */}
      {active && (
        <div ref={lightboxRef} className="fixed inset-0 z-[100] flex flex-col md:flex-row overflow-hidden"
          style={{ background:'#FF8243' }}>
          {/* Image side */}
          <div className="relative flex-1 min-h-[45vh] md:min-h-0">
            <img src={active.photo} alt={active.title} className="absolute inset-0 w-full h-full object-cover"/>
            <div className="absolute inset-0" style={{ background:'linear-gradient(to right, transparent 60%, rgba(13,40,24,0.6) 100%)' }}/>
          </div>
          {/* Details side */}
          <div ref={lbContentRef} className="relative flex flex-col justify-center px-8 sm:px-14 py-16 opacity-0"
            style={{ width:'100%', maxWidth:'520px', minWidth:'320px' }}>
            <button onClick={closeExp}
              className="absolute top-8 right-8 p-2 rounded-full transition-colors duration-200 hover:bg-white/10"
              style={{ color:INK }}><X size={20} strokeWidth={1.5}/></button>
            <span className="text-[10px] tracking-[0.22em] font-medium mb-6 block" style={{ color:ACCENT }}>{active.tag.toUpperCase()} — {active.id}</span>
            <h2 className="font-light leading-[1.05] tracking-[-0.03em] mb-3" style={{ fontSize:'clamp(32px,4vw,58px)' }}>{active.title}</h2>
            <p className="text-[13px] italic mb-8" style={{ color:ACCENT, fontFamily:"'Instrument Serif',serif", fontSize:16 }}>"{active.tagline}"</p>
            <div className="flex items-center gap-6 mb-8 pb-8 border-b" style={{ borderColor:FAINT }}>
              <div><p className="text-[10px] tracking-[0.14em] mb-1" style={{ color:MUTED }}>LOCATION</p><p className="text-[13px]">{active.location}</p></div>
              <div><p className="text-[10px] tracking-[0.14em] mb-1" style={{ color:MUTED }}>DURATION</p><p className="text-[13px]">{active.duration}</p></div>
            </div>
            <p className="text-[14px] leading-[1.85]" style={{ color:MUTED }}>{active.desc}</p>
            <Link to="/plan" className="mt-10 self-start flex items-center gap-2.5 rounded-full px-7 py-3.5 text-[12px] font-medium tracking-[0.08em] transition-all duration-300 hover:scale-[1.04]"
              style={{ background:ACCENT, color:BG, fontFamily:"'Barlow',sans-serif" }}>
              Book this experience <ArrowUpRight size={13} strokeWidth={2}/>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
