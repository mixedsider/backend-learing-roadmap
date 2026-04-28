const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/comment.controller');
const auth    = require('../middlewares/auth.middleware');

router.delete('/:id', auth, ctrl.remove);

module.exports = router;
