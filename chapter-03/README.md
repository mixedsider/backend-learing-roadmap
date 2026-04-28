# Chapter 03. RESTful API 설계와 구현

## 실행 방법

```bash
cp .env.example .env
npm install
npm run dev
```

## API 엔드포인트

| Method | URL | 설명 |
|--------|-----|------|
| GET | /api/todos | 전체 목록 조회 |
| GET | /api/todos/:id | 단건 조회 |
| POST | /api/todos | 새 Todo 생성 |
| PUT | /api/todos/:id | Todo 수정 |
| DELETE | /api/todos/:id | Todo 삭제 |

## Postman 테스트 예시

```bash
# 전체 조회
curl http://localhost:3000/api/todos

# 생성
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "새로운 할일"}'

# 수정
curl -X PUT http://localhost:3000/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"done": true}'

# 삭제
curl -X DELETE http://localhost:3000/api/todos/1
```

## 학습 포인트
- `express.Router()`로 라우터를 분리하는 방법
- Controller가 HTTP 요청/응답만 담당하는 이유
- `req.params`, `req.body`, `req.query` 차이
