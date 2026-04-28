const commentRepo = require('../repositories/comment.repository');
const postRepo    = require('../repositories/post.repository');
const { NotFoundError, ForbiddenError } = require('../errors/AppError');

exports.getByPost = async (postId) => {
  const post = await postRepo.findById(postId);
  if (!post) throw new NotFoundError('게시글을 찾을 수 없습니다.');
  return commentRepo.findByPostId(postId);
};

exports.create = async (postId, userId, { content }) => {
  const post = await postRepo.findById(postId);
  if (!post) throw new NotFoundError('게시글을 찾을 수 없습니다.');
  return commentRepo.create({ content, userId, postId });
};

exports.remove = async (id, userId) => {
  const comment = await commentRepo.findById(id);
  if (!comment)              throw new NotFoundError('댓글을 찾을 수 없습니다.');
  if (comment.userId !== userId) throw new ForbiddenError('본인 댓글만 삭제할 수 있습니다.');
  await commentRepo.remove(id);
};
