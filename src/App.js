import React from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";

import Header from "./global/Header";
import Footer from "./global/Footer";
import ScrollTop from "./global/ScrollTop";
import { FileViewerProvider } from "./global/FileViewerContext";
import { ContactProvider } from "./global/ContactContext";

import Home from "./website/pages/home/Home";
import About from "./website/pages/about/About";
import Affiliates from "./website/pages/affiliates/Affiliates";
import Projects from "./website/pages/projects/Projects";
import NewsEvents from "./website/pages/news/NewsEvents";
import Opportunities from "./website/pages/opportunities/Opportunities";

// The whole admin experience (login, dashboard, every management page) lives
// under src/admin and is mounted here as one router.
import AdminRoutes from "./admin/AdminRoutes";

function NotFound() {
  return (
    <div className="container" style={{ padding: "6rem 1.5rem", textAlign: "center" }}>
      <p className="eyebrow">Error 404</p>
      <h1>We couldn&rsquo;t find that page</h1>
      <p style={{ color: "var(--muted)" }}>The page may have moved, or the link may be mistyped.</p>
      <Link to="/" className="btn btn--primary">
        Back to the home page
      </Link>
    </div>
  );
}

function App() {
  return (
    <FileViewerProvider>
      <ContactProvider>
      <BrowserRouter>
        <ScrollTop />
        <Routes>
          {/* Admin portal has its own layout, no public Header/Footer */}
          <Route path="/admin/*" element={<AdminRoutes />} />

          {/* Public website */}
          <Route
            path="/*"
            element={
              <div className="site">
                <Header />
                <main className="site__main">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/leadership" element={<Navigate to="/about#leadership" replace />} />
                    <Route path="/affiliates" element={<Affiliates />} />
                    <Route path="/what-we-do" element={<Navigate to="/about#what-we-do" replace />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/news-events" element={<NewsEvents />} />
                    <Route path="/resources" element={<Navigate to="/about#resources" replace />} />
                    <Route path="/opportunities" element={<Opportunities />} />
                    <Route path="/contact" element={<Navigate to="/" replace />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
      </ContactProvider>
    </FileViewerProvider>
  );
}

export default App;