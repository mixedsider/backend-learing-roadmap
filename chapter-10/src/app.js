const express       = require('express');
const morgan        = require('morgan');
const cookieParser  = require('cookie-parser');
const swaggerUi     = require('swagger-ui-express');
const swaggerJsDoc  = require('swagger-jsdoc');

const authRouter    = require('./routes/auth.route');
const postRouter    = require('./routes/post.route');
const commentRouter = require('./routes/comment.route');
const errorHandler  = require('./middlewares/errorHandler');
const logger        = require('./utils/logger');

const app = express();

// ── 미들웨어 ─────────────────────────────────────────────
app.use(express.json());
app.use(cookieParser());
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined', { stream: { write: (msg) => logger.info(msg.trim()) } }));
}

// ── Swagger ──────────────────────────────────────────────
const swaggerSpec = swaggerJsDoc({
  definition: {
    openapi: '3.0.0',
    info: { title: '미니 블로그 API', version: '1.0.0' },
    servers: [{ url: 'http://localhost:3000' }],
    components: {
      securitySchemes: { BearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' } },
    },
    security: [{ BearerAuth: [] }],
  },
  apis: ['./src/routes/*.js'],
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ── 라우터 ───────────────────────────────────────────────
app.use('/api/auth',     authRouter);
app.use('/api/posts',    postRouter);
app.use('/api/comments', commentRouter);

// ── 에러 핸들러 ──────────────────────────────────────────
app.use(errorHandler);
app.use((req, res) => res.status(404).json({ message: '존재하지 않는 경로입니다.' }));

module.exports = app;
