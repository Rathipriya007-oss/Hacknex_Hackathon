import { useState } from 'react';
import { Users } from 'lucide-react';

export default function SupportedLanguages() {
  const [selectedLang, setSelectedLang] = useState('Tamil');

  const languages = [
    {
      id: 'english',
      name: 'English',
      nativeScript: 'English',
      code: 'EN',
      family: 'Global Lingua Franca',
      accentColor: '#6366F1',
      glowColor: 'rgba(99, 102, 241, 0.25)',
      samplePhrase: 'Hello, welcome to IndicLive!',
      meaning: 'Universal greeting across multilingual regions',
      speakers: '1.4+ Billion Global / 130M+ India',
      scriptName: 'Latin Script',
      dialects: ['Indian English', 'Standard Global', 'Neutral Accent']
    },
    {
      id: 'tamil',
      name: 'Tamil',
      nativeScript: 'தமிழ்',
      code: 'TA',
      family: 'Classical Dravidian Language',
      accentColor: '#10B981',
      glowColor: 'rgba(16, 185, 129, 0.25)',
      samplePhrase: 'வணக்கம், உங்கள் நாள் இனிதாக அமையட்டும்!',
      meaning: 'Hello, may your day be wonderful!',
      speakers: '85+ Million Speakers',
      scriptName: 'Tamil Script (தமிழ் அரிச்சுவடி)',
      dialects: ['Chennai', 'Kongu', 'Madurai', 'Sri Lankan']
    },
    {
      id: 'hindi',
      name: 'Hindi',
      nativeScript: 'हिन्दी',
      code: 'HI',
      family: 'Indo-Aryan Language',
      accentColor: '#FF6B35',
      glowColor: 'rgba(255, 107, 53, 0.25)',
      samplePhrase: 'नमस्ते! आप सभी का स्वागत है।',
      meaning: 'Greetings! Everyone is warmly welcomed.',
      speakers: '600+ Million Speakers',
      scriptName: 'Devanagari Script (देवनागरी)',
      dialects: ['Khariboli (Standard)', 'Bhojpuri', 'Awadhi', 'Braj']
    },
    {
      id: 'telugu',
      name: 'Telugu',
      nativeScript: 'తెలుగు',
      code: 'TE',
      family: 'Dravidian Language',
      accentColor: '#00E5FF',
      glowColor: 'rgba(0, 229, 255, 0.25)',
      samplePhrase: 'నమస్కారం! మీరు ఎలా ఉన్నారు?',
      meaning: 'Greetings! How are you doing?',
      speakers: '95+ Million Speakers',
      scriptName: 'Telugu Script (తెలుగు లిపి)',
      dialects: ['Coastal Andhra', 'Rayalaseema', 'Telangana']
    }
  ];

  return (
    <section className="languages-section" id="languages">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-block">
          <span className="section-tag">Linguistic Matrix</span>
          <h2 className="section-title">Supported Languages</h2>
          <p className="section-subtitle">
            IndicLive delivers real-time voice and text bidirectional translation across the four foundational languages of modern Indian commerce and communication.
          </p>
        </div>

        {/* 4 Supported Languages Grid */}
        <div className="languages-grid">
          {languages.map((lang) => {
            const isSelected = selectedLang === lang.name;
            return (
              <div
                key={lang.id}
                className="language-card"
                style={{
                  '--card-accent': lang.accentColor,
                  '--card-glow': lang.glowColor,
                  borderColor: isSelected ? lang.accentColor : undefined
                }}
                onClick={() => setSelectedLang(lang.name)}
                id={`lang-card-${lang.id}`}
              >
                {/* Card Top */}
                <div className="lang-card-top">
                  <div className="lang-native-script" style={{ color: lang.accentColor }}>
                    {lang.nativeScript}
                  </div>
                  <span className="lang-badge-pill">{lang.code}</span>
                </div>

                {/* Language Names */}
                <div>
                  <h3 className="lang-name-en">{lang.name}</h3>
                  <p className="lang-family-text">{lang.family}</p>
                </div>

                {/* Sample Phrase Box */}
                <div className="lang-sample-box">
                  <div className="lang-sample-label">Sample Expression</div>
                  <div className="lang-sample-phrase">"{lang.samplePhrase}"</div>
                  <div className="lang-sample-meaning">{lang.meaning}</div>
                </div>

                {/* Dialects / Script Info */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    <strong style={{ color: '#E2E8F0' }}>Script:</strong> {lang.scriptName}
                  </div>
                  <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                    {lang.dialects.map((d, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: '0.7rem',
                          padding: '0.15rem 0.45rem',
                          background: 'rgba(255,255,255,0.04)',
                          borderRadius: '4px',
                          color: '#CBD5E1'
                        }}
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Meta Footer */}
                <div className="lang-meta-footer">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Users size={14} color="#94A3B8" /> {lang.speakers}
                  </span>
                  <span style={{ color: lang.accentColor, fontWeight: 600, fontSize: '0.75rem' }}>
                    ✓ Full Voice Support
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
