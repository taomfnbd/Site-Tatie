import React, { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import ErrorBoundary from "./components/ErrorBoundary";
import SEOHead from "./components/SEOHead";
import NavigationEffects from "./components/NavigationEffects";
import Breadcrumbs from "./components/Breadcrumbs";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { EditModeProvider, useEditMode } from "./contexts/EditModeContext";
import { ContentProvider } from "./contexts/ContentContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Naturopathy from "./pages/Naturopathy";
import Reflexologie from "./pages/Reflexologie";
import Massage from "./pages/Massage";
import Contact from "./pages/Contact";
import LegalNotice from "./pages/LegalNotice";
import TermsOfService from "./pages/TermsOfService";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";
const AdminToolbar = lazy(() => import("./components/admin/AdminToolbar"));
const AdminLoginModal = lazy(
  () => import("./components/admin/AdminLoginModal"),
);
function AdminDetector() {
  const { isAuthenticated, isEditMode, enableEditMode } = useEditMode();
  const location = useLocation();
  const [dismissed, setDismissed] = useState(false);
  const requested = new URLSearchParams(location.search).has("admin");
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  useEffect(() => setDismissed(false), [requested]);
  if (!mounted) return null;
  return (
    <Suspense fallback={null}>
      {isEditMode && <AdminToolbar />}
      {requested && isAuthenticated && !isEditMode && (
        <button
          onClick={enableEditMode}
          className="fixed bottom-4 right-4 z-50 bg-stone-900 text-white rounded-full px-5 py-3 shadow-lg"
        >
          Revenir à l’édition
        </button>
      )}
      {requested && !isAuthenticated && !dismissed && (
        <AdminLoginModal isOpen onClose={() => setDismissed(true)} />
      )}
    </Suspense>
  );
}
export default function App() {
  return (
    <ErrorBoundary>
      <MotionConfig reducedMotion="user">
        <EditModeProvider>
          <ContentProvider>
            <AdminDetector />
            <NavigationEffects />
            <a href="#main-content" className="skip-link">
              Aller au contenu
            </a>
            <div className="min-h-screen flex flex-col bg-stone-25">
              <SEOHead />
              <Header />
              <main
                id="main-content"
                tabIndex={-1}
                className="flex-1 focus:outline-none"
              >
                <Breadcrumbs />
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
                  <Route path="/confidentialite" element={<Privacy />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </ContentProvider>
        </EditModeProvider>
      </MotionConfig>
    </ErrorBoundary>
  );
}
