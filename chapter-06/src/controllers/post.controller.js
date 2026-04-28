const postService = require('../services/post.service');

exports.getAll = (req, res, next) => {
  try {
    const posts = postService.getPosts();
    res.status(200).json({ count: posts.length, data: posts });
  } catch (err) {
    next(err);
  }
};

exports.getOne = (req, res, next) => {
  try {
    const post = postService.getPost(Number(req.params.id));
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
};

exports.create = (req, res, next) => {
  try {
    const post = postService.createPost(req.body);
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};

exports.update = (req, res, next) => {
  try {
    const post = postService.updatePost(Number(req.params.id), req.body);
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
};

exports.remove = (req, res, next) => {
  try {
    postService.deletePost(Number(req.params.id));
    res.status(200).json({ message: '게시글이 삭제되었습니다.' });
  } catch (err) {
    next(err);
  }
};

