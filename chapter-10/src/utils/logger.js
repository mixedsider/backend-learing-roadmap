const winston = require('winston');
const path    = require('path');
const fs      = require('fs');

// logs 폴더 없으면 생성
if (!fs.existsSync('logs')) fs.mkdirSync('logs');

const { combine, timestamp, printf, colorize, errors } = winston.format;

const fmt = printf(({ level, message, timestamp, stack }) =>
  `${timestamp} [${level}]: ${stack || message}`);

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), errors({ stack: true }), fmt),
  transports: [
    new winston.transports.Console({
      silent: process.env.NODE_ENV === 'test', // 테스트 중 로그 비활성화
      format: combine(colorize(), timestamp({ format: 'HH:mm:ss' }), fmt),
    }),
    new winston.transports.File({ filename: path.join('logs', 'error.log'),    level: 'error' }),
    new winston.transports.File({ filename: path.join('logs', 'combined.log') }),
  ],
});

module.exports = logger;
