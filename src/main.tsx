import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import JourneyPage from './pages/JourneyPage.tsx'
import BenefitsPage from './pages/BenefitsPage.tsx'
import JournalPage from './pages/JournalPage.tsx'
import GuidebookPage from './pages/GuidebookPage.tsx'
import PageTransition from './components/PageTransition.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <PageTransition>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/journey" element={<JourneyPage />} />
          <Route path="/benefits" element={<BenefitsPage />} />
          <Route path="/journal" element={<JournalPage />} />
          <Route path="/guidebook" element={<GuidebookPage />} />
        </Routes>
      </PageTransition>
    </BrowserRouter>
  </StrictMode>,
)
