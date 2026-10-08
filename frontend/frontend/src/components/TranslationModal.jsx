import { useState } from 'react';
import { X, ArrowLeftRight, CheckCircle2, Sparkles } from 'lucide-react';

export default function TranslationModal({ isOpen, onClose }) {
  const [sourceLang, setSourceLang] = useState('English');
  const [targetLang, setTargetLang] = useState('Tamil');
  const [sessionActive, setSessionActive] = useState(false);

  if (!isOpen) return null;

  const languages = ['English', 'Tamil', 'Hindi', 'Telugu'];

  const handleSwap = () => {
    const temp = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(temp);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="modal-header">
          <div className="badge-pill badge-hackathon" style={{ marginBottom: '0.75rem' }}>
            <Sparkles size={14} color="#818CF8" />
            <span>Problem Statement: HNX26EPS03</span>
          </div>
          <h3 className="modal-title">Live Translation Studio</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
            Configure your IndicLive translation stream parameters.
          </p>
        </div>

        <div className="modal-body">
          {/* Language Pair Selector */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto 1fr',
              gap: '0.75rem',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.03)',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                Speak In (Source)
              </label>
              <select
                value={sourceLang}
                onChange={(e) => setSourceLang(e.target.value)}
                style={{
                  width: '100%',
                  background: '#0B0F19',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '6px',
                  padding: '0.6rem',
                  fontSize: '0.95rem',
                  fontWeight: '600'
                }}
              >
                {languages.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleSwap}
              className="swap-icon-btn"
              style={{ marginTop: '1.2rem' }}
              title="Swap languages"
            >
              <ArrowLeftRight size={16} />
            </button>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                Translate To (Target)
              </label>
              <select
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                style={{
                  width: '100%',
                  background: '#0B0F19',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '6px',
                  padding: '0.6rem',
                  fontSize: '0.95rem',
                  fontWeight: '600'
                }}
              >
                {languages.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Translation Pipeline Info Card */}
          <div className="modal-info-box">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: 'var(--accent-cyan)', marginBottom: '0.35rem' }}>
              <CheckCircle2 size={16} /> Live Translation Stream Configured
            </div>
            <p style={{ fontSize: '0.85rem', color: '#94A3B8', margin: 0 }}>
              Translating between <strong>{sourceLang}</strong> and <strong>{targetLang}</strong>. The neural voice & text streaming pipeline is ready for upcoming backend integration.
            </p>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            <button
              onClick={() => setSessionActive(!sessionActive)}
              className="btn-primary-glow"
              style={{ width: '100%', padding: '0.85rem 1.5rem', fontSize: '1rem' }}
            >
              {sessionActive ? '✓ Translation Session Armed' : 'Initialize Translation Stream'}
            </button>
            <button
              onClick={onClose}
              className="btn-secondary"
              style={{ padding: '0.85rem 1.5rem', fontSize: '0.95rem' }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
