// Chapter 01 - 첫 번째 Node.js 서버
// .env.example을 복사하여 .env 파일을 만들고 시작하세요.
require('dotenv').config();

const http = require('http');

const PORT = process.env.PORT || 3000;

// ── 1. 가장 기본적인 HTTP 서버 ───────────────────────────
const server = http.createServer((req, res) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

  // URL에 따라 다른 응답 반환
  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({
      message: 'Hello, Backend World!',
      timestamp: new Date().toISOString(),
      env: process.env.NODE_ENV,
    }));

  } else if (req.url === '/health' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ status: 'OK' }));

  } else {
    res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ message: '존재하지 않는 경로입니다.' }));
  }
});

server.listen(PORT, () => {
  console.log(`✅ 서버 실행 중: http://localhost:${PORT}`);
  console.log(`🌍 환경: ${process.env.NODE_ENV}`);
});

// ── 2. HTTP 요청 구조 학습용 주석 ────────────────────────
/*
  HTTP 요청(Request) 구조:
    - req.method  : GET, POST, PUT, DELETE
    - req.url     : /users, /products/1
    - req.headers : Authorization, Content-Type 등
    - req.body    : POST/PUT 요청의 데이터 (http 모듈은 직접 파싱 필요)

  HTTP 응답(Response) 구조:
    - res.writeHead(statusCode, headers)
    - res.end(body)

  주요 상태 코드:
    200 OK          - 성공
    201 Created     - 생성 성공
    400 Bad Request - 잘못된 요청
    401 Unauthorized- 인증 필요
    404 Not Found   - 리소스 없음
    500 Internal    - 서버 오류
*/
