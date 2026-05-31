import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowLeft, ArrowUpRight, Check, Send } from 'lucide-react'
import SplitText from '../components/SplitText'

gsap.registerPlugin(ScrollTrigger)

const BG     = '#FFC0CB'
const INK    = '#1A0010'
const MUTED  = 'rgba(26,0,16,0.45)'
const FAINT  = 'rgba(26,0,16,0.1)'
const ACCENT = '#069494'

const STEPS = [
  { num:'01', title:'Tell us about you', body:'A 10-minute conversation about how you travel — your pace, your priorities, what you\'ve loved, what you\'ve hated. No forms. Just a real call.' },
  { num:'02', title:'We build your itinerary', body:'Within 48 hours, you get a fully personalised plan: accommodation, activities, restaurants, transport — all arranged. Nothing generic.' },
  { num:'03', title:'Travel, we handle the rest', body:'If anything shifts while you\'re away, we fix it. One message away, always. Your trip changes, the experience doesn\'t.' },
]

export default function PlanPage() {
  const pageRef     = useRef<HTMLDivElement>(null)
  const headerRef   = useRef<HTMLDivElement>(null)
  const stepsRef    = useRef<HTMLDivElement>(null)
  const formRef     = useRef<HTMLDivElement>(null)
  const lineRef     = useRef<SVGLineElement>(null)

  const [form, setForm] = useState({ name:'', email:'', dest:'', dates:'', notes:'' })
  const [sent, setSent] = useState(false)
  const [focused, setFocused] = useState<string|null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Header reveals */
      gsap.fromTo(headerRef.current!.querySelectorAll('[data-h]'),
        { opacity:0, y:60, clipPath:'inset(0 0 100% 0)' },
        { opacity:1, y:0, clipPath:'inset(0 0 0% 0)', duration:1.1, ease:'power4.out', stagger:0.16, delay:0.05 })

      /* SVG timeline line draw */
      if (lineRef.current) {
        const len = typeof lineRef.current.getTotalLength === 'function' ? (lineRef.current as SVGGeometryElement).getTotalLength() : 600
        gsap.fromTo(lineRef.current,
          { strokeDasharray:len, strokeDashoffset:len },
          { strokeDashoffset:0, duration:1.4, ease:'power2.inOut',
            scrollTrigger:{ trigger:stepsRef.current, start:'top 80%' } })
      }

      /* Steps stagger */
      gsap.fromTo(stepsRef.current!.querySelectorAll('.step-item'),
        { opacity:0, x:-50 },
        { opacity:1, x:0, duration:0.85, ease:'power3.out', stagger:0.18,
          scrollTrigger:{ trigger:stepsRef.current, start:'top 80%' } })

      /* Form reveal */
      gsap.fromTo(formRef.current,
        { opacity:0, y:50 },
        { opacity:1, y:0, duration:0.9, ease:'power3.out',
          scrollTrigger:{ trigger:formRef.current, start:'top 82%' } })

      /* Header parallax */
      gsap.to(headerRef.current, { y:-55, ease:'none',
        scrollTrigger:{ trigger:pageRef.current, start:'top top', end:'30% top', scrub:1.2 } })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (form.name && form.email) setSent(true)
  }

  const Field = ({ name, label, type='text', textarea=false }: { name:string; label:string; type?:string; textarea?:boolean }) => {
    const val = form[name as keyof typeof form]
    const active = focused === name || val
    return (
      <div className="relative">
        <label className="absolute left-5 transition-all duration-250 pointer-events-none"
          style={{ top: active ? '8px' : '50%', transform: active ? 'none' : 'translateY(-50%)',
            fontSize: active ? '10px' : '14px', letterSpacing: active ? '0.14em' : '0',
            color: focused===name ? ACCENT : MUTED }}>
          {label.toUpperCase()}
        </label>
        {textarea
          ? <textarea rows={4} value={val}
              onChange={e => setForm(f => ({...f,[name]:e.target.value}))}
              onFocus={() => setFocused(name)} onBlur={() => setFocused(null)}
              className="w-full pt-8 pb-4 px-5 rounded-xl resize-none outline-none text-[14px] transition-all duration-200"
              style={{ background:FAINT, border:`1px solid ${focused===name?ACCENT:FAINT}`, color:INK }}/>
          : <input type={type} value={val}
              onChange={e => setForm(f => ({...f,[name]:e.target.value}))}
              onFocus={() => setFocused(name)} onBlur={() => setFocused(null)}
              className="w-full pt-8 pb-4 px-5 rounded-xl outline-none text-[14px] transition-all duration-200"
              style={{ background:FAINT, border:`1px solid ${focused===name?ACCENT:FAINT}`, color:INK }}/>
        }
      </div>
    )
  }

  return (
    <div ref={pageRef} className="min-h-screen" style={{ background:BG, color:INK, fontFamily:"'Inter',sans-serif" }}>

      {/* Nav */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[92%] sm:w-[85%] max-w-7xl z-50 flex items-center justify-between px-6 py-4 rounded-full liquid-glass transition-all duration-300">
        <Link to="/" className="flex items-center gap-2.5 group" style={{ color:MUTED }}>
          <ArrowLeft size={14} strokeWidth={2} className="group-hover:-translate-x-1 transition-transform duration-300"/>
          <span className="text-[10px] tracking-[0.18em] font-medium">WANDERFUL</span>
        </Link>
        <span className="text-[10px] tracking-[0.18em] font-medium" style={{ color:'rgba(237,232,255,0.25)' }}>PLAN MY ESCAPE</span>
      </nav>

      {/* Header */}
      <header ref={headerRef} className="pt-36 sm:pt-48 pb-12 px-6 sm:px-12 max-w-7xl mx-auto">
        <p data-h className="text-[10px] tracking-[0.22em] font-medium mb-7" style={{ color:MUTED }}>09 — PLAN</p>
        <SplitText data-h className="font-light leading-[0.9]" style={{ fontSize:'clamp(48px,8.5vw,130px)', letterSpacing:'-0.04em' }} trigger={false} delay={0.1}>
          Your trip. Built for you. Not anyone else.
        </SplitText>
        <p data-h className="mt-10 text-[15px] leading-[1.8] max-w-[480px]" style={{ color:MUTED }}>
          Fill in the form below or just book a call. We'll do the rest.
          First consultation is always free.
        </p>
      </header>

      {/* How it works */}
      <section className="px-6 sm:px-12 py-20 max-w-7xl mx-auto">
        <p className="text-[10px] tracking-[0.22em] font-medium mb-16" style={{ color:MUTED }}>HOW IT WORKS</p>
        <div ref={stepsRef} className="relative grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Animated connecting line — desktop only */}
          <svg className="absolute top-10 left-0 w-full pointer-events-none hidden sm:block" height="2" style={{ zIndex:0 }}>
            <line ref={lineRef} x1="16.6%" y1="1" x2="83.4%" y2="1" stroke={ACCENT} strokeWidth="1" strokeOpacity="0.35"/>
          </svg>
          {STEPS.map((s) => (
            <div key={s.num} className="step-item relative z-10 opacity-0 flex flex-col gap-5 p-8 rounded-2xl"
              style={{ background:FAINT, border:`1px solid ${FAINT}` }}>
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-semibold shrink-0"
                  style={{ background:ACCENT, color:BG }}>
                  {s.num}
                </div>
                <div className="h-px flex-1" style={{ background:FAINT }}/>
              </div>
              <h3 className="font-light leading-tight tracking-[-0.02em]" style={{ fontSize:'clamp(18px,2vw,24px)' }}>{s.title}</h3>
              <p className="text-[13px] leading-[1.85]" style={{ color:MUTED }}>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Inquiry form */}
      <section ref={formRef} className="px-6 sm:px-12 pb-28 max-w-3xl mx-auto opacity-0">
        <div className="border-t mb-14" style={{ borderColor:FAINT }}>
          <p className="text-[10px] tracking-[0.22em] font-medium mt-14 mb-12" style={{ color:MUTED }}>START YOUR JOURNEY</p>
        </div>

        {sent ? (
          <div className="flex flex-col items-center gap-6 py-20 text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background:ACCENT }}>
              <Check size={28} strokeWidth={2} color={BG}/>
            </div>
            <h2 className="font-light text-[28px] tracking-[-0.02em]">We've got you.</h2>
            <p className="text-[14px] max-w-[360px]" style={{ color:MUTED }}>
              You'll hear from us within 24 hours to schedule your free planning call.
            </p>
            <Link to="/journey" className="mt-4 flex items-center gap-2.5 rounded-full px-7 py-3.5 text-[12px] font-medium tracking-[0.08em]"
              style={{ background:ACCENT, color:BG, fontFamily:"'Barlow',sans-serif" }}>
              Browse trips <ArrowUpRight size={13} strokeWidth={2}/>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field name="name" label="Your name"/>
              <Field name="email" label="Email address" type="email"/>
            </div>
            <Field name="dest" label="Where do you want to go?"/>
            <Field name="dates" label="Rough dates or timeframe"/>
            <Field name="notes" label="Tell us anything else" textarea/>
            <button type="submit"
              className="mt-2 flex items-center justify-center gap-3 w-full py-5 rounded-xl text-[13px] font-semibold tracking-[0.08em] transition-all duration-300 hover:scale-[1.01] hover:opacity-90"
              style={{ background:ACCENT, color:BG, fontFamily:"'Barlow',sans-serif" }}>
              Send my request <Send size={15} strokeWidth={2}/>
            </button>
            <p className="text-[11px] text-center mt-2" style={{ color:'rgba(237,232,255,0.2)' }}>
              We'll respond within 24 hours. No spam, ever.
            </p>
          </form>
        )}
      </section>
    </div>
  )
}
