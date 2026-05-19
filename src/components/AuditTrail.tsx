import React, { useState } from 'react';
import type { AuditExport } from '../../server/types';

interface AuditTrailProps {
  audit: AuditExport;
}

export const AuditTrail: React.FC<AuditTrailProps> = ({ audit }) => {
  const [verifying, setVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<'idle' | 'success' | 'failed'>('idle');

  const triggerVerification = () => {
    setVerifying(true);
    setVerificationResult('idle');
    setTimeout(() => {
      setVerifying(false);
      setVerificationResult(audit.verified ? 'success' : 'failed');
    }, 1200);
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(audit, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `hexfire_audit_chain_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      padding: '1.25rem',
      boxSizing: 'border-box'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#f8fafc' }}>
          SHA-256 Audit Trail
        </h3>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={triggerVerification}
            disabled={verifying}
            style={{
              padding: '0.4rem 0.8rem',
              borderRadius: '6px',
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.02)',
              color: '#f8fafc',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            {verifying ? 'Verifying...' : 'Verify Chain'}
          </button>
          <button
            onClick={handleExport}
            style={{
              padding: '0.4rem 0.8rem',
              borderRadius: '6px',
              border: 'none',
              background: '#f97316',
              color: '#fff',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Export
          </button>
        </div>
      </div>

      {/* Verification Banner */}
      {verificationResult !== 'idle' && (
        <div style={{
          padding: '0.75rem',
          borderRadius: '8px',
          backgroundColor: verificationResult === 'success' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
          border: `1px solid ${verificationResult === 'success' ? '#22c55e' : '#ef4444'}`,
          color: verificationResult === 'success' ? '#22c55e' : '#ef4444',
          fontSize: '0.8rem',
          fontWeight: 600,
          marginBottom: '1rem',
          textAlign: 'center'
        }}>
          {verificationResult === 'success' 
            ? '✅ Cryptographic Verification Successful: Chain Unbroken & Integrity Intact' 
            : '❌ Verification Failed: Chain Tampering Detected'}
        </div>
      )}

      {/* Timeline Stream */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        paddingRight: '0.25rem'
      }}>
        {audit.chain.map((entry, idx) => (
          <div 
            key={idx}
            style={{
              padding: '0.75rem',
              borderRadius: '8px',
              background: 'rgba(255,255,255,0.01)',
              borderLeft: `3px solid ${
                entry.eventType === 'FAULT_INJECTED' ? '#ef4444' : 
                entry.eventType === 'TEST_COMPLETE' ? '#22c55e' : '#3b82f6'
              }`,
              fontSize: '0.8rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', color: '#64748b', fontSize: '0.7rem' }}>
              <span>#{entry.index}</span>
              <span>{new Date(entry.timestamp).toLocaleTimeString()}</span>
            </div>
            <div style={{ fontWeight: 600, color: '#e2e8f0', marginBottom: '0.4rem' }}>
              {entry.eventType}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#fb923c', marginBottom: '0.2rem' }}>
              HASH: {entry.hash.substring(0, 16)}...
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#475569' }}>
              PREV: {entry.previousHash.substring(0, 16)}...
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
