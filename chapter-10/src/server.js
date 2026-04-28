require('dotenv').config();
const app    = require('./app');
const logger = require('./utils/logger');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`✅ 서버 실행 중: http://localhost:${PORT}`);
  logger.info(`📄 API 문서:    http://localhost:${PORT}/api-docs`);
  logger.info(`🌍 환경:        ${process.env.NODE_ENV}`);
});
