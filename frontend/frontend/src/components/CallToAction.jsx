import { ArrowRight, Sparkles } from 'lucide-react';

export default function CallToAction({ onStartTranslation }) {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-banner">
          <div className="cta-content">
            <div className="hackathon-pill">
              <Sparkles size={14} color="#818CF8" />
              <span>HNX26EPS03 • Hackathon Project</span>
            </div>

            <h2 className="cta-title">
              Ready to Break Linguistic Barriers with <span className="gradient-text-saffron">IndicLive</span>?
            </h2>

            <p className="cta-subtitle">
              Experience seamless voice-to-voice and text translation across English, Tamil, Hindi, and Telugu in real time.
            </p>

            <button
              onClick={onStartTranslation}
              className="btn-primary-glow"
              id="cta-btn-start-translation"
              style={{ fontSize: '1.25rem', padding: '1.2rem 3rem' }}
            >
              <span>Start Translation</span>
              <ArrowRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
