const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo.controller');

// GET    /api/todos       - 전체 목록 조회
// GET    /api/todos/:id   - 단건 조회
// POST   /api/todos       - 새 Todo 생성
// PUT    /api/todos/:id   - Todo 수정
// DELETE /api/todos/:id   - Todo 삭제

router.get('/', todoController.getAll);
router.get('/:id', todoController.getOne);
router.post('/', todoController.create);
router.put('/:id', todoController.update);
router.delete('/:id', todoController.remove);

module.exports = router;
