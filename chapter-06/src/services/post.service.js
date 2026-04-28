const postRepository = require('../repositories/post.repository');
const { NotFoundError } = require('../errors/AppError');

exports.getPosts = () => postRepository.findAll();

exports.getPost = (id) => {
  const post = postRepository.findById(id);
  if (!post) throw new NotFoundError('게시글을 찾을 수 없습니다.');
  return post;
};

exports.createPost = (data) => postRepository.create(data);

exports.updatePost = (id, data) => {
  const post = postRepository.update(id, data);
  if (!post) throw new NotFoundError('수정할 게시글을 찾을 수 없습니다.');
  return post;
};

exports.deletePost = (id) => {
  const removed = postRepository.remove(id);
  if (!removed) throw new NotFoundError('삭제할 게시글을 찾을 수 없습니다.');
};

