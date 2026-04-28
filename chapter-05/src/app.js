const express    = require('express');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth.route');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use('/api/auth', authRouter);

// 글로벌 에러 핸들러
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ message: err.message || '서버 오류' });
});

app.use((req, res) => {
  res.status(404).json({ message: '존재하지 않는 경로입니다.' });
});

module.exports = app;
