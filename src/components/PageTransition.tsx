import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

interface Props { children: React.ReactNode }

// Replicating the exact original GSAP sweep (Left-to-Right) flawlessly
const CURTAIN_VARIANTS = {
  initial: { scaleX: 1, transformOrigin: 'right center', display: 'block' },
  animate: { scaleX: 0, transition: { duration: 0.6, ease: [0.64, 0, 0.1, 1], delay: 0.1 }, transitionEnd: { display: 'none' } },
  exit: { scaleX: 1, transformOrigin: 'left center', display: 'block', transition: { duration: 0.5, ease: [0.64, 0, 0.1, 1] } }
}

const PAGE_VARIANTS = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4, delay: 0.2 } },
  exit: { opacity: 1, transition: { duration: 0.4 } } // No fade out, stays solid while curtain covers
}

const ROUTE_COLOR: Record<string, string> = {
  '/':            '#060606',
  '/journey':     '#FF8243',
  '/benefits':    '#FFC0CB',
  '/journal':     '#FCE883',
  '/guidebook':   '#069494',
  '/destinations':'#E8D5B7',
  '/experiences': '#FF8243',
  '/gallery':     '#FCE883',
  '/about':       '#069494',
  '/plan':        '#FFC0CB',
}

export default function PageTransition({ children }: Props) {
  const location = useLocation()
  
  const basePath = '/' + location.pathname.split('/')[1]
  const color = ROUTE_COLOR[location.pathname] || ROUTE_COLOR[basePath] || '#0a0a0a'

  return (
    <div style={{ position:'relative' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          onAnimationComplete={() => {
            setTimeout(() => window.dispatchEvent(new Event('resize')), 50)
          }}
        >
          {/* Classic Left-to-Right Solid Wipe Curtain */}
          <motion.div
            variants={CURTAIN_VARIANTS as any}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 999999,
              backgroundColor: color,
              pointerEvents: 'none',
            }}
          />

          {/* Actual Page Content (Only simple opacity, zero position breaking) */}
          <motion.div variants={PAGE_VARIANTS as any} style={{ width: '100%', height: '100%' }}>
            {children}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
