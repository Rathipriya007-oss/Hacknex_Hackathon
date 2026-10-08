import { Zap, Shuffle, Subtitles, Globe2, GitFork, Award } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <Zap size={24} />,
      title: 'Real-Time Translation',
      tag: 'Low Latency',
      description: 'Live translation with ultra-low latency processing, streaming translated output in real time for effortless conversations.'
    },
    {
      icon: <Shuffle size={24} />,
      title: 'Code-Mixed Speech',
      tag: 'Indic Hybrid',
      description: 'Specially engineered to recognize and interpret natural code-mixed English and Indic language speech (Hinglish, Tanglish, Tenglish).'
    },
    {
      icon: <Subtitles size={24} />,
      title: 'Live Captions',
      tag: 'Synchronized',
      description: 'Displays translated text dynamically as speech is processed, generating instant readable captions on screen.'
    },
    {
      icon: <Globe2 size={24} />,
      title: 'Multiple Indic Languages',
      tag: '4 Foundational',
      description: 'Deep bidirectional support across English, Tamil (தமிழ்), Hindi (हिन्दी), and Telugu (తెలుగు).'
    },
    {
      icon: <GitFork size={24} />,
      title: 'Streaming Pipeline',
      tag: 'End-to-End',
      description: 'Continuous four-stage streaming architecture: Speech → Recognition → Translation → Captions without buffering delays.'
    },
    {
      icon: <Award size={24} />,
      title: 'Translation Quality',
      tag: 'Context Aware',
      description: 'Trained and optimized for real-world conversational speech, capturing regional nuances, colloquial expressions, and context.'
    }
  ];

  return (
    <section className="features-section" id="features">
      <div className="container">
        <div className="section-header-block">
          <span className="section-tag">Core Capabilities</span>
          <h2 className="section-title">Built for Indian Multilingual Reality</h2>
          <p className="section-subtitle">
            Engineered to overcome low-latency requirements, code-mixed dialogue, and high translation accuracy across major Indic languages.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feat, idx) => (
            <div key={idx} className="feature-card" id={`feature-card-${idx}`}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div className="feature-icon-box" style={{ marginBottom: 0 }}>
                  {feat.icon}
                </div>
                <span className="badge-pill" style={{ background: 'rgba(255, 107, 53, 0.1)', color: 'var(--accent-saffron)', border: '1px solid rgba(255, 107, 53, 0.25)', fontSize: '0.72rem' }}>
                  {feat.tag}
                </span>
              </div>
              <h3 className="feature-title">{feat.title}</h3>
              <p className="feature-desc">{feat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
