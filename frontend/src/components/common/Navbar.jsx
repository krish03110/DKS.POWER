import { useState, useEffect } from 'react';
import logo from '../../dks.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const commonLinks = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services' },
    { to: '/schemes', label: 'Schemes' },
    { to: '/apply', label: 'Apply' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
    { to: '/projects', label: 'Projects' }
  ];

  const authLinks = isAuthenticated ? [
    { to: '/logout', label: 'Logout' }
  ] : [];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="nav-brand">
          <Link to="/" className="logo">
            <img src={logo} alt="DKS Marketing" className="logo-img" />
          </Link>
          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`} />
            <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`} />
            <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`} />
          </button>
        </div>

        <ul className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
          {[...commonLinks, ...authLinks].map((link) => (
            <li key={link.to}>
              {link.to === '/logout' ? (
                <button
                  className="nav-link"
                  onClick={() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    setIsAuthenticated(false);
                    setIsMenuOpen(false);
                    navigate('/');
                  }}
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  to={link.to}
                  className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
