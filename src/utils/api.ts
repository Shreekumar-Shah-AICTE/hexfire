import type { ChaosTestResult, CascadeResult, ResilienceScore, AuditExport, FaultConfig } from '../../server/types';

const API_BASE = '/api';

export async function runChaosTestApi(
  pipelineId: string,
  faults: FaultConfig[]
): Promise<{
  result: ChaosTestResult;
  cascades: CascadeResult[];
  score: ResilienceScore;
  audit: AuditExport;
}> {
  const response = await fetch(`${API_BASE}/chaos/run`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pipelineId, faults }),
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}

export async function generateReportApi(
  testResult: ChaosTestResult,
  score: ResilienceScore
): Promise<{ report: string }> {
  const response = await fetch(`${API_BASE}/report/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ testResult, score }),
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}
