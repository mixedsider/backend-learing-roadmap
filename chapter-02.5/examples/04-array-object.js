// 배열과 객체
// 실행: npm run ex:data

const students = [ // 배열
  { id: 1, name: '지민', major: 'Computer Science', score: 92 }, // 객체
  { id: 2, name: '서연', major: 'Business', score: 84 },
  { id: 3, name: '현우', major: 'Computer Science', score: 76 },
];

console.log('전체 학생');
console.log(students);

const names = students.map((student) => student.name);
console.log('이름 목록');
console.log(names);

const found = students.find((student) => student.id === 2);
console.log('id가 2인 학생');
console.log(found);

const csStudents = students.filter((student) => student.major === 'Computer Science');
console.log('컴퓨터공학 전공 학생');
console.log(csStudents);
