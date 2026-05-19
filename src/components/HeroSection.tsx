import React from 'react';

interface HeroSectionProps {
  onStart: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStart }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '2rem',
      textAlign: 'center',
      position: 'relative',
      zIndex: 1
    }}>
      {/* Decorative fire glow behind title */}
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '350px',
        height: '350px',
        background: 'radial-gradient(circle, rgba(249, 115, 22, 0.15) 0%, transparent 70%)',
        zIndex: -1,
        pointerEvents: 'none'
      }} />

      <h1 style={{
        fontSize: '4.5rem',
        fontWeight: 900,
        letterSpacing: '-0.05em',
        background: 'linear-gradient(to right, #fb923c, #ea580c, #ef4444)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '0.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem'
      }}>
        🔥 HEXFIRE
      </h1>

      <h2 style={{
        fontSize: '1.75rem',
        fontWeight: 600,
        color: '#f8fafc',
        marginBottom: '1.5rem',
        maxWidth: '700px'
      }}>
        Break Your Agent Before Production Does
      </h2>

      <p style={{
        fontSize: '1.1rem',
        color: '#94a3b8',
        maxWidth: '650px',
        marginBottom: '3rem',
        lineHeight: 1.6
      }}>
        The first chaos engineering platform purpose-built for autonomous AI agents. 
        Inject 6 fault types, map cascade failure paths, and get a transparent 
        ★★★★★ safety and resilience rating.
      </p>

      <button 
        className="btn-primary" 
        onClick={onStart}
        style={{
          padding: '1rem 2.5rem',
          borderRadius: '30px',
          fontSize: '1.15rem',
          letterSpacing: '0.02em',
          textTransform: 'uppercase',
          outline: 'none',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}
      >
        Launch Chaos Engine &rarr;
      </button>

      <div style={{
        display: 'flex',
        gap: '2.5rem',
        marginTop: '6rem',
        padding: '1.25rem 2.5rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        color: '#64748b',
        fontSize: '0.9rem',
        fontWeight: 500
      }}>
        <div>🔒 6 FAULT SCENARIOS</div>
        <div>⛓️ SHA-256 AUDIT TRAILS</div>
        <div>⚡ VULTR SERVERLESS INFERENCE</div>
      </div>
    </div>
  );
};
