# Chapter 01. 백엔드 개발의 기초 및 환경 구축

## 실행 방법

```bash
# 1. 환경변수 파일 생성
cp .env.example .env

# 2. 패키지 설치
npm install

# 3. 서버 실행
npm run dev
```

## 테스트

```bash
# 기본 응답
curl http://localhost:3000

# 헬스체크
curl http://localhost:3000/health

# 404 응답
curl http://localhost:3000/unknown
```

## 학습 포인트
- `http` 모듈로 서버를 만드는 방법
- `req.method`, `req.url`로 요청을 구분하는 방법
- `dotenv`로 환경 변수를 분리하는 이유
