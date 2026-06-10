// Chapter 03.5 - app.js (실습 및 완성본)
// 아래 코드는 미들웨어 설정 및 라우터를 바인딩하는 Express 앱 파일입니다.

const express = require('express');
const postRouter = require('./routes/post.route');

const app = express();

// ── 1. 공통 미들웨어 설정 ──────────────────────────────────

// JSON 형식의 요청 바디(Body) 데이터를 파싱하여 req.body에 담아줍니다.
app.use(express.json());

// URL-encoded 형식(Form 전송 등)의 요청 바디 데이터를 파싱합니다.
app.use(express.urlencoded({ extended: true }));

// 모든 요청의 [시간] [HTTP 메서드] [요청 URL]을 콘솔에 기록하는 간단한 로깅 미들웨어입니다.
app.use((req, res, next) => {
  const now = new Date().toISOString();
  console.log(`[${now}] ${req.method} ${req.url}`);
  next(); // 중요: 다음 미들웨어 또는 라우터로 처리를 넘깁니다.
});

// ── 2. 라우터 연결 ─────────────────────────────────────────

// '/api/posts'로 들어오는 모든 요청을 postRouter 모듈로 분기합니다.
app.use('/api/posts', postRouter);

// ── 3. 에러 및 404 예외 처리 미들웨어 ──────────────────────

// 위의 라우터와 매칭되는 경로가 없을 때 실행되는 404 미들웨어입니다.
app.use((req, res, next) => {
  res.status(404).json({ message: '존재하지 않는 API 경로입니다.' });
});

// 서버 실행 중 발생하는 예기치 못한 에러를 한곳에서 처리하는 글로벌 에러 핸들러 미들웨어입니다.
// 인자가 4개(err, req, res, next)인 경우 Express가 에러 핸들러로 특별 취급합니다.
app.use((err, req, res, next) => {
  console.error('🚨 서버 에러 발생:', err.stack);
  res.status(500).json({
    message: '서버 내부 오류가 발생했습니다.',
    error: err.message
  });
});

module.exports = app;
