import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    engine: 'HEXFIRE Chaos Engine v1.0.0'
  });
});

export default router;
