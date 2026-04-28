# Chapter 05. 사용자 인증과 보안 (Auth)

## 실행 방법

```bash
cp .env.example .env
npm install
npm run db:migrate
npm run dev
```

## API 엔드포인트

| Method | URL | 설명 |
|--------|-----|------|
| POST | /api/auth/signup | 회원가입 |
| POST | /api/auth/login | 로그인 및 JWT 발급 |
| POST | /api/auth/logout | 로그아웃 |
| GET | /api/auth/me | 내 정보 조회 |

## 학습 포인트

- 인증(Authentication)과 인가(Authorization)의 차이
- bcrypt 기반 비밀번호 해싱
- JWT access token, refresh token 발급
- 인증 미들웨어로 보호된 API 만들기
- cookie-parser와 환경 변수 기반 보안 설정

