import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Languages,
  ArrowLeft,
  ArrowLeftRight,
  Mic,
  MicOff,
  Copy,
  Check,
  Subtitles,
  Activity,
  Zap,
  Sparkles,
  CheckCircle2,
  Radio,
  ArrowRight,
  Play,
  RotateCcw,
  Layers
} from 'lucide-react';
import '../styles/workspace.css';

export default function TranslateWorkspace() {
  const [sourceLang, setSourceLang] = useState('Tamil');
  const [targetLang, setTargetLang] = useState('English');
  
  // Status states: 'Ready' | 'Listening' | 'Translating' | 'Complete'
  const [status, setStatus] = useState('Ready');
  
  const [copiedTarget, setCopiedTarget] = useState(false);
  const [copiedSource, setCopiedSource] = useState(false);

  // Exact Hackathon demo scenarios
  const sampleScenarios = [
    {
      id: 'default',
      label: 'Meeting Inquiry (Default)',
      sourceLang: 'Tamil',
      targetLang: 'English',
      sourceText: 'நாளைக்கு meeting எத்தனை மணிக்கு?',
      sourcePhonetic: 'Naalaikku meeting ethanai manikku?',
      targetText: 'What time is the meeting tomorrow?',
      targetPhonetic: 'Natural English synthesized translation',
      detectedBadge: 'Tamil + English',
      isCodeMixed: true
    },
    {
      id: 'tamil_speech',
      label: 'Tamil Greeting',
      sourceLang: 'Tamil',
      targetLang: 'English',
      sourceText: 'வணக்கம்! இன்று நாம் புதிய தொழில்நுட்பத்தைப் பற்றி பேசுகிறோம்.',
      sourcePhonetic: 'Vanakkam! Indru naam pudhiya thozhilnutpathai patri pesugirom.',
      targetText: 'Hello! Today we are discussing about new technology innovations.',
      targetPhonetic: 'Conversational English',
      detectedBadge: 'Tamil (தமிழ்)',
      isCodeMixed: false
    },
    {
      id: 'hindi_dialogue',
      label: 'Hindi Dialogue',
      sourceLang: 'Hindi',
      targetLang: 'Telugu',
      sourceText: 'नमस्ते, क्या आप मुझे नजदीकी मेट्रो स्टेशन का रास्ता बता सकते हैं?',
      sourcePhonetic: 'Namaste, kya aap mujhe nazdeeki metro station ka rasta bata sakte hain?',
      targetText: 'నమస్కారం, మీరు నాకు దగ్గరలోని మెట్రో స్టేషన్ మార్గం చెప్పగలరా?',
      targetPhonetic: 'Telugu conversational script output',
      detectedBadge: 'Hindi (हिन्दी)',
      isCodeMixed: false
    },
    {
      id: 'telugu_speech',
      label: 'Telugu Speech',
      sourceLang: 'Telugu',
      targetLang: 'English',
      sourceText: 'నమస్కారం! ఈ ప్రాజెక్ట్ గ్రామీణ ప్రజలకు చాలా ఉపయోగపడుతుంది.',
      sourcePhonetic: 'Namaskaram! Ee project grameena prajalaku chaala upayogapaduthundi.',
      targetText: 'Greetings! This project will be extremely beneficial for rural communities.',
      targetPhonetic: 'Fluent English interpretation',
      detectedBadge: 'Telugu (తెలుగు)',
      isCodeMixed: false
    }
  ];

  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);
  const currentScenario = sampleScenarios[activeScenarioIdx];

  const [displayedSource, setDisplayedSource] = useState(currentScenario.sourceText);
  const [displayedTarget, setDisplayedTarget] = useState(currentScenario.targetText);

  const simulationTimerRef = useRef(null);

  const handleScenarioChange = (idx) => {
    setActiveScenarioIdx(idx);
    const selected = sampleScenarios[idx];
    setSourceLang(selected.sourceLang);
    setTargetLang(selected.targetLang);
    setDisplayedSource(selected.sourceText);
    setDisplayedTarget(selected.targetText);
    setStatus('Ready');
    if (simulationTimerRef.current) clearTimeout(simulationTimerRef.current);
  };

  // Run Hackathon Demo Simulation: Ready -> Listening -> Translating -> Complete
  const runDemoSimulation = () => {
    if (simulationTimerRef.current) clearTimeout(simulationTimerRef.current);

    setStatus('Listening');
    setDisplayedSource('Listening to audio stream...');
    setDisplayedTarget('Waiting for speech recognition...');

    simulationTimerRef.current = setTimeout(() => {
      setStatus('Translating');
      setDisplayedSource(currentScenario.sourceText);
      setDisplayedTarget('Neural translation in progress...');

      simulationTimerRef.current = setTimeout(() => {
        setStatus('Complete');
        setDisplayedTarget(currentScenario.targetText);
      }, 1300);
    }, 1500);
  };

  const handleToggleMic = () => {
    if (status === 'Ready' || status === 'Complete') {
      runDemoSimulation();
    } else {
      if (simulationTimerRef.current) clearTimeout(simulationTimerRef.current);
      setStatus('Ready');
      setDisplayedSource(currentScenario.sourceText);
      setDisplayedTarget(currentScenario.targetText);
    }
  };

  const handleReset = () => {
    if (simulationTimerRef.current) clearTimeout(simulationTimerRef.current);
    setStatus('Ready');
    setDisplayedSource(currentScenario.sourceText);
    setDisplayedTarget(currentScenario.targetText);
  };

  const handleSwapLanguages = () => {
    const temp = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(temp);
  };

  const handleCopyTarget = () => {
    navigator.clipboard?.writeText(displayedTarget);
    setCopiedTarget(true);
    setTimeout(() => setCopiedTarget(false), 2000);
  };

  const handleCopySource = () => {
    navigator.clipboard?.writeText(displayedSource);
    setCopiedSource(true);
    setTimeout(() => setCopiedSource(false), 2000);
  };

  useEffect(() => {
    return () => {
      if (simulationTimerRef.current) clearTimeout(simulationTimerRef.current);
    };
  }, []);

  const languageOptions = ['Tamil', 'English', 'Hindi', 'Telugu'];

  return (
    <div className="workspace-page">
      {/* Ambient Lighting Background */}
      <div className="ambient-bg">
        <div className="ambient-orb ambient-orb-1"></div>
        <div className="ambient-orb ambient-orb-2"></div>
        <div className="ambient-orb ambient-orb-3"></div>
        <div className="grid-overlay"></div>
      </div>

      {/* 4. Top Navigation Bar */}
      <header className="ws-navbar">
        <div className="container ws-nav-container">
          {/* IndicLive logo/name & Back to Home */}
          <div className="ws-nav-left">
            <Link to="/" className="btn-back-home" id="btn-back-to-home">
              <ArrowLeft size={16} />
              <span>Back to Home</span>
            </Link>

            <Link to="/" className="brand-logo" style={{ textDecoration: 'none' }}>
              <div className="logo-icon-wrap" style={{ width: 36, height: 36 }}>
                <Languages size={18} color="#00E5FF" />
              </div>
              <div className="brand-text-wrap">
                <span className="brand-name" style={{ fontSize: '1.25rem' }}>
                  Indic<span>Live</span>
                </span>
              </div>
            </Link>
          </div>

          {/* Badges: Status, Language Detected, Latency, Code-Mixed */}
          <div className="ws-nav-telemetry">
            {/* 11. Status: Ready */}
            <div
              className={`telemetry-pill ${
                status === 'Listening'
                  ? 'status-listening'
                  : status === 'Translating'
                  ? 'status-translating'
                  : status === 'Complete'
                  ? 'status-complete'
                  : 'status-ready'
              }`}
              id="telemetry-status-pill"
            >
              <Radio size={13} className={status === 'Listening' || status === 'Translating' ? 'animate-pulse' : ''} />
              <span>
                Status: <strong>{status}</strong>
              </span>
            </div>

            {/* 10. Language Detected: Tamil + English */}
            <div className="telemetry-pill" id="telemetry-lang-detected">
              <Activity size={13} color="#00E5FF" />
              <span>
                Language Detected: <strong style={{ color: '#00E5FF' }}>{currentScenario.detectedBadge}</strong>
              </span>
            </div>

            {/* 12. Latency: -- ms */}
            <div className="telemetry-pill latency-tag" id="telemetry-latency">
              <Zap size={13} />
              <span>
                Latency: <strong style={{ color: '#F1F5F9' }}>-- ms</strong>
              </span>
            </div>

            {/* 15. Small "Code-Mixed Speech" badge */}
            <div className="badge-code-mixed" id="badge-code-mixed-indicator">
              <Layers size={13} />
              <span>Code-Mixed Speech</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Workspace Body */}
      <main className="container workspace-main">
        {/* 5. Main Heading: "Live Translation Workspace" */}
        <div className="ws-heading-block">
          <div className="ws-title-wrap">
            <h1 className="ws-title">
              <Sparkles size={26} color="#FF6B35" />
              <span>Live Translation Workspace</span>
            </h1>
            <p className="ws-subtitle">
              Problem Statement: HNX26EPS03 • Real-Time Indic Language Translation
            </p>
          </div>

          {/* Demo Mode / Simulation Switcher */}
          <div className="demo-mode-bar">
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
              Sample Presets:
            </span>
            {sampleScenarios.map((sc, idx) => (
              <button
                key={sc.id}
                className={`demo-preset-chip ${activeScenarioIdx === idx ? 'active' : ''}`}
                onClick={() => handleScenarioChange(idx)}
                id={`btn-demo-preset-${sc.id}`}
              >
                {sc.label}
              </button>
            ))}
            <button
              onClick={runDemoSimulation}
              className="btn-trigger-demo"
              id="btn-run-demo-simulation"
              title="Simulate Speech-to-Translation Pipeline"
            >
              <Play size={14} />
              <span>Simulate Flow</span>
            </button>
            {status !== 'Ready' && (
              <button
                onClick={handleReset}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.3rem'
                }}
                title="Reset to initial state"
              >
                <RotateCcw size={15} />
              </button>
            )}
          </div>
        </div>

        {/* 13. Visual Pipeline: Speech → Recognition → Translation → Captions */}
        <div className="ws-visual-pipeline" id="visual-pipeline-banner">
          <div className="pipeline-nodes-container">
            {/* Step 1: Speech */}
            <div
              className={`pipeline-node ${
                status === 'Listening' || status === 'Translating' || status === 'Complete'
                  ? 'node-active'
                  : ''
              }`}
              id="pipeline-node-speech"
            >
              <span>🎤</span>
              <span>Speech</span>
            </div>

            <ArrowRight size={18} className="pipeline-arrow" />

            {/* Step 2: Recognition */}
            <div
              className={`pipeline-node ${
                status === 'Listening' || status === 'Translating' || status === 'Complete'
                  ? 'node-active'
                  : ''
              }`}
              id="pipeline-node-recognition"
            >
              <Activity size={16} color="#00E5FF" />
              <span>Recognition</span>
            </div>

            <ArrowRight size={18} className="pipeline-arrow" />

            {/* Step 3: Translation */}
            <div
              className={`pipeline-node ${
                status === 'Translating' || status === 'Complete'
                  ? 'node-active node-saffron'
                  : ''
              }`}
              id="pipeline-node-translation"
            >
              <Languages size={16} color="#FF6B35" />
              <span>Translation</span>
            </div>

            <ArrowRight size={18} className="pipeline-arrow" />

            {/* Step 4: Captions */}
            <div
              className={`pipeline-node ${
                status === 'Complete'
                  ? 'node-active node-emerald'
                  : ''
              }`}
              id="pipeline-node-captions"
            >
              <Subtitles size={16} color="#10B981" />
              <span>Captions</span>
            </div>
          </div>
        </div>

        {/* 6 & 7. Language Selectors (Source: Tamil, Target: English) with Swap Button */}
        <div className="ws-control-matrix">
          <div className="lang-select-group">
            {/* Source Language: Tamil */}
            <div className="lang-select-box">
              <label className="lang-select-label" htmlFor="ws-source-lang-select">
                <span className="badge-live-dot" style={{ width: 6, height: 6 }}></span>
                Source Language
              </label>
              <select
                id="ws-source-lang-select"
                className="custom-select"
                value={sourceLang}
                onChange={(e) => setSourceLang(e.target.value)}
              >
                {languageOptions.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang} {lang === 'Tamil' ? '(தமிழ்)' : lang === 'Hindi' ? '(हिन्दी)' : lang === 'Telugu' ? '(తెలుగు)' : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* 7. Swap Language Button */}
            <button
              className="ws-swap-btn"
              onClick={handleSwapLanguages}
              title="Swap Source and Target Languages"
              id="ws-btn-swap-languages"
            >
              <ArrowLeftRight size={20} />
            </button>

            {/* Target Language: English */}
            <div className="lang-select-box">
              <label className="lang-select-label" htmlFor="ws-target-lang-select">
                <Zap size={12} color="#FF6B35" />
                Target Language
              </label>
              <select
                id="ws-target-lang-select"
                className="custom-select"
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
              >
                {languageOptions.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang} {lang === 'Tamil' ? '(தமிழ்)' : lang === 'Hindi' ? '(हिन्दी)' : lang === 'Telugu' ? '(తెలుగు)' : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span className="badge-code-mixed">
              ✓ Code-Mixed Speech Supported
            </span>
          </div>
        </div>

        {/* 9. Two Large Cards Side by Side: ORIGINAL SPEECH & TRANSLATION */}
        <div className="ws-panels-grid">
          {/* Card 1 (Left): ORIGINAL SPEECH */}
          <div className="ws-panel panel-source" id="card-original-speech">
            <div className="ws-panel-header">
              <div className="ws-panel-title-wrap">
                <span className="badge-pill" style={{ background: 'rgba(0, 229, 255, 0.15)', color: '#00E5FF' }}>
                  ORIGINAL SPEECH
                </span>
                <h2 className="ws-panel-title">{sourceLang} Input</h2>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div className="sound-wave-container">
                  <div className="sound-bar" style={{ animationPlayState: status === 'Listening' ? 'running' : 'paused' }}></div>
                  <div className="sound-bar" style={{ animationPlayState: status === 'Listening' ? 'running' : 'paused' }}></div>
                  <div className="sound-bar" style={{ animationPlayState: status === 'Listening' ? 'running' : 'paused' }}></div>
                  <div className="sound-bar" style={{ animationPlayState: status === 'Listening' ? 'running' : 'paused' }}></div>
                </div>
                <button
                  onClick={handleCopySource}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: copiedSource ? '#10B981' : 'var(--text-muted)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    fontSize: '0.8rem'
                  }}
                  title="Copy original speech"
                >
                  {copiedSource ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>
            </div>

            <div className="ws-panel-body">
              <div>
                <div className="ws-text-area-mock" id="ws-original-speech-text">
                  "{displayedSource}"
                </div>
                <div className="ws-phonetic-caption">
                  Phonetics: {currentScenario.sourcePhonetic}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span className="badge-pill" style={{ background: 'rgba(255,255,255,0.05)', color: '#94A3B8', fontSize: '0.72rem' }}>
                  Detected: {currentScenario.detectedBadge}
                </span>
                <span className="badge-pill" style={{ background: 'rgba(0, 229, 255, 0.08)', color: 'var(--accent-cyan)', fontSize: '0.72rem' }}>
                  Acoustic Stream Active
                </span>
              </div>
            </div>

            <div className="ws-panel-footer">
              <span>Characters: {displayedSource.length} | Words: {displayedSource.split(' ').length}</span>
              <span style={{ color: '#00E5FF', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircle2 size={13} /> {status === 'Listening' ? 'Streaming Audio...' : 'Audio Ingestion Ready'}
              </span>
            </div>
          </div>

          {/* Card 2 (Right): TRANSLATION */}
          <div className="ws-panel panel-target" id="card-translation">
            <div className="ws-panel-header">
              <div className="ws-panel-title-wrap">
                <span className="badge-pill" style={{ background: 'rgba(255, 107, 53, 0.15)', color: 'var(--accent-saffron)' }}>
                  TRANSLATION
                </span>
                <h2 className="ws-panel-title">{targetLang} Output</h2>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <button
                  onClick={handleCopyTarget}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: copiedTarget ? '#10B981' : 'var(--text-muted)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    fontSize: '0.8rem'
                  }}
                  title="Copy translation"
                  id="ws-copy-translation-btn"
                >
                  {copiedTarget ? <Check size={15} /> : <Copy size={15} />}
                  <span>{copiedTarget ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            <div className="ws-panel-body">
              <div>
                <div className="ws-text-area-mock" style={{ color: '#FFD9CB' }} id="ws-translated-output-text">
                  "{displayedTarget}"
                </div>
                <div className="ws-phonetic-caption" style={{ color: '#94A3B8' }}>
                  Context: {currentScenario.targetPhonetic}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span className="badge-pill" style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#34D399', fontSize: '0.72rem' }}>
                  {status === 'Complete' ? '✓ Translation Complete' : status === 'Translating' ? '⏳ Translating...' : 'Ready'}
                </span>
                <span className="badge-pill" style={{ background: 'rgba(255, 107, 53, 0.08)', color: 'var(--accent-saffron)', fontSize: '0.72rem' }}>
                  Dialect Optimized
                </span>
              </div>
            </div>

            <div className="ws-panel-footer">
              <span>Latency: -- ms</span>
              <span style={{ color: '#34D399', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircle2 size={13} /> {status === 'Complete' ? 'Output Ready' : 'Neural Pipeline Ready'}
              </span>
            </div>
          </div>
        </div>

        {/* 8 & 16. Large Microphone Button: "Start Speaking" with Subtle Animation */}
        <div className="ws-mic-controller">
          <div className="mic-pulse-ring-wrapper">
            {status === 'Listening' && (
              <>
                <div className="mic-pulse-wave-1"></div>
                <div className="mic-pulse-wave-2"></div>
              </>
            )}
            <button
              onClick={handleToggleMic}
              className={`mic-btn-large ${
                status === 'Listening'
                  ? 'is-listening'
                  : status === 'Translating'
                  ? 'is-translating'
                  : status === 'Complete'
                  ? 'is-complete'
                  : ''
              }`}
              id="ws-btn-start-speaking"
              title={status === 'Listening' ? 'Click to Stop' : 'Click to Start Speaking'}
            >
              {status === 'Listening' ? <MicOff size={44} /> : <Mic size={44} />}
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <span className="mic-status-text">
              {status === 'Listening'
                ? 'Listening to Speech...'
                : status === 'Translating'
                ? 'Translating Speech Stream...'
                : status === 'Complete'
                ? 'Translation Complete'
                : 'Start Speaking'}
            </span>
            <span className="mic-hint-text">
              {status === 'Listening'
                ? 'Speak naturally into your microphone. Visual listening waves active.'
                : 'Click "Start Speaking" or use "Simulate Flow" above to preview live translation.'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Direction: <strong style={{ color: '#FFF' }}>{sourceLang} ➔ {targetLang}</strong>
            </span>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Pipeline: <strong style={{ color: 'var(--accent-cyan)' }}>Speech ➔ Recognition ➔ Translation ➔ Captions</strong>
            </span>
          </div>
        </div>

        {/* 14. Live Captions Section at the Bottom */}
        <div className="ws-live-captions-teleprompter" id="ws-live-captions-bar">
          <div className="teleprompter-badge-wrap">
            <span className="badge-pill" style={{ background: '#10B981', color: '#000', fontWeight: 800 }}>
              LIVE CAPTIONS
            </span>
            <span style={{ fontSize: '0.82rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
              [{targetLang}]
            </span>
          </div>

          <div className="teleprompter-text">
            {status === 'Listening' ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#38BDF8' }}>
                <span className="badge-live-dot" style={{ display: 'inline-block' }}></span>
                <span>[Streaming Speech Input] {displayedSource}</span>
              </span>
            ) : status === 'Translating' ? (
              <span style={{ color: '#FCD34D' }}>
                ⏳ [Synthesizing Live Captions...]
              </span>
            ) : (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="badge-live-dot" style={{ display: 'inline-block' }}></span>
                <span>{displayedTarget}</span>
              </span>
            )}
          </div>

          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
            Speech → Recognition → Translation → Captions
          </span>
        </div>
      </main>
    </div>
  );
}
