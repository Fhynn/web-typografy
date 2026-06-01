import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

import App             from './App.tsx'
import JourneyPage     from './pages/JourneyPage.tsx'
import BenefitsPage    from './pages/BenefitsPage.tsx'
import JournalPage     from './pages/JournalPage.tsx'
import GuidebookPage   from './pages/GuidebookPage.tsx'
import DestinationsPage from './pages/DestinationsPage.tsx'
import ExperiencesPage from './pages/ExperiencesPage.tsx'
import GalleryPage     from './pages/GalleryPage.tsx'
import AboutPage       from './pages/AboutPage.tsx'
import PlanPage        from './pages/PlanPage.tsx'
import ContactPage     from './pages/ContactPage.tsx'
import NotFoundPage    from './pages/NotFoundPage.tsx'

import TripDetailPage        from './pages/TripDetailPage.tsx'
import DestinationDetailPage from './pages/DestinationDetailPage.tsx'

import PageTransition  from './components/PageTransition.tsx'
import LenisProvider   from './components/LenisProvider.tsx'
import CustomCursor    from './components/CustomCursor.tsx'
import Preloader       from './components/Preloader.tsx'
import ReducedMotionGuard from './components/ReducedMotionGuard.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <LenisProvider>
        <Preloader />
        <CustomCursor />
        <ReducedMotionGuard />
        <PageTransition>
          <Routes>
            {/* ── Primary (in navbar) ── */}
            <Route path="/"           element={<App />} />
            <Route path="/journey"    element={<JourneyPage />} />
            <Route path="/journal"    element={<JournalPage />} />
            <Route path="/guidebook"  element={<GuidebookPage />} />
            <Route path="/about"      element={<AboutPage />} />
            <Route path="/contact"    element={<ContactPage />} />

            {/* ── Secondary (linked from within pages) ── */}
            <Route path="/journey/:slug"      element={<TripDetailPage />} />
            <Route path="/destinations"       element={<DestinationsPage />} />
            <Route path="/destinations/:slug" element={<DestinationDetailPage />} />
            <Route path="/experiences"  element={<ExperiencesPage />} />
            <Route path="/gallery"      element={<GalleryPage />} />
            <Route path="/benefits"     element={<BenefitsPage />} />
            <Route path="/plan"         element={<PlanPage />} />

            {/* ── Catch-all 404 ── */}
            <Route path="*"             element={<NotFoundPage />} />
          </Routes>
        </PageTransition>
      </LenisProvider>

    </BrowserRouter>
  </StrictMode>,
)
