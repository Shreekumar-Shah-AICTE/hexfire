import React from 'react';
import type { FaultedStep, StepType } from '../../server/types';

interface PipelineViewProps {
  steps: FaultedStep[];
  onSelectStep?: (index: number) => void;
  selectedStepIndex?: number;
}

export const PipelineView: React.FC<PipelineViewProps> = ({
  steps,
  onSelectStep,
  selectedStepIndex
}) => {
  const getIconForType = (type: StepType) => {
    switch (type) {
      case 'llm_call': return '🧠';
      case 'tool_call': return '🔧';
      case 'decision': return '⚖️';
      case 'output': return '📤';
      default: return '●';
    }
  };

  const getStatusColor = (status: FaultedStep['status'], isFaulted: boolean) => {
    if (isFaulted) return '#ef4444'; // Always red if explicitly faulted
    switch (status) {
      case 'passed': return '#22c55e';
      case 'failed': return '#ef4444';
      case 'cascading': return '#f59e0b';
      default: return '#475569';
    }
  };

  return (
    <div style={{
      position: 'relative',
      padding: '2rem',
      background: 'rgba(255,255,255,0.01)',
      border: '1px solid rgba(255,255,255,0.05)',
      borderRadius: '16px',
      minHeight: '400px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden'
    }}>
      {/* Visual background pipeline line */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '10%',
        right: '10%',
        height: '2px',
        background: 'linear-gradient(to right, #475569 0%, #1e293b 100%)',
        zIndex: 0,
        transform: 'translateY(-50%)'
      }} />

      {/* Nodes mapping */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        position: 'relative',
        zIndex: 1,
        gap: '1.5rem',
        flexWrap: 'wrap'
      }}>
        {steps.map((step, idx) => {
          const isSelected = selectedStepIndex === idx;
          const statusColor = getStatusColor(step.status, step.isFaulted);

          return (
            <div
              key={step.id}
              onClick={() => onSelectStep && onSelectStep(idx)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: onSelectStep ? 'pointer' : 'default',
                transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                transition: 'transform 0.2s ease-in-out',
                flex: '1 1 120px',
                maxWidth: '180px'
              }}
            >
              {/* Inner Node Sphere */}
              <div
                className={step.isFaulted ? 'fault-active' : ''}
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: '#12121a',
                  border: `3px solid ${statusColor}`,
                  boxShadow: `0 0 15px ${statusColor}30`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  marginBottom: '0.75rem',
                  position: 'relative'
                }}
              >
                {getIconForType(step.type)}

                {/* Status Indicator Dot */}
                <div style={{
                  position: 'absolute',
                  bottom: '-2px',
                  right: '-2px',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  backgroundColor: statusColor,
                  border: '2px solid #12121a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.65rem',
                  color: '#fff',
                  fontWeight: 'bold'
                }}>
                  {step.status === 'passed' ? '✓' : step.status === 'failed' ? '✗' : '⚠'}
                </div>
              </div>

              {/* Node Title & Specs */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f8fafc', marginBottom: '0.2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '140px' }}>
                  {step.name}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
                  {step.latencyMs}ms
                </div>
              </div>

              {/* Fault Tag Badge */}
              {step.isFaulted && (
                <div style={{
                  marginTop: '0.5rem',
                  padding: '0.2rem 0.5rem',
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid #ef4444',
                  borderRadius: '4px',
                  color: '#ef4444',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap'
                }}>
                  {step.faultApplied?.split('_')[0]}
                </div>
              )}
              
              {/* Pending Fault Badge (Before Test Run) */}
              {!step.isFaulted && (step as any).pendingFaults && (
                <div style={{
                  marginTop: '0.5rem',
                  padding: '0.2rem 0.5rem',
                  backgroundColor: 'rgba(249, 115, 22, 0.1)',
                  border: '1px dashed #f97316',
                  borderRadius: '4px',
                  color: '#f97316',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  animation: 'pulse 2s infinite'
                }}>
                  TARGETED: {(step as any).pendingFaults.length} FAULT{(step as any).pendingFaults.length > 1 ? 'S' : ''}
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      <style>{`
        @keyframes pulse {
          0% { opacity: 0.7; }
          50% { opacity: 1; border-color: #fb923c; }
          100% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
};
