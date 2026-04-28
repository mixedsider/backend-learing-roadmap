const express     = require('express');
const authService = require('./services/auth.service');

const app = express();
app.use(express.json());

app.post('/api/auth/signup', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: 'name, email, password는 필수입니다.' });
    const user = await authService.signup({ name, email, password });
    res.status(201).json({ message: '회원가입 성공', user });
  } catch (err) { next(err); }
});

app.post('/api/auth/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: 'email, password는 필수입니다.' });
    const result = await authService.login({ email, password });
    res.status(200).json({ message: '로그인 성공', ...result });
  } catch (err) { next(err); }
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;
