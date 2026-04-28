const bcrypt    = require('bcrypt');
const jwt       = require('jsonwebtoken');
const userRepo  = require('../repositories/user.repository');

const SALT_ROUNDS = 10;

// ── 토큰 생성 헬퍼 ────────────────────────────────────────
const generateTokens = (payload) => {
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES || '1h',
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES || '7d',
  });
  return { accessToken, refreshToken };
};

// ── 회원가입 ──────────────────────────────────────────────
exports.signup = async ({ name, email, password }) => {
  // 1. 이메일 중복 검사
  const existing = await userRepo.findByEmail(email);
  if (existing) {
    const err = new Error('이미 사용 중인 이메일입니다.');
    err.status = 409;
    throw err;
  }

  // 2. 비밀번호 해싱
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  // 3. DB 저장
  const user = await userRepo.create({ name, email, password: hashedPassword });
  return user;
};

// ── 로그인 ────────────────────────────────────────────────
exports.login = async ({ email, password }) => {
  // 1. 이메일로 유저 조회
  const user = await userRepo.findByEmail(email);
  if (!user) {
    const err = new Error('이메일 또는 비밀번호가 올바르지 않습니다.');
    err.status = 401;
    throw err;
  }

  // 2. 비밀번호 검증
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const err = new Error('이메일 또는 비밀번호가 올바르지 않습니다.');
    err.status = 401;
    throw err;
  }

  // 3. 토큰 발급
  const payload = { userId: user.id, email: user.email };
  const { accessToken, refreshToken } = generateTokens(payload);

  // 4. Refresh Token DB 저장
  await userRepo.updateRefreshToken(user.id, refreshToken);

  return {
    accessToken,
    refreshToken,
    user: { id: user.id, name: user.name, email: user.email },
  };
};

// ── 로그아웃 ──────────────────────────────────────────────
exports.logout = async (userId) => {
  await userRepo.updateRefreshToken(userId, null);
};
