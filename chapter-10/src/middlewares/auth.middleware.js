const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors/AppError');

const authMiddleware = (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer '))
      throw new UnauthorizedError('토큰이 없습니다.');

    const token   = header.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError')
      return next(new UnauthorizedError('토큰이 만료되었습니다.'));
    if (err.name === 'JsonWebTokenError')
      return next(new UnauthorizedError('유효하지 않은 토큰입니다.'));
    next(err);
  }
};

module.exports = authMiddleware;
