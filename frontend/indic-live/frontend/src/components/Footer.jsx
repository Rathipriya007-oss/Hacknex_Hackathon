import { Languages, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          {/* Brand Info */}
          <div className="footer-brand-info">
            <div className="brand-logo">
              <div className="logo-icon-wrap">
                <Languages size={22} color="#00E5FF" />
              </div>
              <div className="brand-text-wrap">
                <span className="brand-name">
                  Indic<span>Live</span>
                </span>
                <span className="brand-tag">Real-Time Translation</span>
              </div>
            </div>
            <p className="footer-brand-desc">
              Real-time voice and text translation platform for Indic languages. Empowering seamless communication across English, Tamil, Hindi, and Telugu.
            </p>
            <div className="hackathon-pill" style={{ alignSelf: 'flex-start' }}>
              <Sparkles size={14} color="#818CF8" />
              <span>Problem Statement: HNX26EPS03</span>
            </div>
          </div>

          {/* Supported Languages */}
          <div>
            <h4 className="footer-column-title">Supported Languages</h4>
            <ul className="footer-links-list">
              <li>
                <span className="footer-link-item">English (Indian & Global)</span>
              </li>
              <li>
                <span className="footer-link-item">Tamil (தமிழ்)</span>
              </li>
              <li>
                <span className="footer-link-item">Hindi (हिन्दी)</span>
              </li>
              <li>
                <span className="footer-link-item">Telugu (తెలుగు)</span>
              </li>
            </ul>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="footer-column-title">Navigation</h4>
            <ul className="footer-links-list">
              <li>
                <a href="#hero" className="footer-link-item">Home</a>
              </li>
              <li>
                <a href="#languages" className="footer-link-item">Supported Languages</a>
              </li>
              <li>
                <a href="#how-it-works" className="footer-link-item">How It Works</a>
              </li>
              <li>
                <a href="#demo" className="footer-link-item">Live Preview</a>
              </li>
              <li>
                <a href="#features" className="footer-link-item">Innovations</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} IndicLive — Hackathon Project HNX26EPS03. All rights reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span>Built with care for Indic language accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
