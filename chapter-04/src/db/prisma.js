const { PrismaClient } = require('@prisma/client');

// PrismaClient 싱글톤 패턴
// 개발 환경에서 Hot Reload 시 여러 인스턴스가 생기는 것을 방지
const globalForPrisma = global;

const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

module.exports = prisma;
