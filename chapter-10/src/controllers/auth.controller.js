const authService = require('../services/auth.service');

exports.signup = async (req, res, next) => {
  try {
    const user = await authService.signup(req.body);
    res.status(201).json({ message: '회원가입 성공', user });
  } catch (e) { next(e); }
};

exports.login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    res.status(200).json({ message: '로그인 성공', ...result });
  } catch (e) { next(e); }
};

exports.logout = async (req, res, next) => {
  try {
    await authService.logout(req.user.userId);
    res.status(200).json({ message: '로그아웃 성공' });
  } catch (e) { next(e); }
};

exports.getMe = (req, res) => res.status(200).json({ user: req.user });
