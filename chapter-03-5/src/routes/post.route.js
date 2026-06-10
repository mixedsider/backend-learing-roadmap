// Chapter 03.5 - post.route.js (실습 및 완성본)
// 아래 코드는 각 HTTP 메서드와 URL 경로를 컨트롤러 함수로 연결하는 라우터 설정 파일입니다.

const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');

// GET /api/posts - 전체 게시글 목록 조회 (작성자 필터링 기능 제공)
router.get('/', postController.getAll);

// GET /api/posts/:id - 특정 ID의 게시글 단건 조회 (조회수 1 증가)
router.get('/:id', postController.getOne);

// POST /api/posts - 새로운 게시글 작성 (유효성 검사 적용)
router.post('/', postController.create);

// PUT /api/posts/:id - 특정 ID의 게시글 정보 수정
router.put('/:id', postController.update);

// DELETE /api/posts/:id - 특정 ID의 게시글 삭제
router.delete('/:id', postController.remove);

module.exports = router;
