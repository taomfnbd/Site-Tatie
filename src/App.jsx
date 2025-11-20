import React, { Suspense, useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import SEOHead from './components/SEOHead';
import CookieConsent from './components/CookieConsent';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Naturopathy from './pages/Naturopathy';
import Massage from './pages/Massage';
import Contact from './pages/Contact';
import LegalNotice from './pages/LegalNotice';
import TermsOfService from './pages/TermsOfService';

// Nouveau système CMS
import { EditModeProvider, useEditMode } from './contexts/EditModeContext';
import { ContentProvider } from './contexts/ContentContext';
import AdminToolbar from './components/admin/AdminToolbar';
import AdminLoginModal from './components/admin/AdminLoginModal';
import VisualEditor from './components/admin/VisualEditor';

// Composant pour détecter ?admin dans l'URL
function AdminDetector() {
  const { isAuthenticated } = useEditMode();
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('admin') && !isAuthenticated) {
      setShowLoginModal(true);
    } else if (!params.has('admin') || isAuthenticated) {
      setShowLoginModal(false);
    }
  }, [isAuthenticated]);

  return (
    <AdminLoginModal
      isOpen={showLoginModal}
      onClose={() => setShowLoginModal(false)}
    />
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <EditModeProvider>
          <ContentProvider>
            {/* Toolbar admin */}
            <AdminToolbar />

            {/* Détecteur de ?admin dans l'URL */}
            <AdminDetector />

            {/* Routes avec Visual Editor */}
            <VisualEditor>
              <div className="min-h-screen flex flex-col bg-stone-25">
                <SEOHead />
                <Header />
                <main className="flex-1">
                  <Suspense fallback={<LoadingSpinner message="Chargement de la page..." />}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/prestations" element={<Services />} />
                      <Route path="/naturopathie" element={<Naturopathy />} />
                      <Route path="/massage-assis" element={<Massage />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/mentions-legales" element={<LegalNotice />} />
                      <Route path="/cgu" element={<TermsOfService />} />
                    </Routes>
                  </Suspense>
                </main>
                <Footer />
                <CookieConsent />
              </div>
            </VisualEditor>
          </ContentProvider>
        </EditModeProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
