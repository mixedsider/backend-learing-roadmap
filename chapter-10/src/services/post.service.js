const postRepo = require('../repositories/post.repository');
const { NotFoundError, ForbiddenError } = require('../errors/AppError');

exports.getAll = async ({ page, limit }) => {
  const [posts, total] = await Promise.all([postRepo.findAll({ page, limit }), postRepo.count()]);
  return { total, page, limit, totalPages: Math.ceil(total / limit), data: posts };
};

exports.getOne = async (id) => {
  const post = await postRepo.findById(id);
  if (!post) throw new NotFoundError('게시글을 찾을 수 없습니다.');
  return post;
};

exports.create = (userId, data) => postRepo.create({ ...data, userId });

exports.update = async (id, userId, data) => {
  const post = await postRepo.findById(id);
  if (!post)              throw new NotFoundError('게시글을 찾을 수 없습니다.');
  if (post.author.id !== userId) throw new ForbiddenError('본인 게시글만 수정할 수 있습니다.');
  return postRepo.update(id, data);
};

exports.remove = async (id, userId) => {
  const post = await postRepo.findById(id);
  if (!post)              throw new NotFoundError('게시글을 찾을 수 없습니다.');
  if (post.author.id !== userId) throw new ForbiddenError('본인 게시글만 삭제할 수 있습니다.');
  await postRepo.remove(id);
};
