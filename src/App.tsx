import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ScrollToTop } from './components/ScrollToTop';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProgramPage } from './pages/ProgramPage';
import { GalleryPage } from './pages/GalleryPage';
import { NewsPage } from './pages/NewsPage';
import { NewsDetailPage } from './pages/NewsDetailPage';
import { ContactPage } from './pages/ContactPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AppStoreProvider } from './context/AppStoreContext';

const AppLayout: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <Routes>
        <Route path="/admin" element={<AdminDashboardPage />} />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-stone-900 font-sans selection:bg-blue-600 selection:text-white">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tentang-kami" element={<AboutPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/program" element={<ProgramPage />} />
          <Route path="/programs/:id" element={<ProgramPage />} />
          <Route path="/galeri" element={<GalleryPage />} />
          <Route path="/berita" element={<NewsPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/berita/:slug" element={<NewsDetailPage />} />
          <Route path="/news/:slug" element={<NewsDetailPage />} />
          <Route path="/kontak" element={<ContactPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppStoreProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AppLayout />
      </BrowserRouter>
    </AppStoreProvider>
  );
};

export default App;
