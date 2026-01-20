import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Loader from './components/common/Loader';
import ScrollToTop from './components/common/ScrollToTop';
import Home from './pages/Home';
import Schemes from './pages/Schemes';
import Apply from './pages/Apply';
import About from './pages/About';
import Contact from './pages/Contact';
import Services from './pages/Services';
import Projects from './pages/Project';
import AddProject from './pages/AddProject';
import AdminDashboard from './admin/AdminDashboard';
import './admin/AdminDashboard.css';
import './App.css';

const AppContent = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Show loader briefly on initial mount
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {loading && <Loader />}
      <div className="App" style={{ opacity: loading ? 0.8 : 1 }}>
        {!isAdmin && <Navbar />}
        <main className={isAdmin ? '' : 'main-content'}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/schemes" element={<Schemes />} />
            <Route path="/apply" element={<Apply />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/add-project" element={<AddProject />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        {!isAdmin && <Footer />}
      </div>
    </>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;