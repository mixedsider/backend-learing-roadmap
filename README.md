# 실무형 백엔드 개발자 성장 로드맵
> Node.js + MySQL 기준 · 챕터별 예제 코드 모음

## 챕터 구성

| 챕터 | 주제 | 핵심 스택 |
|------|------|-----------|
| chapter-01 | 백엔드 기초 및 환경 구축 | Node.js, dotenv |
| chapter-02 | Git & GitHub 실전 속성 | Git, GitHub |
| chapter-03 | RESTful API 설계와 구현 | Express.js, Postman |
| chapter-04 | 데이터베이스 핵심 및 연동 | MySQL, Prisma ORM |
| chapter-05 | 사용자 인증과 보안 | JWT, bcrypt |
| chapter-06 | 비즈니스 로직과 예외 처리 | Zod, Winston |
| chapter-07 | API 문서화 | Swagger (swagger-jsdoc) |
| chapter-08 | 테스트와 품질 관리 | Jest, Supertest |
| chapter-09 | 배포와 인프라 | AWS EC2/RDS, GitHub Actions, PM2 |
| chapter-10 | 최종 프로젝트 (미니 블로그 API) | 전 챕터 통합 |

## 빠른 시작

```bash
# 각 챕터 폴더로 이동 후
cd chapter-01
cp .env.example .env
npm install
npm run dev
```

## 최종 프로젝트 API 목록 (chapter-10)

### Auth
- `POST /api/auth/signup` - 회원가입
- `POST /api/auth/login`  - 로그인 (JWT 발급)
- `POST /api/auth/logout` - 로그아웃 🔒
- `GET  /api/auth/me`     - 내 정보 조회 🔒

### Posts
- `GET    /api/posts`        - 게시글 목록 (페이지네이션)
- `GET    /api/posts/:id`    - 게시글 상세
- `POST   /api/posts`        - 게시글 작성 🔒
- `PUT    /api/posts/:id`    - 게시글 수정 🔒
- `DELETE /api/posts/:id`    - 게시글 삭제 🔒

### Comments
- `GET    /api/posts/:postId/comments`  - 댓글 목록
- `POST   /api/posts/:postId/comments` - 댓글 작성 🔒
- `DELETE /api/comments/:id`           - 댓글 삭제 🔒

> 🔒 = JWT 인증 필요
