import { useState } from 'react';
import { ArrowRight, ArrowLeftRight, CheckCircle2, Zap } from 'lucide-react';

export default function Hero({ onStartTranslation }) {
  const [activeTab, setActiveTab] = useState(0);

  const heroDemos = [
    {
      sourceLang: 'Tamil',
      sourceText: 'வணக்கம்! நீங்கள் எப்படி இருக்கிறீர்கள்?',
      sourcePhonetic: 'Vanakkam! Neengal eppadi irukkireergal?',
      targetLang: 'English',
      targetText: 'Hello! How are you doing today?',
      targetPhonetic: 'Instant real-time translation'
    },
    {
      sourceLang: 'Hindi',
      sourceText: 'हम मिलकर एक नया भारत बना रहे हैं।',
      sourcePhonetic: 'Hum milkar ek naya Bharat bana rahe hain.',
      targetLang: 'Telugu',
      targetText: 'మనం కలిసి కొత్త భారతాన్ని నిర్మిస్తున్నాం.',
      targetPhonetic: 'Manam kalisi kottha Bharatanni nirmistunnam.'
    },
    {
      sourceLang: 'English',
      sourceText: 'Welcome to IndicLive speech translator.',
      sourcePhonetic: 'Speak naturally into your device.',
      targetLang: 'Tamil',
      targetText: 'இண்டிக்லைவ் மொழிபெயர்ப்பாளருக்கு நல்வரவு.',
      targetPhonetic: 'Indiklaiv mozhibeyarppaalarukku nalvaravu.'
    }
  ];

  const current = heroDemos[activeTab];

  return (
    <section className="hero-section" id="hero">
      <div className="container">
        <div className="hero-grid">
          {/* Left Column: Core Value Proposition */}
          <div className="hero-content">
            {/* Hackathon Problem Statement Tag */}
            <div className="problem-badge" id="hero-problem-badge">
              <span className="problem-badge-id">HNX26EPS03</span>
              <span>Live Translation for Indic Languages</span>
            </div>

            {/* Application Name */}
            <h1 className="hero-title">
              <span className="gradient-text-saffron">IndicLive</span>
            </h1>

            {/* Subtitle */}
            <h2 className="hero-subtitle">
              <Zap size={22} color="#00E5FF" />
              <span>Real-Time Indic Language Translation</span>
            </h2>

            {/* Short Description */}
            <p className="hero-description">
              Speak naturally in one language and effortlessly receive instant, accurate translations in another. IndicLive connects India's rich linguistic diversity through seamless real-time voice and text conversion.
            </p>

            {/* CTA Group with Large Start Translation Button */}
            <div className="hero-cta-group">
              <button
                onClick={onStartTranslation}
                className="btn-primary-glow"
                id="hero-btn-start-translation"
                style={{ fontSize: '1.2rem', padding: '1.15rem 2.8rem' }}
              >
                <span>Start Translation</span>
                <ArrowRight size={22} />
              </button>

              <a href="#languages" className="btn-secondary" id="hero-btn-explore-languages">
                <span>View Supported Languages</span>
              </a>
            </div>

            {/* Quick Metrics Bar */}
            <div className="hero-stats-mini">
              <div className="mini-stat-item">
                <span className="mini-stat-val">4</span>
                <span className="mini-stat-label">Key Languages</span>
              </div>
              <div className="mini-stat-item">
                <span className="mini-stat-val">&lt; 500ms</span>
                <span className="mini-stat-label">Target Latency</span>
              </div>
              <div className="mini-stat-item">
                <span className="mini-stat-val">Bidirectional</span>
                <span className="mini-stat-label">Voice & Text Flow</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Translation Card Visual */}
          <div className="hero-visual">
            <div className="hero-mockup-card">
              {/* Mockup Header */}
              <div className="mockup-header">
                <div className="mockup-status">
                  <span className="badge-live-dot"></span>
                  <span>Live Translation Stream Ready</span>
                </div>
                <div className="sound-wave-container" title="Audio streaming visualizer">
                  <div className="sound-bar"></div>
                  <div className="sound-bar"></div>
                  <div className="sound-bar"></div>
                  <div className="sound-bar"></div>
                  <div className="sound-bar"></div>
                  <div className="sound-bar"></div>
                  <div className="sound-bar"></div>
                </div>
              </div>

              {/* Language Selector Preview Bar */}
              <div className="lang-selector-bar">
                <div className="lang-pill-btn">
                  <span>{current.sourceLang}</span>
                </div>
                <button
                  className="swap-icon-btn"
                  onClick={() => setActiveTab((prev) => (prev + 1) % heroDemos.length)}
                  title="Switch sample scenario"
                  id="btn-switch-sample"
                >
                  <ArrowLeftRight size={16} />
                </button>
                <div className="lang-pill-btn">
                  <span>{current.targetLang}</span>
                </div>
              </div>

              {/* Translation Panels Mockup */}
              <div className="translation-panels-mock">
                {/* Source Speech Box */}
                <div className="speech-box input-box">
                  <div className="speech-box-header">
                    <span>Input Language ({current.sourceLang})</span>
                    <span style={{ color: '#00E5FF' }}>Voice Stream</span>
                  </div>
                  <div className="speech-box-text">"{current.sourceText}"</div>
                  <div className="speech-box-transliteration">{current.sourcePhonetic}</div>
                </div>

                {/* Target Output Box */}
                <div className="speech-box output-box">
                  <div className="speech-box-header">
                    <span style={{ color: '#FF9E79' }}>Translated Output ({current.targetLang})</span>
                    <span style={{ color: '#10B981' }}>Synchronized</span>
                  </div>
                  <div className="speech-box-text" style={{ color: '#FFD1BF' }}>
                    "{current.targetText}"
                  </div>
                  <div className="speech-box-transliteration" style={{ color: '#94A3B8' }}>
                    {current.targetPhonetic}
                  </div>
                </div>
              </div>

              {/* Mockup Footer */}
              <div className="mockup-footer">
                <span>⚡ Zero acoustic loss engine</span>
                <span style={{ color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <CheckCircle2 size={14} /> Ready for live session
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
