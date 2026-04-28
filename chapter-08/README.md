# Chapter 08. 테스트와 품질 관리

## 실행 방법

```bash
npm install
npm test
```

## 포함된 테스트

- `tests/unit/password.util.test.js`: bcrypt 기반 비밀번호 유틸 단위 테스트
- `tests/integration/auth.test.js`: Supertest 기반 회원가입/로그인 통합 테스트

## 학습 포인트

- Jest 기본 설정
- Unit Test와 Integration Test의 차이
- Supertest로 Express API 테스트하기
- 테스트마다 독립적인 상태를 만들기 위한 reset 처리

