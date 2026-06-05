import React, { Suspense, lazy, useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingSpinner from "./components/LoadingSpinner";
import SEOHead from "./components/SEOHead";
import Header from "./components/Header";
import Footer from "./components/Footer";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Naturopathy = lazy(() => import("./pages/Naturopathy"));
const Reflexologie = lazy(() => import("./pages/Reflexologie"));
const Massage = lazy(() => import("./pages/Massage"));
const Contact = lazy(() => import("./pages/Contact"));
const LegalNotice = lazy(() => import("./pages/LegalNotice"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));

import { EditModeProvider, useEditMode } from "./contexts/EditModeContext";
import { ContentProvider } from "./contexts/ContentContext";

const AdminToolbar = lazy(() => import("./components/admin/AdminToolbar"));
const AdminLoginModal = lazy(
  () => import("./components/admin/AdminLoginModal"),
);
const CookieConsent = lazy(() => import("./components/CookieConsent"));

function DeferredCookieConsent() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setShouldLoad(true), 2500);
    return () => window.clearTimeout(timer);
  }, []);

  if (!shouldLoad) return null;

  return (
    <Suspense fallback={null}>
      <CookieConsent />
    </Suspense>
  );
}

function AdminDetector() {
  const { isAuthenticated, isEditMode } = useEditMode();
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has("admin") && !isAuthenticated) {
      setShowLoginModal(true);
    } else if (!params.has("admin") || isAuthenticated) {
      setShowLoginModal(false);
    }
  }, [isAuthenticated]);

  return (
    <>
      {isEditMode && (
        <Suspense fallback={null}>
          <AdminToolbar />
        </Suspense>
      )}

      {showLoginModal && (
        <Suspense fallback={null}>
          <AdminLoginModal
            isOpen={showLoginModal}
            onClose={() => setShowLoginModal(false)}
          />
        </Suspense>
      )}
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <EditModeProvider>
          <ContentProvider>
            <AdminDetector />

            <div className="min-h-screen flex flex-col bg-stone-25">
              <SEOHead />
              <Header />
              <main className="flex-1">
                <Suspense
                  fallback={
                    <LoadingSpinner message="Chargement de la page..." />
                  }
                >
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/prestations" element={<Services />} />
                    <Route path="/naturopathie" element={<Naturopathy />} />
                    <Route path="/reflexologie" element={<Reflexologie />} />
                    <Route path="/massage-assis" element={<Massage />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/mentions-legales" element={<LegalNotice />} />
                    <Route path="/cgu" element={<TermsOfService />} />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
              <DeferredCookieConsent />
            </div>
          </ContentProvider>
        </EditModeProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
