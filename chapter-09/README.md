# Chapter 09. 배포와 인프라 (DevOps 입문)

이 챕터는 `chapter-10` 최종 프로젝트를 실제 서버에 배포하는 흐름을 연습합니다.
예제 workflow는 `chapter-09/.github/workflows/deploy.yml`에 있으며, 실제 GitHub Actions에서 실행하려면 저장소 루트의 `.github/workflows/deploy.yml` 위치에 둡니다.

## AWS EC2 배포 순서

```bash
# 1. EC2 접속
ssh -i your-key.pem ubuntu@EC2_IP

# 2. Node.js 설치 (nvm 사용)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20

# 3. PM2 설치
npm install -g pm2

# 4. 코드 배포
git clone https://github.com/YOUR_USERNAME/backend-roadmap.git
cd backend-roadmap/chapter-10
cp .env.example .env
# .env 파일 수정 (RDS 정보 등)

npm install
npx prisma migrate deploy
pm2 start src/server.js --name backend-api
pm2 startup
pm2 save
```

## GitHub Actions Secrets 설정
- `EC2_HOST`: EC2 퍼블릭 IP
- `EC2_KEY`: EC2 SSH 프라이빗 키 전체 내용
- `JWT_SECRET`: JWT 비밀 키

## .env 분리 전략
| 파일 | 용도 |
|------|------|
| `.env.development` | 로컬 개발 환경 |
| `.env.production` | 운영 서버 환경 (EC2) |
| `.env.test` | 테스트 실행 환경 |

## GitHub Actions 연결

현재 저장소에는 실행 가능한 workflow도 루트 `.github/workflows/deploy.yml`에 추가되어 있습니다.
workflow는 `chapter-10` 폴더에서 의존성 설치, 테스트, Prisma migration, PM2 재시작을 수행합니다.
