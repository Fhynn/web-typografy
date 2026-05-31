import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowLeft, X } from 'lucide-react'
import SplitText from '../components/SplitText'

gsap.registerPlugin(ScrollTrigger)

const BG    = '#FCE883'
const INK   = '#1A1400'
const MUTED = 'rgba(26,20,0,0.45)'
const FAINT = 'rgba(26,20,0,0.1)'

const PHOTOS = [
  { id:'01', title:'Amalfi Dawn',     location:'Italy',      photo:'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=900&q=90&auto=format&fit=crop', span:'tall' },
  { id:'02', title:'Kyoto Mist',      location:'Japan',      photo:'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=700&q=90&auto=format&fit=crop', span:'wide' },
  { id:'03', title:'Sahara Silence',  location:'Morocco',    photo:'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=900&q=90&auto=format&fit=crop', span:'normal' },
  { id:'04', title:'Patagonia Edge',  location:'Argentina',  photo:'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=900&q=90&auto=format&fit=crop', span:'tall' },
  { id:'05', title:'Lisbon Cobbles',  location:'Portugal',   photo:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=90&auto=format&fit=crop', span:'normal' },
  { id:'06', title:'Bali Terraces',   location:'Indonesia',  photo:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=700&q=90&auto=format&fit=crop', span:'wide' },
  { id:'07', title:'Tropical Beach',  location:'Thailand',   photo:'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=90&auto=format&fit=crop', span:'normal' },
  { id:'08', title:'Mountain Path',   location:'Nepal',      photo:'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=700&q=90&auto=format&fit=crop', span:'normal' },
  { id:'09', title:'Street Market',   location:'Vietnam',    photo:'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=700&q=90&auto=format&fit=crop', span:'wide' },
  { id:'10', title:'Train Window',    location:'India',      photo:'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=900&q=90&auto=format&fit=crop', span:'tall' },
  { id:'11', title:'Atlas Mountains', location:'Morocco',    photo:'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=700&q=90&auto=format&fit=crop', span:'normal' },
  { id:'12', title:'Coastal Village', location:'Greece',     photo:'https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?w=700&q=90&auto=format&fit=crop', span:'normal' },
]
type Photo = typeof PHOTOS[0]

export default function GalleryPage() {
  const pageRef    = useRef<HTMLDivElement>(null)
  const headerRef  = useRef<HTMLDivElement>(null)
  const gridRef    = useRef<HTMLDivElement>(null)
  const cursorRef  = useRef<HTMLDivElement>(null)
  const lightboxRef  = useRef<HTMLDivElement>(null)
  const lbContentRef = useRef<HTMLDivElement>(null)
  const srcRectRef   = useRef<DOMRect | null>(null)
  const [active, setActive] = useState<Photo | null>(null)
  const [cursorLabel, setCursorLabel] = useState('')

  /* ── Custom cursor ── */
  useEffect(() => {
    let raf: number
    let tx = -100, ty = -100, cx = -100, cy = -100
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const onMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY }
    window.addEventListener('mousemove', onMove)

    const loop = () => {
      cx = lerp(cx, tx, 0.1)
      cy = lerp(cy, ty, 0.1)
      if (cursorRef.current) gsap.set(cursorRef.current, { x: cx, y: cy })
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf) }
  }, [])

  /* ── Entrance animations ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current!.querySelectorAll('[data-h]'),
        { opacity:0, y:50, clipPath:'inset(0 0 100% 0)' },
        { opacity:1, y:0, clipPath:'inset(0 0 0% 0)', duration:1.1, ease:'power4.out', stagger:0.15, delay:0.05 })

      gsap.fromTo(gridRef.current!.querySelectorAll('.gal-card'),
        { opacity:0, scale:0.9 },
        { opacity:1, scale:1, duration:0.8, ease:'power3.out', stagger:0.06,
          scrollTrigger:{ trigger:gridRef.current, start:'top 85%' } })

      gsap.to(headerRef.current, { y:-50, ease:'none',
        scrollTrigger:{ trigger:pageRef.current, start:'top top', end:'30% top', scrub:1.2 } })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  /* ── Lightbox open ── */
  useEffect(() => {
    if (!active || !lightboxRef.current || !lbContentRef.current) return
    const rect = srcRectRef.current; if (!rect) return
    const vw = window.innerWidth, vh = window.innerHeight
    const t = (rect.top/vh*100).toFixed(2), r = ((vw-rect.right)/vw*100).toFixed(2)
    const b = ((vh-rect.bottom)/vh*100).toFixed(2), l = (rect.left/vw*100).toFixed(2)
    gsap.fromTo(lightboxRef.current,
      { clipPath:`inset(${t}% ${r}% ${b}% ${l}% round 12px)` },
      { clipPath:'inset(0% 0% 0% 0% round 0px)', duration:0.75, ease:'expo.inOut' })
    gsap.fromTo(lbContentRef.current,
      { opacity:0, y:28 },
      { opacity:1, y:0, duration:0.5, ease:'power3.out', delay:0.65 })
  }, [active])

  const openPhoto = (photo: Photo, e: React.MouseEvent<HTMLDivElement>) => {
    srcRectRef.current = e.currentTarget.getBoundingClientRect()
    setActive(photo)
  }
  const closePhoto = () => {
    if (!lightboxRef.current) return
    gsap.to(lightboxRef.current, {
      clipPath:'inset(12% 12% 12% 12% round 18px)', opacity:0, duration:0.48, ease:'expo.in',
      onComplete:() => { setActive(null); gsap.set(lightboxRef.current!, { opacity:1 }) }
    })
  }

  /* ── Card 3D tilt ── */
  const onTiltMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    const { left, top, width, height } = el.getBoundingClientRect()
    const x = ((e.clientX-left)/width - 0.5) * 12
    const y = ((e.clientY-top)/height - 0.5) * -12
    gsap.to(el, { rotateX:y, rotateY:x, duration:0.3, ease:'power2.out', transformPerspective:900 })
  }
  const onTiltLeave = (e: React.MouseEvent<HTMLDivElement>) =>
    gsap.to(e.currentTarget, { rotateX:0, rotateY:0, duration:0.55, ease:'power3.out' })

  return (
    <div ref={pageRef} className="min-h-screen select-none" style={{ background:BG, color:INK, fontFamily:"'Inter',sans-serif", cursor:'none' }}>

      {/* Custom cursor */}
      <div ref={cursorRef} className="fixed top-0 left-0 z-[9999] pointer-events-none flex items-center justify-center transition-all duration-150"
        style={{ transform:'translate(-50%,-50%)', width: cursorLabel ? 80 : 48, height: cursorLabel ? 80 : 48,
          border:`1.5px solid rgba(240,237,232,${cursorLabel?'0.7':'0.3'})`,
          borderRadius:'50%', mixBlendMode:'difference' }}>
        {cursorLabel && <span className="text-[9px] font-semibold tracking-[0.18em]" style={{ color:INK }}>{cursorLabel}</span>}
      </div>

      {/* Nav */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[92%] sm:w-[85%] max-w-7xl z-50 flex items-center justify-between px-6 py-4 rounded-full liquid-glass transition-all duration-300">
        <Link to="/" className="flex items-center gap-2.5 group" style={{ color:MUTED, cursor:'none' }}>
          <ArrowLeft size={14} strokeWidth={2} className="group-hover:-translate-x-1 transition-transform duration-300"/>
          <span className="text-[10px] tracking-[0.18em] font-medium">WANDERFUL</span>
        </Link>
        <span className="text-[10px] tracking-[0.18em] font-medium" style={{ color:'rgba(240,237,232,0.25)' }}>VISUAL ARCHIVE</span>
      </nav>

      {/* Header */}
      <header ref={headerRef} className="pt-36 sm:pt-48 pb-16 px-6 sm:px-12 max-w-7xl mx-auto">
        <p data-h className="text-[10px] tracking-[0.22em] font-medium mb-7" style={{ color:MUTED }}>08 — GALLERY</p>
        <SplitText data-h className="font-light leading-[0.9] tracking-[-0.04em]" style={{ fontSize: 'clamp(52px, 9vw, 130px)' }} trigger={false} delay={0.1}>
          Every frame a reason to go.
        </SplitText>
        <p data-h className="mt-8 text-[14px] leading-relaxed max-w-[460px]" style={{ color:MUTED }}>
          Click any image to explore the story behind it.
        </p>
      </header>

      {/* Masonry Grid */}
      <main ref={gridRef} className="px-4 sm:px-8 pb-24 columns-2 md:columns-3 lg:columns-4 gap-3 max-w-[1600px] mx-auto space-y-3">
        {PHOTOS.map((p) => (
          <div key={p.id}
            className="gal-card group relative overflow-hidden rounded-xl cursor-none opacity-0 break-inside-avoid mb-3"
            style={{ height: p.span==='tall'?'480px':p.span==='wide'?'260px':'340px', willChange:'transform' }}
            onClick={(e) => openPhoto(p, e)}
            onMouseMove={onTiltMove}
            onMouseLeave={onTiltLeave}
            onMouseEnter={() => setCursorLabel('VIEW')}
            onMouseOut={() => setCursorLabel('')}
          >
            <img src={p.photo} alt={p.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
              loading="lazy"/>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
              style={{ background:'linear-gradient(to bottom, transparent 40%, rgba(10,10,18,0.85) 100%)' }}/>
            <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <h3 className="text-[14px] font-light">{p.title}</h3>
              <p className="text-[11px]" style={{ color:MUTED }}>{p.location}</p>
            </div>
            <div className="absolute top-4 right-4 text-[10px] font-light opacity-0 group-hover:opacity-100 transition-opacity duration-400"
              style={{ color:MUTED }}>{p.id}</div>
          </div>
        ))}
      </main>

      {/* Lightbox */}
      {active && (
        <div ref={lightboxRef} className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          style={{ background:'rgba(10,10,18,0.97)' }}>
          <button onClick={closePhoto}
            className="absolute top-8 right-8 z-10 p-3 rounded-full border transition-colors duration-200 hover:bg-white/10"
            style={{ borderColor:FAINT, color:INK, cursor:'none' }}>
            <X size={18} strokeWidth={1.5}/>
          </button>
          <div className="relative w-full h-full flex items-center justify-center p-8 sm:p-16">
            <img src={active.photo} alt={active.title}
              className="max-w-full max-h-full object-contain rounded-xl"
              style={{ maxHeight:'80vh', boxShadow:'0 40px 120px rgba(0,0,0,0.8)' }}/>
          </div>
          <div ref={lbContentRef} className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center opacity-0">
            <h2 className="text-[20px] font-light tracking-[-0.02em] mb-1">{active.title}</h2>
            <p className="text-[12px] tracking-[0.1em]" style={{ color:MUTED }}>{active.location}</p>
          </div>
        </div>
      )}
    </div>
  )
}
