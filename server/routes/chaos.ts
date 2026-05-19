import express from 'express';
import { runChaosTest } from '../engine/faultInjector';
import { buildCascadeGraph, computeCascade } from '../engine/cascadeGraph';
import { computeResilience } from '../engine/resilienceScorer';
import { AuditChain } from '../engine/auditChain';
import { PIPELINES } from '../../seed/mockAgent';
import { FaultConfig } from '../types';

const router = express.Router();

router.post('/run', (req, res) => {
  const { pipelineId, faults } = req.body as {
    pipelineId: string;
    faults: FaultConfig[];
  };

  const originalPipeline = PIPELINES[pipelineId];

  if (!originalPipeline) {
    res.status(404).json({ error: `Pipeline with ID ${pipelineId} not found.` });
    return;
  }

  // 1. Initialize Audit Log Chain
  const audit = new AuditChain();
  audit.addEntry('FAULT_INJECTED', { pipelineId, faultsCount: faults.length, faults });

  // 2. Run Fault Injection
  const testResult = runChaosTest(pipelineId, originalPipeline, faults);

  // 3. Compute Cascade Graphs
  const graph = buildCascadeGraph(originalPipeline);
  const cascades = testResult.faultsInjected.map(f => {
    const originStep = originalPipeline[f.targetStepIndex];
    return computeCascade(graph, testResult.faultedPipeline, originStep.id);
  });

  // Calculate downstream effects on statuses
  cascades.forEach(c => {
    c.affectedSteps.forEach(stepId => {
      const step = testResult.faultedPipeline.find(s => s.id === stepId);
      if (step && step.status !== 'failed') {
        step.status = 'cascading';
        step.error = `Cascade Failure propagated from node ${c.faultOrigin}`;
        audit.addEntry('AGENT_RESPONSE', { stepId, status: 'cascading', origin: c.faultOrigin });
      }
    });
  });

  // 4. Calculate Resilience Score
  const score = computeResilience(testResult, cascades);

  // 5. Finalize Test & Audit Chain
  audit.addEntry('TEST_COMPLETE', { score: score.total, stars: score.stars, grade: score.grade });
  const auditLog = audit.export();

  res.json({
    result: testResult,
    cascades,
    score,
    audit: auditLog
  });
});

export default router;
