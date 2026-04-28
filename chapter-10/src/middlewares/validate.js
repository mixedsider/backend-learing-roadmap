const { z } = require('zod');

exports.signupSchema = z.object({
  name:     z.string().min(2, '이름은 2글자 이상'),
  email:    z.string().email('올바른 이메일 형식'),
  password: z.string().min(8, '비밀번호는 8자 이상'),
});

exports.loginSchema = z.object({
  email:    z.string().email(),
  password: z.string().min(1),
});

exports.postSchema = z.object({
  title:   z.string().min(1, '제목 필수').max(200, '200자 이하'),
  content: z.string().min(1, '내용 필수'),
});

exports.commentSchema = z.object({
  content: z.string().min(1, '댓글 내용 필수').max(500, '500자 이하'),
});

exports.validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success)
    return res.status(400).json({ message: '유효성 검사 실패', errors: result.error.flatten().fieldErrors });
  req.body = result.data;
  next();
};
