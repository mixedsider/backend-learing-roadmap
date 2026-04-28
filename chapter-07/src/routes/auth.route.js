const express  = require('express');
const router   = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: 인증 관련 API
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: 회원가입
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:     { type: string, example: 이은성 }
 *               email:    { type: string, example: test@test.com }
 *               password: { type: string, example: password123 }
 *     responses:
 *       201:
 *         description: 회원가입 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: 회원가입 성공 }
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: 필수 값 누락
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: 이메일 중복
 */
router.post('/signup', (req, res) => {
  res.status(201).json({ message: '회원가입 성공 (Chapter 07 데모)' });
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: 로그인 (JWT 발급)
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:    { type: string, example: test@test.com }
 *               password: { type: string, example: password123 }
 *     responses:
 *       200:
 *         description: 로그인 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:  { type: string }
 *                 refreshToken: { type: string }
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: 이메일 또는 비밀번호 불일치
 */
router.post('/login', (req, res) => {
  res.status(200).json({
    message: '로그인 성공 (Chapter 07 데모)',
    accessToken: 'eyJhbGciOiJIUzI1NiJ9.demo.token',
  });
});

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: 내 프로필 조회
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: 프로필 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: 인증 토큰 없음 또는 만료
 */
router.get('/me', (req, res) => {
  res.status(200).json({ id: 1, name: '이은성', email: 'test@test.com' });
});

module.exports = router;
