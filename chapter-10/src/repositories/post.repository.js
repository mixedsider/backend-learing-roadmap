const prisma = require('../db/prisma');

const postSelect = {
  id: true, title: true, content: true, createdAt: true, updatedAt: true,
  author: { select: { id: true, name: true, email: true } },
};

exports.findAll = ({ page = 1, limit = 10 }) =>
  prisma.post.findMany({
    select: postSelect,
    orderBy: { createdAt: 'desc' },
    skip: (page - 1) * limit,
    take: limit,
  });

exports.count   = () => prisma.post.count();
exports.findById = (id) => prisma.post.findUnique({ where: { id }, select: { ...postSelect, comments: { select: { id: true, content: true, author: { select: { id: true, name: true } }, createdAt: true } } } });
exports.create  = (data) => prisma.post.create({ data, select: postSelect });
exports.update  = (id, data) => prisma.post.update({ where: { id }, data, select: postSelect });
exports.remove  = (id) => prisma.post.delete({ where: { id } });
