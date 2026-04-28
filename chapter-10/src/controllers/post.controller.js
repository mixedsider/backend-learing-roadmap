const postService = require('../services/post.service');

exports.getAll = async (req, res, next) => {
  try {
    const page  = parseInt(req.query.page)  || 1;
    const limit = parseInt(req.query.limit) || 10;
    res.status(200).json(await postService.getAll({ page, limit }));
  } catch (e) { next(e); }
};

exports.getOne = async (req, res, next) => {
  try {
    res.status(200).json(await postService.getOne(parseInt(req.params.id)));
  } catch (e) { next(e); }
};

exports.create = async (req, res, next) => {
  try {
    const post = await postService.create(req.user.userId, req.body);
    res.status(201).json(post);
  } catch (e) { next(e); }
};

exports.update = async (req, res, next) => {
  try {
    const post = await postService.update(parseInt(req.params.id), req.user.userId, req.body);
    res.status(200).json(post);
  } catch (e) { next(e); }
};

exports.remove = async (req, res, next) => {
  try {
    await postService.remove(parseInt(req.params.id), req.user.userId);
    res.status(200).json({ message: '게시글이 삭제되었습니다.' });
  } catch (e) { next(e); }
};
