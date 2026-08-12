import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import MobileActionBar from '@/components/MobileActionBar';
import { useScrollToTop } from '@/lib/useScrollToTop';

const HomePage = lazy(() => import('@/pages/HomePage'));
const MenuPage = lazy(() => import('@/pages/MenuPage'));
const OurStoryPage = lazy(() => import('@/pages/OurStoryPage'));
const GalleryPage = lazy(() => import('@/pages/GalleryPage'));
const ReviewsPage = lazy(() => import('@/pages/ReviewsPage'));
const VisitPage = lazy(() => import('@/pages/VisitPage'));

function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center paper-bg">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-gold/30 border-t-gold" />
        <p className="text-sm text-charcoal/50">Loading…</p>
      </div>
    </div>
  );
}

function AppContent() {
  useScrollToTop();
  return (
    <>
      <Navigation />
      <main>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/our-story" element={<OurStoryPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/visit" element={<VisitPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <MobileActionBar />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
