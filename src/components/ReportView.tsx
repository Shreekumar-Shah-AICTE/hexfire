import React from 'react';

interface ReportViewProps {
  reportMarkdown: string;
  onClose: () => void;
}

export const ReportView: React.FC<ReportViewProps> = ({ reportMarkdown, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  // Basic markdown parser
  const renderMarkdown = (md: string) => {
    return md.split('\n').map((line, idx) => {
      if (line.startsWith('# ')) {
        return <h1 key={idx} style={{ fontSize: '2rem', fontWeight: 800, color: '#f8fafc', marginTop: '1.5rem', marginBottom: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.5rem' }}>{line.replace('# ', '')}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={idx} style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fb923c', marginTop: '1.25rem', marginBottom: '0.5rem' }}>{line.replace('## ', '')}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={idx} style={{ fontSize: '1.2rem', fontWeight: 600, color: '#cbd5e1', marginTop: '1rem', marginBottom: '0.5rem' }}>{line.replace('### ', '')}</h3>;
      }
      if (line.startsWith('- ') || line.startsWith('* ')) {
        return <li key={idx} style={{ marginLeft: '1.5rem', color: '#cbd5e1', marginBottom: '0.25rem' }}>{line.replace(/^[-*]\s+/, '')}</li>;
      }
      if (line.trim() === '') {
        return <div key={idx} style={{ height: '0.75rem' }} />;
      }
      return <p key={idx} style={{ color: '#94a3b8', lineHeight: 1.6, marginBottom: '0.75rem' }}>{line}</p>;
    });
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(10, 10, 15, 0.9)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: '2rem'
    }}>
      <div 
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '850px',
          height: '85%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          backgroundColor: '#0c0c14',
          border: '1px solid rgba(255,255,255,0.08)'
        }}
      >
        {/* Header toolbar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1.25rem 2rem',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          backgroundColor: 'rgba(255,255,255,0.01)'
        }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            📊 Forensic Resilience Report
          </h3>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={handlePrint}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                border: '1px solid rgba(255,255,255,0.08)',
                backgroundColor: 'rgba(255,255,255,0.02)',
                color: '#fff',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Print / Save PDF
            </button>
            <button
              onClick={onClose}
              style={{
                padding: '0.5rem 1.2rem',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: '#ef4444',
                color: '#fff',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Close
            </button>
          </div>
        </div>

        {/* Content body */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '2rem 3rem',
          textAlign: 'left'
        }}>
          {renderMarkdown(reportMarkdown)}
        </div>
      </div>
    </div>
  );
};
