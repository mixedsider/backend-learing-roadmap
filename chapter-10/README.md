# Chapter 10. 최종 프로젝트 - 실무형 API 서버 구축

최종 챕터는 지금까지 만든 내용을 합쳐 미니 블로그 REST API를 구성합니다.

## 실행 방법

```bash
cp .env.example .env
npm install
npm run db:migrate
npm run dev
```

## 주요 기능

- 회원가입, 로그인, 로그아웃, 내 정보 조회
- 게시글 CRUD
- 게시글 댓글 작성과 삭제
- JWT 인증 미들웨어
- Prisma 기반 MySQL 연동
- Swagger API 문서
- Jest 테스트와 GitHub Actions 배포 예시

## API 문서

서버 실행 후 아래 주소에서 Swagger UI를 확인합니다.

```text
http://localhost:3000/api-docs
```

