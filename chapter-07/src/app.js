const express      = require('express');
const swaggerUi    = require('swagger-ui-express');
const swaggerSpec  = require('./swagger');
const authRouter   = require('./routes/auth.route');

const app = express();
app.use(express.json());

// ── Swagger UI ──────────────────────────────────────────
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  explorer: true,
  customSiteTitle: 'Backend Roadmap API Docs',
}));

app.use('/api/auth', authRouter);

app.use((req, res) => res.status(404).json({ message: '존재하지 않는 경로입니다.' }));

module.exports = app;
