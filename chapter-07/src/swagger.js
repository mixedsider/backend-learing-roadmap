const swaggerJsDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Backend Roadmap API',
      version: '1.0.0',
      description: '실무형 백엔드 개발자 성장 로드맵 - API 문서',
    },
    servers: [
      { url: 'http://localhost:3000', description: '개발 서버' },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: '로그인 후 발급받은 accessToken을 입력하세요.',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id:        { type: 'integer', example: 1 },
            name:      { type: 'string',  example: '이은성' },
            email:     { type: 'string',  example: 'test@test.com' },
            createdAt: { type: 'string',  format: 'date-time' },
          },
        },
        Post: {
          type: 'object',
          properties: {
            id:        { type: 'integer', example: 1 },
            title:     { type: 'string',  example: '첫 번째 게시글' },
            content:   { type: 'string',  example: '게시글 내용입니다.' },
            userId:    { type: 'integer', example: 1 },
            createdAt: { type: 'string',  format: 'date-time' },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            message: { type: 'string', example: '오류 메시지' },
          },
        },
      },
    },
    security: [{ BearerAuth: [] }],
  },
  apis: ['./src/routes/*.js'], // JSDoc 주석이 있는 라우터 파일
};

module.exports = swaggerJsDoc(options);
