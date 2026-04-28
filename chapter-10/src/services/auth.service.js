const bcrypt   = require('bcrypt');
const jwt      = require('jsonwebtoken');
const userRepo = require('../repositories/user.repository');
const { ConflictError, UnauthorizedError } = require('../errors/AppError');

const makeTokens = (payload) => ({
  accessToken:  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_ACCESS_EXPIRES  || '1h'  }),
  refreshToken: jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES || '7d'  }),
});

exports.signup = async ({ name, email, password }) => {
  if (await userRepo.findByEmail(email)) throw new ConflictError('이미 사용 중인 이메일입니다.');
  const hashed = await bcrypt.hash(password, 10);
  return userRepo.create({ name, email, password: hashed });
};

exports.login = async ({ email, password }) => {
  const user = await userRepo.findByEmail(email);
  if (!user) throw new UnauthorizedError('이메일 또는 비밀번호가 올바르지 않습니다.');
  if (!await bcrypt.compare(password, user.password)) throw new UnauthorizedError('이메일 또는 비밀번호가 올바르지 않습니다.');

  const { accessToken, refreshToken } = makeTokens({ userId: user.id, email: user.email });
  await userRepo.updateRefreshToken(user.id, refreshToken);
  return { accessToken, refreshToken, user: { id: user.id, name: user.name, email: user.email } };
};

exports.logout = (userId) => userRepo.updateRefreshToken(userId, null);
