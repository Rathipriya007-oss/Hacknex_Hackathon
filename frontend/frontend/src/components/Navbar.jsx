import { useState } from 'react';
import { Menu, X, Sparkles, Languages } from 'lucide-react';

export default function Navbar({ onStartTranslation }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        {/* Brand Logo */}
        <a href="#hero" className="brand-logo" id="nav-brand-logo">
          <div className="logo-icon-wrap">
            <Languages size={24} color="#00E5FF" />
          </div>
          <div className="brand-text-wrap">
            <span className="brand-name">
              Indic<span>Live</span>
            </span>
            <span className="brand-tag">Real-Time Translation</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <ul className="nav-center-links">
          <li>
            <a href="#languages" className="nav-link" id="nav-link-languages">
              Supported Languages
            </a>
          </li>
          <li>
            <a href="#how-it-works" className="nav-link" id="nav-link-how-it-works">
              How It Works
            </a>
          </li>
          <li>
            <a href="#demo" className="nav-link" id="nav-link-demo">
              Live Preview
            </a>
          </li>
          <li>
            <a href="#features" className="nav-link" id="nav-link-features">
              Features
            </a>
          </li>
        </ul>

        {/* Right CTA and Hackathon Tag */}
        <div className="nav-right-actions">
          <div className="hackathon-pill" title="Problem Statement ID: HNX26EPS03">
            <Sparkles size={14} color="#818CF8" />
            <span>HNX26EPS03</span>
          </div>
          <button
            onClick={onStartTranslation}
            className="btn-primary-glow"
            id="nav-btn-start"
            style={{ padding: '0.65rem 1.4rem', fontSize: '0.92rem' }}
          >
            Start Translation
          </button>
          
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            id="mobile-menu-toggle-btn"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="mobile-nav-panel">
          <div className="hackathon-pill" style={{ alignSelf: 'flex-start' }}>
            <Sparkles size={14} color="#818CF8" />
            <span>Problem Statement: HNX26EPS03</span>
          </div>
          <a
            href="#languages"
            className="nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Supported Languages
          </a>
          <a
            href="#how-it-works"
            className="nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            How It Works
          </a>
          <a
            href="#demo"
            className="nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Live Preview
          </a>
          <a
            href="#features"
            className="nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Features
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onStartTranslation();
            }}
            className="btn-primary-glow"
            style={{ width: '100%', marginTop: '0.5rem' }}
          >
            Start Translation
          </button>
        </div>
      )}
    </nav>
  );
}
