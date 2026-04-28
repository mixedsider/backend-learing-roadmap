const jwt      = require('jsonwebtoken');
const userRepo = require('../repositories/user.repository');

const authMiddleware = async (req, res, next) => {
  try {
    // 1. Authorization 헤더 확인
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: '토큰이 없습니다.' });
    }

    // 2. 토큰 추출
    const token = authHeader.split(' ')[1];

    // 3. 토큰 검증
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. 유저 존재 여부 확인 (선택 - 보안 강화 시)
    const user = await userRepo.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: '존재하지 않는 사용자입니다.' });
    }

    // 5. 다음 미들웨어/컨트롤러에서 사용 가능하도록 req에 추가
    req.user = { userId: user.id, email: user.email, name: user.name };
    next();

  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: '토큰이 만료되었습니다.' });
    }
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: '유효하지 않은 토큰입니다.' });
    }
    next(err);
  }
};

module.exports = authMiddleware;
