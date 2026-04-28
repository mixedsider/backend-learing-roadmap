# Chapter 06. 비즈니스 로직과 예외 처리

## 실행 방법

```bash
npm install
npm run dev
```

## API 엔드포인트

| Method | URL | 설명 |
|--------|-----|------|
| GET | /api/posts | 게시글 목록 조회 |
| GET | /api/posts/:id | 게시글 단건 조회 |
| POST | /api/posts | 게시글 생성 |
| PUT | /api/posts/:id | 게시글 수정 |
| DELETE | /api/posts/:id | 게시글 삭제 |

## 학습 포인트

- Controller, Service, Repository 계층 분리
- `AppError` 기반 커스텀 에러 처리
- 글로벌 에러 핸들러로 응답 형식 통일
- Zod로 요청 body 유효성 검사
- Winston과 morgan으로 애플리케이션 로그 기록

