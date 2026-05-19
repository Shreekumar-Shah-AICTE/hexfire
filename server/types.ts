export type FaultType =
  | 'HALLUCINATION_INJECTION'
  | 'TOOL_TIMEOUT'
  | 'LATENCY_SPIKE'
  | 'ADVERSARIAL_PROMPT'
  | 'CONTEXT_CORRUPTION'
  | 'PERMISSION_REVOCATION';

export interface FaultConfig {
  type: FaultType;
  targetStepIndex: number;
  severity: 'low' | 'medium' | 'critical';
  params?: Record<string, any>;
}

export type StepType = 'llm_call' | 'tool_call' | 'decision' | 'output';

export interface AgentStep {
  id: string;
  name: string;
  type: StepType;
  input: string;
  expectedOutput: string;
  dependencies: string[];
}

export interface FaultedStep extends AgentStep {
  originalInput?: string;
  originalExpectedOutput?: string;
  isFaulted: boolean;
  faultApplied?: FaultType;
  faultSeverity?: 'low' | 'medium' | 'critical';
  actualOutput?: string;
  status: 'passed' | 'failed' | 'cascading';
  latencyMs: number;
  error?: string;
}

export interface ChaosTestResult {
  testId: string;
  timestamp: string;
  pipelineName: string;
  originalPipeline: AgentStep[];
  faultedPipeline: FaultedStep[];
  faultsInjected: FaultConfig[];
  injectionLog: string[];
}

export interface CascadeResult {
  graph: Record<string, string[]>;
  faultOrigin: string;
  affectedSteps: string[];
  blastRadius: number;
  cascadeDepth: number;
}

export interface ResilienceScore {
  total: number; // 0-100
  stars: 1 | 2 | 3 | 4 | 5;
  breakdown: {
    survivalRate: number;
    recoveryScore: number;
    isolationScore: number;
    gracefulDegradation: number;
  };
  grade: 'CRITICAL' | 'POOR' | 'MODERATE' | 'GOOD' | 'EXCELLENT';
}

export interface AuditEntry {
  index: number;
  timestamp: string;
  eventType: 'FAULT_INJECTED' | 'AGENT_RESPONSE' | 'TEST_COMPLETE';
  data: Record<string, any>;
  hash: string;
  previousHash: string;
}

export interface AuditExport {
  chain: AuditEntry[];
  verified: boolean;
  signature: string;
}
