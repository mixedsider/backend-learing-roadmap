const prisma = require('../db/prisma');

exports.findByEmail = (email) => prisma.user.findUnique({ where: { email } });
exports.findById   = (id)    => prisma.user.findUnique({ where: { id } });

exports.create = (data) =>
  prisma.user.create({
    data,
    select: { id: true, name: true, email: true, createdAt: true },
  });

exports.updateRefreshToken = (id, refreshToken) =>
  prisma.user.update({ where: { id }, data: { refreshToken } });
