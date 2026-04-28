const authService = require('../services/auth.service');

// POST /api/auth/signup
exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'name, email, password는 필수 값입니다.' });
    }
    const user = await authService.signup({ name, email, password });
    res.status(201).json({ message: '회원가입 성공', user });
  } catch (err) {
    next(err);
  }
};

// POST /api/auth/login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'email, password는 필수 값입니다.' });
    }
    const result = await authService.login({ email, password });
    res.status(200).json({ message: '로그인 성공', ...result });
  } catch (err) {
    next(err);
  }
};

// POST /api/auth/logout  (인증 미들웨어 필요)
exports.logout = async (req, res, next) => {
  try {
    await authService.logout(req.user.userId);
    res.status(200).json({ message: '로그아웃 성공' });
  } catch (err) {
    next(err);
  }
};

// GET /api/auth/me  (인증 미들웨어 필요)
exports.getMe = (req, res) => {
  res.status(200).json({ user: req.user });
};
