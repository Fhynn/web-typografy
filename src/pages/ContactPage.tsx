import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react'
import SplitText from '../components/SplitText'

gsap.registerPlugin(ScrollTrigger)

/* ── Palette ── */
const BG    = '#0C0C0C'
const INK   = '#F0EDE8'
const MUTED = 'rgba(240,237,232,0.45)'
const FAINT = 'rgba(240,237,232,0.12)'

const EMAIL = 'hello@wanderful.co'

const DETAILS = [
  { label: 'EMAIL',     value: EMAIL,            href: `mailto:${EMAIL}` },
  { label: 'INSTAGRAM', value: '@fhinz_anxiety',  href: 'https://instagram.com/fhinz_anxiety' },
  { label: 'GITHUB',    value: 'Fhynn',           href: 'https://github.com/Fhynn' },
  { label: 'BASED IN',  value: 'Everywhere · GMT+7', href: null },
]

const FIELDS = [
  { key: 'name',  label: 'Your name',    type: 'text',  placeholder: 'Jane Wanderer' },
  { key: 'email', label: 'Email',        type: 'email', placeholder: 'you@email.com' },
  { key: 'where', label: 'Where to?',    type: 'text',  placeholder: 'Kyoto, in spring…' },
] as const

export default function ContactPage() {
  const pageRef   = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const bodyRef   = useRef<HTMLDivElement>(null)
  const [form, setForm] = useState({ name: '', email: '', where: '', message: '' })
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current!.querySelectorAll('[data-h]'),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.12, delay: 0.15 }
      )
      gsap.fromTo(bodyRef.current!.querySelectorAll('[data-reveal]'),
        { opacity: 0, y: 48 },
        {
          opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: { trigger: bodyRef.current, start: 'top 82%' },
        }
      )
    }, pageRef)
    return () => ctx.revert()
  }, [])

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div ref={pageRef} className="min-h-screen" style={{ background: BG, color: INK, fontFamily: "'Inter', sans-serif" }}>

      {/* Nav */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[92%] sm:w-[85%] max-w-7xl z-50 flex items-center justify-between px-6 py-4 rounded-full liquid-glass transition-all duration-300">
        <Link to="/" className="flex items-center gap-2.5 group" style={{ color: MUTED }}>
          <ArrowLeft size={14} strokeWidth={2} className="group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="text-[10px] tracking-[0.18em] font-medium">WANDERFUL</span>
        </Link>
        <span className="text-[10px] tracking-[0.18em] font-medium" style={{ color: 'rgba(240,237,232,0.3)' }}>CONTACT</span>
      </nav>

      {/* ── Header ── */}
      <header ref={headerRef} className="pt-32 sm:pt-44 pb-16 px-6 sm:px-12 max-w-7xl mx-auto">
        <p data-h className="text-[10px] tracking-[0.22em] font-medium mb-7" style={{ color: MUTED }}>
          06 — GET IN TOUCH
        </p>
        <SplitText data-h className="font-light leading-[0.9] tracking-[-0.04em]" style={{ fontSize: 'clamp(44px, 9vw, 150px)' }} trigger={false} delay={0.15}>
          Let's plan
        </SplitText>
        <SplitText data-h className="font-light leading-[0.9] tracking-[-0.04em]" style={{ fontSize: 'clamp(44px, 9vw, 150px)', color: MUTED }} trigger={false} delay={0.32}>
          your escape.
        </SplitText>

        {/* Big email link */}
        <a
          data-h
          href={`mailto:${EMAIL}`}
          className="group inline-flex items-center gap-3 mt-12 sm:mt-16"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          <span className="relative leading-none" style={{ fontSize: 'clamp(24px, 4.5vw, 64px)' }}>
            {EMAIL}
            <span className="absolute left-0 -bottom-1 h-px w-full origin-right scale-x-0 group-hover:origin-left group-hover:scale-x-100 transition-transform duration-500"
              style={{ background: INK }} />
          </span>
          <ArrowUpRight className="shrink-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" style={{ width: 'clamp(20px,3vw,44px)', height: 'clamp(20px,3vw,44px)' }} strokeWidth={1} />
        </a>
      </header>

      {/* ── Body: form + details ── */}
      <div ref={bodyRef} className="px-6 sm:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-16 lg:gap-24 pb-28">

        {/* Inquiry form */}
        <div data-reveal>
          <p className="text-[10px] tracking-[0.22em] font-medium mb-10" style={{ color: MUTED }}>START AN INQUIRY</p>

          {sent ? (
            <div className="flex flex-col items-start gap-4 rounded-2xl px-8 py-12" style={{ border: `1px solid ${FAINT}` }}>
              <span className="flex items-center justify-center w-12 h-12 rounded-full" style={{ background: INK, color: BG }}>
                <Check size={20} strokeWidth={2} />
              </span>
              <p className="font-light leading-tight" style={{ fontSize: 'clamp(22px, 3vw, 34px)' }}>
                Thank you, {form.name || 'wanderer'}.
              </p>
              <p className="text-[14px] leading-relaxed max-w-[420px]" style={{ color: MUTED }}>
                Your note is on its way. A travel designer will reply within one working day — usually with a question or two before we start shaping anything.
              </p>
              <button
                onClick={() => { setSent(false); setForm({ name: '', email: '', where: '', message: '' }) }}
                className="mt-2 text-[12px] tracking-[0.14em] font-medium underline underline-offset-4"
                style={{ color: INK }}
              >
                SEND ANOTHER
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="flex flex-col gap-9">
              {FIELDS.map((f) => (
                <label key={f.key} className="group flex flex-col gap-2">
                  <span className="text-[10px] tracking-[0.16em] font-medium" style={{ color: MUTED }}>{f.label.toUpperCase()}</span>
                  <input
                    required={f.key !== 'where'}
                    type={f.type}
                    placeholder={f.placeholder}
                    value={form[f.key]}
                    onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                    className="bg-transparent outline-none border-b pb-3 text-[18px] sm:text-[22px] font-light placeholder:opacity-30 focus:border-current transition-colors duration-300"
                    style={{ borderColor: FAINT, color: INK }}
                  />
                </label>
              ))}
              <label className="group flex flex-col gap-2">
                <span className="text-[10px] tracking-[0.16em] font-medium" style={{ color: MUTED }}>TELL US MORE</span>
                <textarea
                  rows={3}
                  placeholder="What kind of trip are you dreaming about?"
                  value={form.message}
                  onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  className="bg-transparent outline-none border-b pb-3 text-[18px] sm:text-[22px] font-light placeholder:opacity-30 focus:border-current transition-colors duration-300 resize-none"
                  style={{ borderColor: FAINT, color: INK }}
                />
              </label>

              <button
                type="submit"
                className="group self-start inline-flex items-center gap-3 rounded-full px-8 py-4 mt-2 text-[13px] font-medium tracking-[0.08em] transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
                style={{ background: INK, color: BG, fontFamily: "'Barlow', sans-serif" }}
              >
                Send inquiry
                <ArrowUpRight size={15} strokeWidth={2} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </button>
            </form>
          )}
        </div>

        {/* Details column */}
        <div data-reveal className="flex flex-col gap-10 lg:pt-12">
          {DETAILS.map((d) => (
            <div key={d.label} className="flex flex-col gap-2 border-t pt-5" style={{ borderColor: FAINT }}>
              <span className="text-[10px] tracking-[0.16em] font-medium" style={{ color: MUTED }}>{d.label}</span>
              {d.href ? (
                <a
                  href={d.href}
                  target={d.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 text-[18px] sm:text-[20px] font-light w-fit"
                >
                  <span className="relative">
                    {d.value}
                    <span className="absolute left-0 -bottom-0.5 h-px w-full origin-right scale-x-0 group-hover:origin-left group-hover:scale-x-100 transition-transform duration-500" style={{ background: INK }} />
                  </span>
                  <ArrowUpRight size={14} strokeWidth={1.6} className="opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
                </a>
              ) : (
                <span className="text-[18px] sm:text-[20px] font-light">{d.value}</span>
              )}
            </div>
          ))}

          <Link
            to="/destinations"
            className="group inline-flex items-center gap-2 mt-2 text-[12px] tracking-[0.14em] font-medium w-fit"
            style={{ color: MUTED }}
          >
            OR BROWSE THE ATLAS
            <ArrowUpRight size={13} strokeWidth={2} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </Link>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="border-t px-6 sm:px-12 py-10 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: FAINT }}>
        <span className="text-[11px] tracking-[0.12em]" style={{ color: MUTED }}>WANDERFUL™ — VENTURE WITHOUT EDGES</span>
        <Link to="/" className="text-[11px] tracking-[0.12em] underline underline-offset-4" style={{ color: MUTED }}>BACK TO HOME</Link>
      </footer>
    </div>
  )
}
