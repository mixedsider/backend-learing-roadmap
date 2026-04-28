const express = require('express');
const userRouter = require('./routes/user.route');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use('/api/users', userRouter);

// 글로벌 에러 핸들러
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: '서버 오류가 발생했습니다.', error: err.message });
});

app.use((req, res) => {
  res.status(404).json({ message: '존재하지 않는 경로입니다.' });
});

module.exports = app;
