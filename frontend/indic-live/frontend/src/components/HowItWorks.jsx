import { Mic, AudioWaveform, Languages, Subtitles, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      phase: 'Step 1',
      icon: <Mic size={26} />,
      title: 'Speech',
      subtitle: 'Audio Ingestion',
      description: 'Continuous microphone or audio stream ingestion capturing natural, fast, and code-mixed conversational speech.'
    },
    {
      number: '02',
      phase: 'Step 2',
      icon: <AudioWaveform size={26} />,
      title: 'Recognition',
      subtitle: 'ASR & Phonetics',
      description: 'Ultra-low latency automatic speech recognition that accurately decodes phonetic nuances in English, Tamil, Hindi, & Telugu.'
    },
    {
      number: '03',
      phase: 'Step 3',
      icon: <Languages size={26} />,
      title: 'Translation',
      subtitle: 'Neural MT Core',
      description: 'Contextual Indic machine translation translating colloquialisms and domain vocabulary into the target language.'
    },
    {
      number: '04',
      phase: 'Step 4',
      icon: <Subtitles size={26} />,
      title: 'Captions',
      subtitle: 'Real-Time Display',
      description: 'Instant synchronized delivery of live translated captions and synthesized audio output with sub-second response times.'
    }
  ];

  return (
    <section className="how-it-works-section" id="how-it-works">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-block">
          <span className="section-tag">Streaming Architecture</span>
          <h2 className="section-title">The IndicLive Streaming Pipeline</h2>
          <p className="section-subtitle">
            An end-to-end real-time processing pipeline engineered for low-latency voice translation and live caption generation.
          </p>
        </div>

        {/* Pipeline Flow Banner */}
        <div className="pipeline-flow-banner" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(0, 229, 255, 0.25)',
          borderRadius: 'var(--radius-full)',
          padding: '0.85rem 2rem',
          maxWidth: '820px',
          margin: '0 auto 3.5rem auto',
          boxShadow: '0 0 30px rgba(0, 229, 255, 0.1)'
        }}>
          <span style={{ fontWeight: 800, color: 'var(--accent-cyan)', fontSize: '0.88rem', letterSpacing: '0.05em' }}>
            STREAMING PIPELINE:
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#FFFFFF', fontWeight: 600, fontSize: '0.92rem', flexWrap: 'wrap' }}>
            <span style={{ color: '#00E5FF' }}>Speech</span>
            <ArrowRight size={16} color="#64748B" />
            <span style={{ color: '#818CF8' }}>Recognition</span>
            <ArrowRight size={16} color="#64748B" />
            <span style={{ color: '#FF6B35' }}>Translation</span>
            <ArrowRight size={16} color="#64748B" />
            <span style={{ color: '#10B981' }}>Captions</span>
          </div>
        </div>

        {/* 4 Pipeline Step Cards */}
        <div className="pipeline-steps-grid">
          {steps.map((step, idx) => (
            <div key={idx} className="pipeline-step-card" id={`pipeline-step-${idx}`}>
              <div className="step-number-badge">{step.number}</div>
              <div className="step-icon-wrap">{step.icon}</div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {step.subtitle}
              </span>
              <h3 className="step-title" style={{ marginTop: '0.25rem', marginBottom: '0.5rem' }}>
                {step.title}
              </h3>
              <p className="step-description">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
