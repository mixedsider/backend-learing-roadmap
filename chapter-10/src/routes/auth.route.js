const express  = require('express');
const router   = express.Router();
const ctrl     = require('../controllers/auth.controller');
const auth     = require('../middlewares/auth.middleware');
const { validate, signupSchema, loginSchema } = require('../middlewares/validate');

router.post('/signup', validate(signupSchema), ctrl.signup);
router.post('/login',  validate(loginSchema),  ctrl.login);
router.post('/logout', auth, ctrl.logout);
router.get('/me',      auth, ctrl.getMe);

module.exports = router;
