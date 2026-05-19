import express from 'express';
import { generateResilienceReport } from '../integrations/gemini';
import { ChaosTestResult, ResilienceScore } from '../types';

const router = express.Router();

router.post('/generate', async (req, res) => {
  const { testResult, score } = req.body as {
    testResult: ChaosTestResult;
    score: ResilienceScore;
  };

  if (!testResult || !score) {
    res.status(400).json({ error: 'Missing required parameters testResult or score.' });
    return;
  }

  try {
    const reportMarkdown = await generateResilienceReport(testResult, score);
    res.json({ report: reportMarkdown });
  } catch (err: any) {
    res.status(500).json({ error: `Failed to generate report: ${err.message}` });
  }
});

export default router;
