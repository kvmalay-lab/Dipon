import express from 'express';
import path from 'path';
import cors from 'cors';
import apiRoutes from './src/server/routes/index.js';
import { securityHeaders } from './src/server/middleware/security.js';
import { errorHandler } from './src/server/middleware/error.js';

const app = express();
const PORT = 3000;

app.use(securityHeaders);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/v1', apiRoutes);
app.use(errorHandler);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Dipon Group Platform API is running' });
});

// Vite middleware for development
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

if (!process.env.VERCEL) {
  startServer();
}

export default app;
