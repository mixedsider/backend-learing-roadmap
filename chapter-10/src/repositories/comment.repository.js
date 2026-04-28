const prisma = require('../db/prisma');

exports.findByPostId = (postId) =>
  prisma.comment.findMany({
    where: { postId },
    select: { id: true, content: true, createdAt: true, author: { select: { id: true, name: true } } },
    orderBy: { createdAt: 'asc' },
  });

exports.findById = (id) => prisma.comment.findUnique({ where: { id } });
exports.create   = (data) => prisma.comment.create({ data, select: { id: true, content: true, createdAt: true, author: { select: { id: true, name: true } } } });
exports.remove   = (id) => prisma.comment.delete({ where: { id } });
