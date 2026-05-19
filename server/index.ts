import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import chaosRoutes from './routes/chaos.js';
import reportRoutes from './routes/report.js';
import healthRoutes from './routes/health.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// API routes
app.use('/api/chaos', chaosRoutes);
app.use('/api/report', reportRoutes);
app.use('/api/health', healthRoutes);

// Serve static frontend in production
app.use(express.static(path.join(__dirname, '../dist')));
app.get(/.*/, (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  }
});

app.listen(PORT, () => {
  console.log(`🔥 HEXFIRE server running on port ${PORT}`);
});
