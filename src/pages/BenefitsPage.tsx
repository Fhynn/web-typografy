import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import SplitText from '../components/SplitText'
import MagneticButton from '../components/MagneticButton'

gsap.registerPlugin(ScrollTrigger)

const HERO_PHOTO = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=85&auto=format&fit=crop'

const PILLARS = [
  {
    num: '01',
    title: 'Made around\nyour rhythm',
    body: "We don't build standard itineraries. We ask about how you move through a day — slow mornings, late nights — and shape the trip around that.",
    photo: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=700&q=80&auto=format&fit=crop',
    photoAlt: 'Traveller looking out of a train window',
    flip: false,
  },
  {
    num: '02',
    title: 'Local eyes,\nnot algorithms',
    body: 'Every destination has a contact — a person who lives there, eats there, and knows the alley behind the alley.',
    photo: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=700&q=80&auto=format&fit=crop',
    photoAlt: 'Local market scene from above',
    flip: true,
  },
  {
    num: '03',
    title: 'One booking,\neverything covered',
    body: 'Flights, transfers, stays, experiences — one confirmation. One person to call if anything shifts.',
    photo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=700&q=80&auto=format&fit=crop',
    photoAlt: 'Airplane wing above clouds at golden hour',
    flip: false,
  },
]

export default function BenefitsPage() {
  const pageRef     = useRef<HTMLDivElement>(null)
  const heroRef     = useRef<HTMLDivElement>(null)
  const heroImgRef  = useRef<HTMLImageElement>(null)
  const pillarsRef  = useRef<HTMLDivElement>(null)
  const ctaRef      = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── 1. Hero text entrance ──────────────────────── */
      gsap.fromTo(
        heroRef.current!.querySelectorAll('[data-h]'),
        { opacity: 0, y: 44, clipPath: 'inset(0 0 100% 0)' },
        {
          opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)',
          duration: 1.1, ease: 'power4.out', stagger: 0.15, delay: 0.1,
        }
      )

      /* ── 2. Hero photo parallax — slides up slowly ─── */
      if (heroImgRef.current) {
        gsap.fromTo(heroImgRef.current,
          { y: '0%' },
          {
            y: '-18%',
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        )
      }

      /* ── 3. Each pillar: photo parallax + text slide ─ */
      const pillars = pillarsRef.current!.querySelectorAll<HTMLElement>('.pillar')

      pillars.forEach((pillar) => {
        const img      = pillar.querySelector<HTMLElement>('.pillar-img')
        const textSide = pillar.querySelector<HTMLElement>('.pillar-text')

        /* Photo parallax */
        if (img) {
          gsap.fromTo(img,
            { y: '-10%' },
            {
              y: '10%',
              ease: 'none',
              scrollTrigger: {
                trigger: pillar,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.8,
              },
            }
          )
        }

        /* Text slide in from the opposite side */
        if (textSide) {
          const isFlip = pillar.dataset.flip === 'true'
          gsap.fromTo(textSide,
            { opacity: 0, x: isFlip ? -60 : 60 },
            {
              opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
              scrollTrigger: {
                trigger: pillar,
                start: 'top 75%',
              },
            }
          )
        }

        /* Pillar photo container fade in */
        const photoWrap = pillar.querySelector<HTMLElement>('.pillar-photo-wrap')
        if (photoWrap) {
          gsap.fromTo(photoWrap,
            { opacity: 0, scale: 0.96 },
            {
              opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out',
              scrollTrigger: { trigger: pillar, start: 'top 78%' },
            }
          )
        }
      })

      /* ── 4. CTA section reveal ──────────────────────── */
      if (ctaRef.current) {
        const ctaChildren = ctaRef.current.children
        gsap.fromTo(ctaChildren,
          { opacity: 0, y: 36 },
          {
            opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', stagger: 0.12,
            scrollTrigger: { trigger: ctaRef.current, start: 'top 88%' },
          }
        )
      }

    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef} className="min-h-screen" style={{ fontFamily: "'Inter', sans-serif", background: '#FFC0CB', color: '#1A0010' }}>

      {/* Nav */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[92%] sm:w-[85%] max-w-7xl z-50 flex items-center justify-between px-6 py-4 rounded-full liquid-glass transition-all duration-300">
        <Link to="/" className="flex items-center gap-2.5 group" style={{ color: 'rgba(26,0,16,0.55)' }}>
          <ArrowLeft size={14} strokeWidth={2} className="group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="text-[10px] tracking-[0.18em] font-medium">WANDERFUL</span>
        </Link>
        <span className="text-[10px] tracking-[0.18em] font-medium" style={{ color: 'rgba(26,0,16,0.35)' }}>WHY US</span>
      </nav>

      {/* ── Hero split ─────────────────────────────────── */}
      <section ref={heroRef} className="min-h-[90vh] grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* Text side */}
        <div className="flex flex-col justify-end px-6 sm:px-12 pt-36 pb-14 md:pb-20">
          <p data-h className="text-[10px] tracking-[0.22em] font-medium mb-7" style={{ color: 'rgba(26,0,16,0.4)' }}>
            02 — BENEFITS
          </p>
          <SplitText data-h className="font-light leading-[0.95] tracking-[-0.035em] mb-8" style={{ fontSize: 'clamp(40px, 5.8vw, 86px)' }} trigger={false} delay={0.1}>
            The difference you'll actually feel.
          </SplitText>
          <p data-h className="text-[15px] leading-[1.75] max-w-[400px]" style={{ color: 'rgba(26,0,16,0.5)' }}>
            Travel planning is broken. It takes 11 browser tabs to book a simple weekend away.
            We fixed that — quietly, without the fanfare.
          </p>
        </div>

        {/* Photo side — parallax */}
        <div className="relative overflow-hidden min-h-[380px] md:min-h-0">
          <img
            ref={heroImgRef}
            src={HERO_PHOTO}
            alt="Person planning a trip with maps"
            className="absolute inset-0 w-full object-cover"
            style={{ top: '-10%', height: '120%', willChange: 'transform' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(255,192,203,0.55) 0%, rgba(255,192,203,0.0) 60%)' }} />
        </div>
      </section>

      {/* ── Pillars ─────────────────────────────────────── */}
      <div ref={pillarsRef} className="border-t" style={{ borderColor: 'rgba(26,0,16,0.12)' }}>
        {PILLARS.map((p) => (
          <div
            key={p.num}
            className="pillar grid grid-cols-1 md:grid-cols-2 border-b"
            data-flip={String(p.flip)}
            style={{ borderColor: 'rgba(26,0,16,0.12)' }}
          >
            {/* Photo with parallax container */}
            <div className={`pillar-photo-wrap relative overflow-hidden min-h-[300px] sm:min-h-[480px] opacity-0 ${p.flip ? 'md:order-last' : ''}`}>
              <img
                className="pillar-img absolute inset-x-0 w-full object-cover"
                src={p.photo}
                alt={p.photoAlt}
                style={{ top: '-10%', height: '120%', willChange: 'transform' }}
                loading="lazy"
              />
              <div className="absolute inset-0" style={{ background: 'rgba(255,192,203,0.1)' }} />
            </div>

            {/* Text */}
            <div className="pillar-text flex flex-col justify-center px-8 sm:px-16 py-14 opacity-0">
              <span className="text-[10px] tracking-[0.2em] font-medium mb-8 block" style={{ color: 'rgba(26,0,16,0.3)' }}>
                {p.num}
              </span>
              <h2 className="font-light leading-[1.1] tracking-[-0.025em] mb-6 whitespace-pre-line" style={{ fontSize: 'clamp(28px, 3.5vw, 52px)' }}>
                {p.title}
              </h2>
              <p className="text-[14px] sm:text-[15px] leading-[1.8] max-w-[380px]" style={{ color: 'rgba(26,0,16,0.5)' }}>
                {p.body}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── CTA ─────────────────────────────────────────── */}
      <section
        ref={ctaRef}
        className="px-6 sm:px-12 py-28 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 max-w-7xl mx-auto"
      >
        <div>
          <p className="font-light leading-[1.1] tracking-[-0.025em] mb-3" style={{ fontSize: 'clamp(24px, 3vw, 44px)' }}>
            Ready to travel differently?
          </p>
          <p style={{ color: 'rgba(26,0,16,0.45)', fontSize: 14 }}>
            Your first itinerary consultation is free and takes 20 minutes.
          </p>
        </div>
        <MagneticButton
          to="/plan"
          className="rounded-full px-8 py-4 text-[13px] font-medium tracking-[0.06em] whitespace-nowrap"
          style={{ fontFamily: "'Barlow', sans-serif", background: '#1A0010', color: '#FFC0CB' }}
        >
          Plan my escape
          <ArrowUpRight size={14} strokeWidth={2} />
        </MagneticButton>
      </section>
    </div>
  )
}
