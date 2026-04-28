const express = require('express');
const controller = require('../controllers/post.controller');
const { validate, createPostSchema } = require('../middlewares/validate');

const router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.post('/', validate(createPostSchema), controller.create);
router.put('/:id', validate(createPostSchema.partial()), controller.update);
router.delete('/:id', controller.remove);

module.exports = router;

