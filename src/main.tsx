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

import TripDetailPage from './pages/TripDetailPage.tsx'

import PageTransition  from './components/PageTransition.tsx'
import LenisProvider   from './components/LenisProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <LenisProvider>
        <PageTransition>
          <Routes>
            {/* ── Primary (in navbar) ── */}
            <Route path="/"           element={<App />} />
            <Route path="/journey"    element={<JourneyPage />} />
            <Route path="/journal"    element={<JournalPage />} />
            <Route path="/guidebook"  element={<GuidebookPage />} />
            <Route path="/about"      element={<AboutPage />} />

            {/* ── Secondary (linked from within pages) ── */}
            <Route path="/journey/:slug" element={<TripDetailPage />} />
            <Route path="/destinations" element={<DestinationsPage />} />
            <Route path="/experiences"  element={<ExperiencesPage />} />
            <Route path="/gallery"      element={<GalleryPage />} />
            <Route path="/benefits"     element={<BenefitsPage />} />
            <Route path="/plan"         element={<PlanPage />} />
          </Routes>
        </PageTransition>
      </LenisProvider>

    </BrowserRouter>
  </StrictMode>,
)
