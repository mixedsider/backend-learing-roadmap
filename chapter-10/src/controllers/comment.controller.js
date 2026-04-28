const commentService = require('../services/comment.service');

exports.getByPost = async (req, res, next) => {
  try {
    res.status(200).json(await commentService.getByPost(parseInt(req.params.postId)));
  } catch (e) { next(e); }
};

exports.create = async (req, res, next) => {
  try {
    const comment = await commentService.create(parseInt(req.params.postId), req.user.userId, req.body);
    res.status(201).json(comment);
  } catch (e) { next(e); }
};

exports.remove = async (req, res, next) => {
  try {
    await commentService.remove(parseInt(req.params.id), req.user.userId);
    res.status(200).json({ message: '댓글이 삭제되었습니다.' });
  } catch (e) { next(e); }
};
