// Chapter 03 - Todo CRUD 컨트롤러
// DB 없이 메모리(배열)로 동작하는 예제입니다.
// Chapter 04에서 MySQL + Prisma로 교체합니다.

let todos = [
  { id: 1, title: '백엔드 공부하기', done: false, createdAt: new Date().toISOString() },
  { id: 2, title: 'Express.js 익히기', done: false, createdAt: new Date().toISOString() },
];
let nextId = 3;

// GET /api/todos - 전체 목록 조회
exports.getAll = (req, res) => {
  res.status(200).json({
    count: todos.length,
    data: todos,
  });
};

// GET /api/todos/:id - 단건 조회
exports.getOne = (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return res.status(404).json({ message: `ID ${id}에 해당하는 Todo가 없습니다.` });
  }

  res.status(200).json(todo);
};

// POST /api/todos - 새 Todo 생성
exports.create = (req, res) => {
  const { title } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({ message: 'title은 필수 값입니다.' });
  }

  const newTodo = {
    id: nextId++,
    title: title.trim(),
    done: false,
    createdAt: new Date().toISOString(),
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
};

// PUT /api/todos/:id - Todo 수정 (전체 교체)
exports.update = (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ message: `ID ${id}에 해당하는 Todo가 없습니다.` });
  }

  const { title, done } = req.body;

  todos[index] = {
    ...todos[index],
    title: title ?? todos[index].title,
    done: done ?? todos[index].done,
    updatedAt: new Date().toISOString(),
  };

  res.status(200).json(todos[index]);
};

// DELETE /api/todos/:id - Todo 삭제
exports.remove = (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ message: `ID ${id}에 해당하는 Todo가 없습니다.` });
  }

  todos.splice(index, 1);
  res.status(200).json({ message: `ID ${id} Todo가 삭제되었습니다.` });
};
