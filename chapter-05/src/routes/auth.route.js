const express      = require('express');
const router       = express.Router();
const authCtrl     = require('../controllers/auth.controller');
const authMW       = require('../middlewares/auth.middleware');

router.post('/signup', authCtrl.signup);     // 회원가입
router.post('/login',  authCtrl.login);      // 로그인
router.post('/logout', authMW, authCtrl.logout); // 로그아웃 (인증 필요)
router.get('/me',      authMW, authCtrl.getMe);  // 내 정보 조회 (인증 필요)

module.exports = router;
