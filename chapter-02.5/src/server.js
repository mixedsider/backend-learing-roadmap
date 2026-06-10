const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let students = [
  { id: 1, name: '지민', major: 'Computer Science' },
  { id: 2, name: '서연', major: 'Business' },
];
let nextId = 3;

app.get('/', (req, res) => {
  res.json({
    message: 'Chapter 02.5 JavaScript + Express 예제 서버',
    endpoints: ['/api/students', '/api/students/:id'],
  });
});

app.get('/api/students', (req, res) => {
  res.json({
    count: students.length,
    data: students,
  });
});

app.get('/api/students/:id', (req, res) => {
  const id = Number(req.params.id);
  const student = students.find((item) => item.id === id);

  if (!student) {
    return res.status(404).json({ message: '학생을 찾을 수 없습니다.' });
  }

  res.json(student);
});

app.post('/api/students', (req, res) => {
  const { name, major } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'name은 필수 값입니다.' });
  }

  const newStudent = {
    id: nextId++,
    name,
    major: major || 'Undeclared',
  };

  students.push(newStudent);

  res.status(201).json(newStudent);
});

app.use((req, res) => {
  res.status(404).json({ message: '존재하지 않는 경로입니다.' });
});

app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
