const express  = require('express');
const router   = express.Router();
const ctrl     = require('../controllers/post.controller');
const cmtCtrl  = require('../controllers/comment.controller');
const auth     = require('../middlewares/auth.middleware');
const { validate, postSchema, commentSchema } = require('../middlewares/validate');

router.get('/',                            ctrl.getAll);
router.get('/:id',                         ctrl.getOne);
router.post('/',   auth, validate(postSchema), ctrl.create);
router.put('/:id', auth, validate(postSchema), ctrl.update);
router.delete('/:id', auth,                ctrl.remove);

// 댓글 (게시글 하위)
router.get('/:postId/comments',                          cmtCtrl.getByPost);
router.post('/:postId/comments', auth, validate(commentSchema), cmtCtrl.create);

module.exports = router;
