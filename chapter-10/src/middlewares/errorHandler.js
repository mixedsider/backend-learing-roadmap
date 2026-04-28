const { AppError } = require('../errors/AppError');
const logger = require('../utils/logger');

module.exports = (err, req, res, next) => {
  logger.error(err);

  if (err.code === 'P2025') return res.status(404).json({ message: '리소스를 찾을 수 없습니다.' });
  if (err.code === 'P2002') return res.status(409).json({ message: '이미 존재하는 값입니다.' });

  if (err.isOperational) return res.status(err.statusCode).json({ message: err.message });

  const isDev = process.env.NODE_ENV !== 'production';
  res.status(500).json({
    message: '서버 오류가 발생했습니다.',
    ...(isDev && { error: err.message }),
  });
};
