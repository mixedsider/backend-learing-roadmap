// Chapter 03.5 - server.js (실습 및 완성본)
// 아래 코드는 완전하게 동작하는 서버 진입점 코드입니다. 
// 코드를 직접 타이핑하며 흐름을 익혀보세요.

// 1. dotenv 패키지를 불러와 .env 파일에 정의된 환경 변수를 로드합니다.
require('dotenv').config();

// 2. Express 설정이 들어있는 app.js 모듈을 가져옵니다.
const app = require('./app');

// 3. 환경 변수(process.env)에서 포트 번호를 가져오며, 지정되지 않은 경우 기본값으로 3000을 사용합니다.
const PORT = process.env.PORT || 3000;

// 4. Express 앱을 지정된 포트에서 대기(Listen) 상태로 만듭니다.
app.listen(PORT, () => {
  console.log(`✅ [${process.env.NODE_ENV || 'development'}] 서버 실행 중: http://localhost:${PORT}`);
});
