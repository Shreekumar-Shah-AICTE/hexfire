import React from 'react';
import type { FaultConfig, FaultType } from '../../server/types';

interface FaultPanelProps {
  activeFaults: FaultConfig[];
  onChangeFaults: (faults: FaultConfig[]) => void;
  selectedStepIndex: number;
}

const FAULT_DEFINITIONS: Array<{
  type: FaultType;
  icon: string;
  label: string;
  desc: string;
  color: string;
}> = [
  { type: 'HALLUCINATION_INJECTION', icon: '🧠', label: 'Hallucination Injection', desc: 'Inject plausible but incorrect context responses into downstream steps.', color: '#ef4444' },
  { type: 'TOOL_TIMEOUT', icon: '⏱️', label: 'Tool Timeout', desc: 'Simulate API dependencies hanging, exceeding safety timeout thresholds.', color: '#f97316' },
  { type: 'LATENCY_SPIKE', icon: '🐌', label: 'Latency Spike', desc: 'Add artificial latency spikes to evaluate execution bottlenecks.', color: '#eab308' },
  { type: 'ADVERSARIAL_PROMPT', icon: '🗡️', label: 'Adversarial Prompt', desc: 'Inject system prompt overrides into agent prompt interfaces.', color: '#a855f7' },
  { type: 'CONTEXT_CORRUPTION', icon: '💥', label: 'Context Corruption', desc: 'Corrupt context structures or character sequences randomly.', color: '#ec4899' },
  { type: 'PERMISSION_REVOCATION', icon: '🔒', label: 'Permission Revocation', desc: 'Return authorization 403 scope failures mid-pipeline execution.', color: '#6366f1' },
];

export const FaultPanel: React.FC<FaultPanelProps> = ({
  activeFaults,
  onChangeFaults,
  selectedStepIndex
}) => {
  
  const handleToggleFault = (type: FaultType) => {
    const existingIdx = activeFaults.findIndex(
      f => f.targetStepIndex === selectedStepIndex && f.type === type
    );

    if (existingIdx > -1) {
      // Remove fault
      onChangeFaults(activeFaults.filter((_, idx) => idx !== existingIdx));
    } else {
      // Add fault with default medium severity
      const newFault: FaultConfig = {
        type,
        targetStepIndex: selectedStepIndex,
        severity: 'medium'
      };
      onChangeFaults([...activeFaults, newFault]);
    }
  };

  const handleSeverityChange = (type: FaultType, severity: FaultConfig['severity']) => {
    onChangeFaults(activeFaults.map(f => {
      if (f.targetStepIndex === selectedStepIndex && f.type === type) {
        return { ...f, severity };
      }
      return f;
    }));
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      padding: '1.25rem',
      boxSizing: 'border-box'
    }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#f8fafc', marginBottom: '0.5rem' }}>
        Inject Faults (Step #{selectedStepIndex + 1})
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {FAULT_DEFINITIONS.map(def => {
          const config = activeFaults.find(
            f => f.targetStepIndex === selectedStepIndex && f.type === def.type
          );
          const isActive = !!config;

          return (
            <div
              key={def.type}
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '0.85rem',
                borderRadius: '10px',
                background: 'rgba(255,255,255,0.01)',
                border: `1px solid ${isActive ? def.color : 'rgba(255,255,255,0.05)'}`,
                transition: 'border-color 0.2s'
              }}
            >
              {/* Top Header line of card */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.2rem' }}>{def.icon}</span>
                  <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#cbd5e1' }}>{def.label}</span>
                </div>
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={() => handleToggleFault(def.type)}
                  style={{
                    width: '18px',
                    height: '18px',
                    accentColor: '#f97316',
                    cursor: 'pointer'
                  }}
                />
              </div>

              {/* Sub description */}
              <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.5rem', lineHeight: 1.4 }}>
                {def.desc}
              </p>

              {/* Severity Selector */}
              {isActive && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.25rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
                  <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600 }}>SEVERITY:</span>
                  <div style={{ display: 'flex', gap: '0.25rem' }}>
                    {(['low', 'medium', 'critical'] as const).map(sev => (
                      <button
                        key={sev}
                        onClick={() => handleSeverityChange(def.type, sev)}
                        style={{
                          padding: '0.25rem 0.5rem',
                          borderRadius: '4px',
                          border: 'none',
                          background: config.severity === sev ? def.color : 'rgba(255,255,255,0.04)',
                          color: config.severity === sev ? '#000' : '#94a3b8',
                          fontWeight: 700,
                          fontSize: '0.65rem',
                          cursor: 'pointer',
                          textTransform: 'uppercase'
                        }}
                      >
                        {sev}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
