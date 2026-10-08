import { useState } from 'react';
import { ArrowLeftRight, Copy, Check, Subtitles } from 'lucide-react';

export default function InteractiveTranslatorDemo() {
  const [sourceLang, setSourceLang] = useState('English');
  const [targetLang, setTargetLang] = useState('Tamil');
  const [copied, setCopied] = useState(false);
  const [selectedPhraseIdx, setSelectedPhraseIdx] = useState(0);
  const [showLiveCaptions, setShowLiveCaptions] = useState(true);

  const sampleConversations = [
    {
      title: '🔀 Code-Mixed Everyday Speech',
      badge: 'Code-Mixed Support',
      translations: {
        English: { text: 'What is the schedule for tomorrow morning\'s presentation?', phonetic: 'Standard English' },
        Tamil: { text: 'நாளை காலை பிரசன்டேஷன் ஷெட்யூல் என்ன?', phonetic: 'Naalai kaalai presentation schedule enna? (Tanglish parsed)' },
        Hindi: { text: 'कल सुबह की प्रेजेंटेशन का शेड्यूल क्या है?', phonetic: 'Kal subah ki presentation ka schedule kya hai? (Hinglish parsed)' },
        Telugu: { text: 'రేపు ఉదయం ప్రెజెంటేషన్ షెడ్యూల్ ఏమిటి?', phonetic: 'Repu udayam presentation schedule emiti? (Tenglish parsed)' }
      }
    },
    {
      title: '⚡ Live Conversation & Inquiries',
      badge: 'Real-Time Streaming',
      translations: {
        English: { text: 'Please guide me to the nearest healthcare center immediately.', phonetic: 'Standard English' },
        Tamil: { text: 'தயவுசெய்து என்னை அருகிலுள்ள மருத்துவ மையத்திற்கு வழிகாட்டவும்.', phonetic: 'Thayavuseidhu ennai arugilulla maruthuva maiyathirku vazhikaattavum.' },
        Hindi: { text: 'कृपया मुझे तुरंत नजदीकी स्वास्थ्य केंद्र का रास्ता बताएं।', phonetic: 'Kripaya mujhe turant nazdeeki swasthya kendra ka rasta batayein.' },
        Telugu: { text: 'దయచేసి నన్ను వెంటనే దగ్గరలోని ఆరోగ్య కేంద్రానికి తీసుకెళ్లండి.', phonetic: 'Dayachesi nannu ventane daggaraloni aarogya kendraniki teesukellandi.' }
      }
    },
    {
      title: '🎯 High Translation Quality',
      badge: 'Context Accuracy',
      translations: {
        English: { text: 'We are creating innovative technology to empower every Indian citizen.', phonetic: 'Standard English' },
        Tamil: { text: 'ஒவ்வொரு இந்தியக் குடிமகனையும் மேம்படுத்த புதுமையான தொழில்நுட்பத்தை உருவாக்குகிறோம்.', phonetic: 'Ovvoru indhiyakkudimaganaiyum mempadutha pudhumaiyaana thozhilnutpathai uruvaakkugirom.' },
        Hindi: { text: 'हम प्रत्येक भारतीय नागरिक को सशक्त बनाने के लिए नई तकनीक बना रहे हैं।', phonetic: 'Hum pratyek Bharatiya nagarik ko sashakt banane ke liye nayi takneek bana rahe hain.' },
        Telugu: { text: 'మేము ప్రతి భారతీయ పౌరుడిని శక్తివంతం చేయడానికి కొత్త సాంకేతికతను రూపొందిస్తున్నాం.', phonetic: 'Memu prathi Bharathiya paurudini shakthivantham cheyadaniki kottha saankethikathanu roopondisthunnam.' }
      }
    }
  ];

  const currentPhrase = sampleConversations[selectedPhraseIdx];
  const sourceContent = currentPhrase.translations[sourceLang] || currentPhrase.translations['English'];
  const targetContent = currentPhrase.translations[targetLang] || currentPhrase.translations['Tamil'];

  const swapLanguages = () => {
    const temp = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(temp);
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText(targetContent.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const allLangs = ['English', 'Tamil', 'Hindi', 'Telugu'];

  return (
    <section className="interactive-demo-section" id="demo">
      <div className="container">
        <div className="section-header-block">
          <span className="section-tag">Interactive Preview</span>
          <h2 className="section-title">Experience Real-Time Translation & Live Captions</h2>
          <p className="section-subtitle">
            Test how IndicLive handles code-mixed speech, generates synchronized live captions, and delivers high-accuracy translations across English, Tamil, Hindi, and Telugu.
          </p>
        </div>

        <div className="demo-workbench">
          {/* Quick Scenario Pills */}
          <div className="demo-phrase-pills" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <span className="demo-phrase-label">Select Scenario:</span>
              {sampleConversations.map((scenario, idx) => (
                <button
                  key={idx}
                  className={`phrase-chip ${selectedPhraseIdx === idx ? 'active' : ''}`}
                  onClick={() => setSelectedPhraseIdx(idx)}
                  id={`demo-scenario-btn-${idx}`}
                >
                  {scenario.title}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowLiveCaptions(!showLiveCaptions)}
              className="badge-pill"
              style={{
                background: showLiveCaptions ? 'rgba(0, 229, 255, 0.15)' : 'rgba(255,255,255,0.05)',
                color: showLiveCaptions ? '#00E5FF' : '#94A3B8',
                border: `1px solid ${showLiveCaptions ? 'rgba(0, 229, 255, 0.4)' : 'rgba(255,255,255,0.1)'}`,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <Subtitles size={14} />
              <span>{showLiveCaptions ? 'Live Captions: ON' : 'Live Captions: OFF'}</span>
            </button>
          </div>

          {/* Translation Simulation Box */}
          <div className="demo-translation-grid">
            {/* Source Box */}
            <div className="demo-box" style={{ borderLeft: '3px solid var(--accent-cyan)' }}>
              <div>
                <div className="demo-box-top">
                  <div className="demo-lang-badge">
                    <span style={{ color: 'var(--accent-cyan)' }}>Speaking:</span>
                    <select
                      value={sourceLang}
                      onChange={(e) => setSourceLang(e.target.value)}
                      style={{
                        background: 'rgba(255,255,255,0.08)',
                        color: '#FFF',
                        border: '1px solid rgba(255,255,255,0.15)',
                        padding: '0.35rem 0.75rem',
                        borderRadius: '6px',
                        fontFamily: 'inherit',
                        fontSize: '0.9rem',
                        cursor: 'pointer'
                      }}
                      id="select-source-language"
                    >
                      {allLangs.map((lang) => (
                        <option key={lang} value={lang} style={{ background: '#0F1420', color: '#FFF' }}>
                          {lang}
                        </option>
                      ))}
                    </select>
                  </div>
                  <span className="badge-pill" style={{ background: 'rgba(0, 229, 255, 0.1)', color: '#00E5FF' }}>
                    Speech Ingestion
                  </span>
                </div>

                <div className="demo-main-text">"{sourceContent.text}"</div>
                <div className="demo-romanized">{sourceContent.phonetic}</div>
              </div>

              <div className="demo-box-bottom">
                <div className="sound-wave-container">
                  <div className="sound-bar"></div>
                  <div className="sound-bar"></div>
                  <div className="sound-bar"></div>
                  <div className="sound-bar"></div>
                  <div className="sound-bar"></div>
                </div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Acoustic ASR Stream
                </span>
              </div>
            </div>

            {/* Central Bridge / Swap Controls */}
            <div className="demo-center-bridge">
              <button
                className="bridge-glow-icon"
                onClick={swapLanguages}
                title="Swap source and target languages"
                id="demo-swap-languages-btn"
              >
                <ArrowLeftRight size={22} />
              </button>
              <div className="bridge-latency-pill">&lt; 380ms Latency</div>
            </div>

            {/* Target Box */}
            <div className="demo-box" style={{ borderLeft: '3px solid var(--accent-saffron)' }}>
              <div>
                <div className="demo-box-top">
                  <div className="demo-lang-badge">
                    <span style={{ color: 'var(--accent-saffron)' }}>Translating to:</span>
                    <select
                      value={targetLang}
                      onChange={(e) => setTargetLang(e.target.value)}
                      style={{
                        background: 'rgba(255,255,255,0.08)',
                        color: '#FFF',
                        border: '1px solid rgba(255,255,255,0.15)',
                        padding: '0.35rem 0.75rem',
                        borderRadius: '6px',
                        fontFamily: 'inherit',
                        fontSize: '0.9rem',
                        cursor: 'pointer'
                      }}
                      id="select-target-language"
                    >
                      {allLangs.map((lang) => (
                        <option key={lang} value={lang} style={{ background: '#0F1420', color: '#FFF' }}>
                          {lang}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={handleCopy}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: copied ? '#10B981' : 'var(--text-muted)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      fontSize: '0.8rem'
                    }}
                    title="Copy translated text"
                    id="demo-copy-btn"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>

                <div className="demo-main-text" style={{ color: '#FFD8C9' }}>
                  "{targetContent.text}"
                </div>
                <div className="demo-romanized" style={{ color: '#94A3B8' }}>
                  {targetContent.phonetic}
                </div>
              </div>

              <div className="demo-box-bottom">
                <span style={{ fontSize: '0.8rem', color: '#10B981', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  ✓ Accurate Synthesis
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Target Output
                </span>
              </div>
            </div>
          </div>

          {/* Live Captions Ribbon Simulation */}
          {showLiveCaptions && (
            <div
              style={{
                marginTop: '1.5rem',
                background: 'rgba(0, 0, 0, 0.65)',
                border: '1px solid rgba(0, 229, 255, 0.3)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                flexWrap: 'wrap',
                boxShadow: 'inset 0 0 20px rgba(0, 229, 255, 0.05)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span className="badge-pill" style={{ background: '#10B981', color: '#000', fontWeight: 800, padding: '0.2rem 0.6rem', fontSize: '0.72rem' }}>
                  LIVE CAPTIONS
                </span>
                <span style={{ fontSize: '1.05rem', color: '#FFFFFF', fontWeight: 600 }}>
                  [{targetLang}]: {targetContent.text}
                </span>
              </div>
              <span style={{ fontSize: '0.78rem', color: 'var(--accent-cyan)' }}>
                Speech → Recognition → Translation → Captions
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
