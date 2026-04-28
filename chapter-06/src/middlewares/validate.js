const { z } = require('zod');

// Zod 스키마 정의
const signupSchema = z.object({
  name:     z.string().min(2, '이름은 2글자 이상이어야 합니다.'),
  email:    z.string().email('올바른 이메일 형식이 아닙니다.'),
  password: z.string().min(8, '비밀번호는 8자 이상이어야 합니다.'),
});

const loginSchema = z.object({
  email:    z.string().email('올바른 이메일 형식이 아닙니다.'),
  password: z.string().min(1, '비밀번호를 입력해주세요.'),
});

const createPostSchema = z.object({
  title:   z.string().min(1, '제목은 필수입니다.').max(200, '제목은 200자 이하입니다.'),
  content: z.string().min(1, '내용은 필수입니다.'),
});

// 유효성 검사 미들웨어 팩토리
const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return res.status(400).json({ message: '유효성 검사 실패', errors });
  }
  req.body = result.data; // 정제된 데이터로 교체
  next();
};

module.exports = { validate, signupSchema, loginSchema, createPostSchema };
