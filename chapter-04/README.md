# Chapter 04. 데이터베이스 핵심 및 연동

## 실행 전 준비

```bash
# MySQL에서 데이터베이스 생성
mysql -u root -p
CREATE DATABASE backend_ch04;
```

## 실행 방법

```bash
cp .env.example .env
# .env의 DATABASE_URL을 본인 MySQL 정보로 수정

npm install
npm run db:migrate   # 마이그레이션 (테이블 생성)
npm run dev
```

## 학습 포인트
- Prisma 스키마로 MySQL 테이블 자동 생성
- Repository 패턴으로 DB 쿼리 분리
- `prisma.user.findMany()` 등 Prisma CRUD 메서드
- `npm run db:studio` 로 GUI에서 DB 확인
