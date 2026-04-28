const express = require('express');
const todoRouter = require('./routes/todo.route');

const app = express();

// ── 미들웨어 ─────────────────────────────────────────────
app.use(express.json()); // JSON 요청 바디 파싱
app.use(express.urlencoded({ extended: true }));

// 요청 로깅 미들웨어 (간단 버전)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// ── 라우터 연결 ──────────────────────────────────────────
app.use('/api/todos', todoRouter);

// ── 404 처리 ─────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ message: '존재하지 않는 경로입니다.' });
});

module.exports = app;
