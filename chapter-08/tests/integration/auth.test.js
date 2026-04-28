const request     = require('supertest');
const app         = require('../../src/app');
const authService = require('../../src/services/auth.service');

// 각 테스트 전 인메모리 유저 초기화
beforeEach(() => authService._reset());

describe('POST /api/auth/signup', () => {
  const validUser = { name: '테스터', email: 'test@test.com', password: 'password123' };

  it('✅ 올바른 정보로 회원가입 성공 (201)', async () => {
    const res = await request(app).post('/api/auth/signup').send(validUser);

    expect(res.statusCode).toBe(201);
    expect(res.body.user).toHaveProperty('id');
    expect(res.body.user.email).toBe(validUser.email);
    expect(res.body.user).not.toHaveProperty('password'); // 비밀번호 노출 방지
  });

  it('❌ 이메일 누락 시 400 반환', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({ name: '테스터', password: 'password123' });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message');
  });

  it('❌ 중복 이메일로 재가입 시 409 반환', async () => {
    await request(app).post('/api/auth/signup').send(validUser);
    const res = await request(app).post('/api/auth/signup').send(validUser);

    expect(res.statusCode).toBe(409);
  });
});

describe('POST /api/auth/login', () => {
  beforeEach(async () => {
    await request(app)
      .post('/api/auth/signup')
      .send({ name: '테스터', email: 'test@test.com', password: 'password123' });
  });

  it('✅ 올바른 정보로 로그인 성공 (200)', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@test.com', password: 'password123' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('accessToken');
    expect(res.body.user.email).toBe('test@test.com');
  });

  it('❌ 틀린 비밀번호로 로그인 시 401 반환', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@test.com', password: 'wrongpassword' });

    expect(res.statusCode).toBe(401);
  });

  it('❌ 존재하지 않는 이메일로 로그인 시 401 반환', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'notexist@test.com', password: 'password123' });

    expect(res.statusCode).toBe(401);
  });
});
