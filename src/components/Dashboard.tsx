import React, { useState } from 'react';
import { PipelineView } from './PipelineView';
import { FaultPanel } from './FaultPanel';
import { StarRating } from './StarRating';
import { AuditTrail } from './AuditTrail';
import { ReportView } from './ReportView';
import { runChaosTestApi, generateReportApi } from '../utils/api';
import type { FaultedStep, FaultConfig, ChaosTestResult, CascadeResult, ResilienceScore, AuditExport } from '../../server/types';
import { CUSTOMER_SUPPORT_PIPELINE, INVOICE_PROCESSING_PIPELINE, EMPLOYEE_ONBOARDING_PIPELINE } from '../../seed/mockAgent';

const PIPELINES_MAP = {
  customer_support: { name: 'Customer Support Escalation Agent', steps: CUSTOMER_SUPPORT_PIPELINE },
  invoice_processing: { name: 'Invoice Processing Agent', steps: INVOICE_PROCESSING_PIPELINE },
  employee_onboarding: { name: 'Employee Onboarding Agent', steps: EMPLOYEE_ONBOARDING_PIPELINE }
};

export const Dashboard: React.FC = () => {
  const [selectedPipelineId, setSelectedPipelineId] = useState<keyof typeof PIPELINES_MAP>('customer_support');
  const [faults, setFaults] = useState<FaultConfig[]>([]);
  const [selectedStepIdx, setSelectedStepIdx] = useState(0);

  // Execution states
  const [running, setRunning] = useState(false);
  const [testResult, setTestResult] = useState<ChaosTestResult | null>(null);
  const [, setCascades] = useState<CascadeResult[]>([]);
  const [resilienceScore, setResilienceScore] = useState<ResilienceScore | null>(null);
  const [auditLog, setAuditLog] = useState<AuditExport | null>(null);
  const [animationIndex, setAnimationIndex] = useState<number>(-1); // -1 means no animation or finished

  // Report states
  const [reportMarkdown, setReportMarkdown] = useState<string | null>(null);
  const [generatingReport, setGeneratingReport] = useState(false);

  // Map steps to match faulted format
  const activePipeline = PIPELINES_MAP[selectedPipelineId];
  
  const cleanSteps: FaultedStep[] = activePipeline.steps.map((s, idx) => {
    const stepFaults = faults.filter(f => f.targetStepIndex === idx);
    return {
      ...s,
      isFaulted: false,
      status: 'passed',
      latencyMs: 65,
      actualOutput: s.expectedOutput,
      pendingFaults: stepFaults.length > 0 ? stepFaults : undefined
    } as FaultedStep & { pendingFaults?: FaultConfig[] };
  });

  const stepsToRender: FaultedStep[] = testResult 
    ? testResult.faultedPipeline.map((step, idx) => (
        animationIndex !== -1 && idx > animationIndex ? cleanSteps[idx] : step
      ))
    : cleanSteps;

  const handlePipelineSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPipelineId(e.target.value as keyof typeof PIPELINES_MAP);
    setFaults([]);
    setSelectedStepIdx(0);
    setTestResult(null);
    setCascades([]);
    setResilienceScore(null);
    setAuditLog(null);
    setReportMarkdown(null);
    setAnimationIndex(-1);
  };

  const handleRunChaosTest = async () => {
    setRunning(true);
    setReportMarkdown(null);
    setAnimationIndex(-1);
    setTestResult(null);
    setResilienceScore(null);
    setAuditLog(null);

    try {
      const data = await runChaosTestApi(selectedPipelineId, faults);
      
      // We have the data, now we animate it
      setTestResult(data.result);
      setAnimationIndex(0);

      // Animate the propagation
      let currentIdx = 0;
      const totalSteps = data.result.faultedPipeline.length;
      
      const interval = setInterval(() => {
        currentIdx++;
        setAnimationIndex(currentIdx);
        
        // Move selection to the step currently being animated if it has an error
        if (data.result.faultedPipeline[currentIdx]?.status !== 'passed') {
          setSelectedStepIdx(currentIdx);
        }

        if (currentIdx >= totalSteps) {
          clearInterval(interval);
          setAnimationIndex(-1);
          // Show the final score and audit log only after the cascade animation is complete
          setCascades(data.cascades);
          setResilienceScore(data.score);
          setAuditLog(data.audit);
          setRunning(false);
        }
      }, 800); // 800ms per step

    } catch (err) {
      console.error(err);
      alert("Failed to run chaos tests. Check backend console logs.");
      setRunning(false);
    }
  };

  const handleGenerateReport = async () => {
    if (!testResult || !resilienceScore) return;
    setGeneratingReport(true);
    try {
      const data = await generateReportApi(testResult, resilienceScore);
      setReportMarkdown(data.report);
    } catch (err) {
      console.error(err);
      alert("Failed to compile analysis report via Gemini.");
    } finally {
      setGeneratingReport(false);
    }
  };

  const handleApplyRecommendedPreset = () => {
    const recommended: FaultConfig[] = [
      { type: 'HALLUCINATION_INJECTION' as const, targetStepIndex: 1, severity: 'medium' as const },
      { type: 'TOOL_TIMEOUT' as const, targetStepIndex: 2, severity: 'critical' as const },
      { type: 'CONTEXT_CORRUPTION' as const, targetStepIndex: 4, severity: 'low' as const }
    ].filter(f => f.targetStepIndex < activePipeline.steps.length);
    setFaults(recommended);
  };

  const handleResetFaults = () => {
    setFaults([]);
    setTestResult(null);
    setCascades([]);
    setResilienceScore(null);
    setAuditLog(null);
    setReportMarkdown(null);
    setAnimationIndex(-1);
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '320px 1fr 340px',
      gridTemplateRows: 'auto 1fr auto',
      height: '100vh',
      width: '100vw',
      backgroundColor: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Top Navbar */}
      <header style={{
        gridColumn: '1 / -1',
        height: '64px',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem',
        backgroundColor: 'rgba(10, 10, 15, 0.5)',
        backdropFilter: 'blur(10px)',
        zIndex: 5
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.25rem' }}>🔥</span>
          <span style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '0.05em', color: '#fb923c' }}>HEXFIRE</span>
          <span style={{ fontSize: '0.75rem', padding: '0.15rem 0.4rem', border: '1px solid rgba(249, 115, 22, 0.4)', borderRadius: '4px', color: '#f97316', marginLeft: '0.5rem', fontWeight: 700 }}>ENGINE CORE</span>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <select 
            value={selectedPipelineId} 
            onChange={handlePipelineSelect}
            style={{
              padding: '0.45rem 1rem',
              borderRadius: '8px',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              color: '#fff',
              outline: 'none',
              fontWeight: 500,
              cursor: 'pointer'
            }}
          >
            {Object.entries(PIPELINES_MAP).map(([id, item]) => (
              <option key={id} value={id}>{item.name}</option>
            ))}
          </select>
          <button
            onClick={handleApplyRecommendedPreset}
            style={{
              padding: '0.4rem 0.8rem',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#cbd5e1',
              borderRadius: '6px',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Recommended Preset
          </button>
          <button
            onClick={handleResetFaults}
            style={{
              padding: '0.4rem 0.8rem',
              background: 'rgba(239, 68, 68, 0.05)',
              border: '1px solid rgba(239, 68, 68, 0.15)',
              color: '#ef4444',
              borderRadius: '6px',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Reset
          </button>
        </div>
      </header>

      {/* Left Sidebar: Controls */}
      <aside 
        className="glass-card"
        style={{
          margin: '1rem',
          marginRight: '0.5rem',
          gridColumn: '1',
          overflowY: 'auto',
          borderRadius: '12px'
        }}
      >
        <FaultPanel
          activeFaults={faults}
          onChangeFaults={setFaults}
          selectedStepIndex={selectedStepIdx}
        />
      </aside>

      {/* Center Section: Viz & Steps inspection */}
      <main style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '1rem',
        overflowY: 'auto'
      }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Main SVG/HTML Pipeline visualizer */}
          <PipelineView
            steps={stepsToRender}
            onSelectStep={setSelectedStepIdx}
            selectedStepIndex={selectedStepIdx}
          />

          {/* Node detailed inspect panel */}
          <div 
            className="glass-card"
            style={{
              padding: '1.5rem',
              borderRadius: '12px',
              textAlign: 'left'
            }}
          >
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.02em', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '0.5rem' }}>
              Inspect Step: {stepsToRender[selectedStepIdx].name}
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.8rem' }}>
              <div>
                <span style={{ color: '#64748b', fontWeight: 600, display: 'block', marginBottom: '0.2rem' }}>EXPECTED INPUT</span>
                <pre style={{ padding: '0.5rem', borderRadius: '6px', background: 'rgba(0,0,0,0.2)', color: '#a855f7', overflowX: 'auto', fontFamily: 'var(--font-mono)' }}>
                  {stepsToRender[selectedStepIdx].input}
                </pre>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                  <span style={{ color: '#64748b', fontWeight: 600, display: 'block' }}>ACTUAL OUTPUT</span>
                  {stepsToRender[selectedStepIdx].type === 'llm_call' && (
                    <span style={{ fontSize: '0.65rem', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', padding: '0.1rem 0.3rem', borderRadius: '4px', border: '1px solid rgba(59, 130, 246, 0.3)' }}>⚡ Vultr Serverless Inference</span>
                  )}
                </div>
                <pre style={{ padding: '0.5rem', borderRadius: '6px', background: 'rgba(0,0,0,0.2)', color: '#22c55e', overflowX: 'auto', fontFamily: 'var(--font-mono)' }}>
                  {stepsToRender[selectedStepIdx].actualOutput}
                </pre>
              </div>
            </div>
            {stepsToRender[selectedStepIdx].error && (
              <div style={{
                marginTop: '1rem',
                padding: '0.5rem 0.75rem',
                backgroundColor: 'rgba(239, 68, 68, 0.08)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: '6px',
                color: '#ef4444',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)'
              }}>
                🚨 ERROR MESSAGE: {stepsToRender[selectedStepIdx].error}
              </div>
            )}
          </div>
        </div>

        {/* Action Button Bar */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          padding: '0.5rem 0'
        }}>
          <button
            className="btn-primary"
            onClick={handleRunChaosTest}
            disabled={running}
            style={{
              flex: 1,
              padding: '0.9rem',
              borderRadius: '10px',
              fontSize: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            {running ? 'Running Chaos Test Simulation...' : '🔥 Run Chaos Test'}
          </button>

          {resilienceScore && (
            <button
              onClick={handleGenerateReport}
              disabled={generatingReport}
              style={{
                flex: 1,
                padding: '0.9rem',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                border: 'none',
                color: '#fff',
                fontSize: '1rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(59, 130, 246, 0.2)'
              }}
            >
              {generatingReport ? 'Analyzing via Gemini Flash...' : '📊 Generate Forensic Report'}
            </button>
          )}
        </div>
      </main>

      {/* Right Sidebar: Metric Scorer & Audit Stream */}
      <aside style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        margin: '1rem',
        marginLeft: '0.5rem',
        gridColumn: '3',
        overflow: 'hidden'
      }}>
        {/* Top: Score Indicator */}
        <div 
          className="glass-card"
          style={{
            flex: '0 0 auto',
            borderRadius: '12px'
          }}
        >
          {resilienceScore ? (
            <StarRating score={resilienceScore} />
          ) : (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
              <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '0.5rem' }}>★</span>
              Waiting for test run execution to calculate safety metrics.
            </div>
          )}
        </div>

        {/* Bottom: Audit timeline */}
        <div 
          className="glass-card"
          style={{
            flex: 1,
            borderRadius: '12px',
            overflow: 'hidden'
          }}
        >
          {auditLog ? (
            <AuditTrail audit={auditLog} />
          ) : (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
              <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>⛓️</span>
              SHA-256 chained transaction logs will display here.
            </div>
          )}
        </div>
      </aside>

      {/* Overlay Modal for Gemini Markdown Report */}
      {reportMarkdown && (
        <ReportView
          reportMarkdown={reportMarkdown}
          onClose={() => setReportMarkdown(null)}
        />
      )}
    </div>
  );
};
