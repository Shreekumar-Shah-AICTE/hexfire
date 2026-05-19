import { ChaosTestResult, ResilienceScore, CascadeResult } from '../types';

export function computeResilience(
  testResult: ChaosTestResult,
  cascades: CascadeResult[]
): ResilienceScore {
  const steps = testResult.faultedPipeline;
  const totalFaults = testResult.faultsInjected.length;

  if (totalFaults === 0) {
    return {
      total: 100,
      stars: 5,
      breakdown: {
        survivalRate: 1,
        recoveryScore: 1,
        isolationScore: 1,
        gracefulDegradation: 1
      },
      grade: 'EXCELLENT'
    };
  }

  // 1. Survival Rate (S)
  // Faulted steps that managed to pass (e.g. latency spike that didn't fail)
  const faultedSteps = steps.filter(s => s.isFaulted);
  const survivedCount = faultedSteps.filter(s => s.status === 'passed').length;
  const survivalRate = survivedCount / totalFaults;

  // 2. Recovery Score (Rec)
  // Did the step or subsequent step self-correct or degradation gracefully handle it?
  // We simulate recovery: if a step failed but the next downstream step handled it or degraded.
  let recoveredCount = 0;
  faultedSteps.forEach(s => {
    // If severity was low, or it was latency spike, it recovered
    if (s.faultApplied === 'LATENCY_SPIKE' || s.faultSeverity === 'low') {
      recoveredCount++;
    }
  });
  const recoveryScore = recoveredCount / totalFaults;

  // 3. Isolation Score (Iso)
  // 1 - average blast radius across cascades
  const avgBlastRadius = cascades.length > 0
    ? cascades.reduce((acc, c) => acc + c.blastRadius, 0) / cascades.length
    : 0;
  const isolationScore = Math.max(0, 1 - avgBlastRadius);

  // 4. Graceful Degradation (Gr)
  // Hallucinatory data injection & prompt injection that was flagged, or latency that was under critical limits
  let gracefulCount = 0;
  steps.forEach(s => {
    if (s.isFaulted) {
      if (s.faultApplied === 'LATENCY_SPIKE' && s.latencyMs < 5000) {
        gracefulCount++;
      } else if (s.faultApplied === 'HALLUCINATION_INJECTION' && s.error) {
        gracefulCount++; // successfully flagged
      } else if (s.faultApplied === 'ADVERSARIAL_PROMPT' && s.error) {
        gracefulCount++; // caught injection
      }
    }
  });
  const gracefulDegradation = gracefulCount / totalFaults;

  // Weighted score computation
  // R = (S * 40) + (Rec * 25) + (Iso * 20) + (Gr * 15)
  const total = Math.round(
    (survivalRate * 40) +
    (recoveryScore * 25) +
    (isolationScore * 20) +
    (gracefulDegradation * 15)
  );

  let stars: 1 | 2 | 3 | 4 | 5 = 1;
  let grade: ResilienceScore['grade'] = 'CRITICAL';

  if (total > 80) {
    stars = 5;
    grade = 'EXCELLENT';
  } else if (total > 60) {
    stars = 4;
    grade = 'GOOD';
  } else if (total > 40) {
    stars = 3;
    grade = 'MODERATE';
  } else if (total > 20) {
    stars = 2;
    grade = 'POOR';
  } else {
    stars = 1;
    grade = 'CRITICAL';
  }

  return {
    total,
    stars,
    breakdown: {
      survivalRate,
      recoveryScore,
      isolationScore,
      gracefulDegradation
    },
    grade
  };
}
