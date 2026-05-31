import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const POSTS = [
  {
    id: '01',
    category: 'Essay',
    title: "Why the world's best travelers never over-plan",
    excerpt: 'The paradox of over-preparation — and how leaving room for the unexpected transforms a trip into a memory.',
    read: '6 min',
    date: 'May 2026',
    photo: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80&auto=format&fit=crop',
    photoAlt: 'Empty tropical beach at sunrise',
    featured: true,
  },
  {
    id: '02',
    category: 'Story',
    title: 'Lost in Lisbon for 72 hours',
    excerpt: 'No maps, no agenda. Cobblestones, pastéis de nata, and a city that kept surprising.',
    read: '9 min',
    date: 'Apr 2026',
    photo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80&auto=format&fit=crop',
    photoAlt: 'Lisbon tram on cobblestone street',
    featured: false,
  },
  {
    id: '03',
    category: 'Insight',
    title: 'The new era of slow travel',
    excerpt: 'Speed is overrated. One-destination-deep trips are reshaping what it means to truly arrive somewhere.',
    read: '5 min',
    date: 'Mar 2026',
    photo: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=700&q=80&auto=format&fit=crop',
    photoAlt: 'Mountain path in morning mist',
    featured: false,
  },
  {
    id: '04',
    category: 'Interview',
    title: 'Talking with a nomadic chef in Southeast Asia',
    excerpt: "She's cooked in 34 countries. We asked her what food really teaches you about a place.",
    read: '12 min',
    date: 'Feb 2026',
    photo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=700&q=80&auto=format&fit=crop',
    photoAlt: 'Southeast Asian street food market',
    featured: false,
  },
]

export default function JournalPage() {
  const pageRef     = useRef<HTMLDivElement>(null)
  const headerRef   = useRef<HTMLDivElement>(null)
  const featuredRef = useRef<HTMLDivElement>(null)
  const featImgRef  = useRef<HTMLImageElement>(null)
  const listRef     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── 1. Header stagger ──────────────────────────── */
      gsap.fromTo(
        headerRef.current!.querySelectorAll('[data-h]'),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.14, delay: 0.1 }
      )

      /* ── 2. Featured card entrance ─────────────────── */
      gsap.fromTo(
        featuredRef.current,
        { opacity: 0, y: 64, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: featuredRef.current, start: 'top 85%' },
        }
      )

      /* ── 3. Featured photo parallax ────────────────── */
      if (featImgRef.current) {
        gsap.fromTo(featImgRef.current,
          { y: '-10%' },
          {
            y: '10%',
            ease: 'none',
            scrollTrigger: {
              trigger: featuredRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.9,
            },
          }
        )
      }

      /* ── 4. Sub-cards — stagger + each photo parallax ── */
      const cards = listRef.current!.querySelectorAll<HTMLElement>('.sub-card')

      gsap.fromTo(cards,
        { opacity: 0, y: 56 },
        {
          opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: { trigger: listRef.current, start: 'top 82%' },
        }
      )

      cards.forEach((card) => {
        const img = card.querySelector<HTMLElement>('.card-img')
        if (!img) return
        gsap.fromTo(img,
          { y: '-10%' },
          {
            y: '10%',
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.7,
            },
          }
        )
      })

      /* ── 5. Header subtle upward scroll parallax ───── */
      gsap.to(headerRef.current, {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: pageRef.current,
          start: 'top top',
          end: '40% top',
          scrub: 1.2,
        },
      })

    }, pageRef)

    return () => ctx.revert()
  }, [])

  const featured = POSTS[0]
  const rest      = POSTS.slice(1)

  return (
    <div ref={pageRef} className="min-h-screen bg-[#060606] text-[#F0EDE8]" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 sm:px-12 py-6">
        <Link to="/" className="flex items-center gap-2.5 group" style={{ color: 'rgba(240,237,232,0.45)' }}>
          <ArrowLeft size={14} strokeWidth={2} className="group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="text-[10px] tracking-[0.18em] font-medium">WANDERFUL</span>
        </Link>
        <span className="text-[10px] tracking-[0.18em] font-medium" style={{ color: 'rgba(240,237,232,0.25)' }}>JOURNAL</span>
      </nav>

      {/* ── Header ─────────────────────────────────────── */}
      <header ref={headerRef} className="pt-32 sm:pt-40 pb-12 px-6 sm:px-12 max-w-7xl mx-auto">
        <p data-h className="text-[10px] tracking-[0.22em] font-medium mb-7" style={{ color: 'rgba(240,237,232,0.3)' }}>
          03 — JOURNAL
        </p>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <h1 data-h className="font-light leading-[0.95] tracking-[-0.035em]" style={{ fontSize: 'clamp(42px, 6vw, 88px)' }}>
            <span className="block">Stories from</span>
            <span className="block" style={{ color: 'rgba(240,237,232,0.28)' }}>the edge of the map.</span>
          </h1>
          <p data-h className="text-[13px] leading-relaxed max-w-[260px] sm:text-right pb-2" style={{ color: 'rgba(240,237,232,0.35)' }}>
            Essays, stories, and candid interviews about what travel actually feels like.
          </p>
        </div>
      </header>

      {/* ── Main ───────────────────────────────────────── */}
      <main className="px-6 sm:px-12 pb-32 max-w-7xl mx-auto">

        {/* Featured — hero card with photo parallax */}
        <div
          ref={featuredRef}
          className="group relative overflow-hidden rounded-xl cursor-pointer mb-3 opacity-0"
          style={{ height: 'clamp(380px, 55vh, 600px)' }}
        >
          <img
            ref={featImgRef}
            src={featured.photo}
            alt={featured.photoAlt}
            className="absolute inset-x-0 w-full object-cover"
            style={{ top: '-10%', height: '120%', willChange: 'transform' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(6,6,6,0.08) 0%, rgba(6,6,6,0.0) 25%, rgba(6,6,6,0.82) 78%, rgba(6,6,6,0.98) 100%)' }} />
          <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[9px] font-semibold tracking-[0.22em] px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(240,237,232,0.1)', backdropFilter: 'blur(8px)', border: '1px solid rgba(240,237,232,0.12)', color: 'rgba(240,237,232,0.75)' }}>
                {featured.category.toUpperCase()} · FEATURED
              </span>
              <span className="text-[11px]" style={{ color: 'rgba(240,237,232,0.35)' }}>{featured.date}</span>
            </div>
            <h2 className="font-light leading-[1.1] tracking-[-0.025em] mb-3 text-[#F0EDE8] max-w-[640px]" style={{ fontSize: 'clamp(22px, 3.2vw, 48px)' }}>
              {featured.title}
            </h2>
            <p className="text-[13px] leading-relaxed max-w-[500px] mb-5" style={{ color: 'rgba(240,237,232,0.5)' }}>
              {featured.excerpt}
            </p>
            <div className="flex items-center gap-2 text-[11px] font-medium tracking-[0.1em] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500" style={{ color: '#F0EDE8' }}>
              READ · {featured.read} <ArrowUpRight size={12} strokeWidth={2} />
            </div>
          </div>
        </div>

        {/* Sub cards */}
        <div ref={listRef} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {rest.map((post) => (
            <div key={post.id} className="sub-card group relative overflow-hidden rounded-xl cursor-pointer opacity-0" style={{ height: 340 }}>
              <img
                className="card-img absolute inset-x-0 w-full object-cover"
                src={post.photo}
                alt={post.photoAlt}
                style={{ top: '-10%', height: '120%', willChange: 'transform' }}
                loading="lazy"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(6,6,6,0.04) 0%, rgba(6,6,6,0.0) 22%, rgba(6,6,6,0.75) 70%, rgba(6,6,6,0.97) 100%)' }} />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[9px] font-semibold tracking-[0.2em] px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(240,237,232,0.08)', border: '1px solid rgba(240,237,232,0.1)', color: 'rgba(240,237,232,0.65)' }}>
                    {post.category.toUpperCase()}
                  </span>
                  <span className="text-[10px]" style={{ color: 'rgba(240,237,232,0.3)' }}>{post.read}</span>
                </div>
                <h2 className="font-light leading-[1.15] tracking-[-0.02em] text-[#F0EDE8]" style={{ fontSize: 'clamp(17px, 1.8vw, 22px)' }}>
                  {post.title}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t px-6 sm:px-12 py-10 flex items-center justify-between" style={{ borderColor: 'rgba(240,237,232,0.07)' }}>
        <p className="text-[13px]" style={{ color: 'rgba(240,237,232,0.3)' }}>New stories every month.</p>
        <Link to="/guidebook" className="flex items-center gap-2 text-[11px] font-medium tracking-[0.1em] hover:gap-3 transition-all duration-300" style={{ color: 'rgba(240,237,232,0.6)' }}>
          SEE GUIDEBOOK <ArrowUpRight size={12} strokeWidth={2} />
        </Link>
      </footer>
    </div>
  )
}
