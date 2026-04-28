const jwt      = require('jsonwebtoken');
const pwUtil   = require('../utils/password.util');

// 인메모리 유저 저장소 (테스트용)
const users = [];
let nextId = 1;

exports.signup = async ({ name, email, password }) => {
  if (users.find((u) => u.email === email)) {
    const err = new Error('이미 사용 중인 이메일입니다.'); err.status = 409; throw err;
  }
  const hashed = await pwUtil.hash(password);
  const user = { id: nextId++, name, email, password: hashed };
  users.push(user);
  return { id: user.id, name: user.name, email: user.email };
};

exports.login = async ({ email, password }) => {
  const user = users.find((u) => u.email === email);
  if (!user) { const err = new Error('이메일 또는 비밀번호가 올바르지 않습니다.'); err.status = 401; throw err; }
  const ok = await pwUtil.compare(password, user.password);
  if (!ok)  { const err = new Error('이메일 또는 비밀번호가 올바르지 않습니다.'); err.status = 401; throw err; }
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'test-secret', { expiresIn: '1h' });
  return { accessToken: token, user: { id: user.id, name: user.name, email: user.email } };
};

exports._reset = () => { users.length = 0; nextId = 1; }; // 테스트용 리셋
