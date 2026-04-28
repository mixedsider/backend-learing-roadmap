const prisma = require('../db/prisma');

// 전체 조회
exports.findAll = () =>
  prisma.user.findMany({
    select: { id: true, name: true, email: true, createdAt: true },
    orderBy: { createdAt: 'desc' },
  });

// 단건 조회 (id)
exports.findById = (id) =>
  prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, email: true, createdAt: true },
  });

// 단건 조회 (email)
exports.findByEmail = (email) =>
  prisma.user.findUnique({ where: { email } });

// 생성
exports.create = (data) =>
  prisma.user.create({
    data,
    select: { id: true, name: true, email: true, createdAt: true },
  });

// 수정
exports.update = (id, data) =>
  prisma.user.update({
    where: { id },
    data,
    select: { id: true, name: true, email: true, updatedAt: true },
  });

// 삭제
exports.remove = (id) =>
  prisma.user.delete({ where: { id } });
