# Chapter 02.5. JavaScript 기초와 Node.js/Express 입문

이 챕터는 Git 학습 이후, Express 기반 REST API를 만들기 전에 필요한 JavaScript 문법을 빠르게 익히는 다리 역할을 합니다.

대상은 C언어를 조금 알고 있지만 JavaScript는 처음 배우는 대학생입니다. 아주 작은 예제부터 시작해서 `Node.js`로 실행하고, 마지막에는 `Express` 서버 코드를 읽고 수정할 수 있는 수준까지 진행합니다.

## 학습 목표

- C언어와 JavaScript의 실행 방식 차이를 이해한다.
- `let`, `const`, 문자열, 배열, 객체, 함수의 기본 사용법을 익힌다.
- `require`, `module.exports`로 파일을 나누는 방법을 이해한다.
- 콜백, Promise, `async/await`가 왜 필요한지 감을 잡는다.
- Express에서 자주 만나는 `req`, `res`, `next`, 라우터 코드를 읽을 수 있다.

## 실행 방법

```bash
cd chapter-02.5
npm install

# 문법 예제 실행
npm run ex:hello
npm run ex:variables
npm run ex:functions
npm run ex:data
npm run ex:async
npm run ex:module

# Express 미니 서버 실행
npm run dev
```

서버 실행 후 브라우저나 터미널에서 확인합니다.

```bash
curl http://localhost:3000
curl http://localhost:3000/api/students
curl http://localhost:3000/api/students/1
curl -X POST http://localhost:3000/api/students \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"민수\",\"major\":\"Computer Science\"}"
```

## 1. C언어와 JavaScript의 큰 차이

| 구분 | C언어 | JavaScript |
|------|------|------------|
| 실행 전 단계 | 컴파일 필요 | Node.js가 바로 실행 |
| 변수 타입 | `int`, `char`처럼 명시 | 값에 따라 타입이 결정 |
| 메모리 관리 | 개발자가 많이 신경 씀 | 런타임이 자동 관리 |
| 주 사용처 | 시스템, 임베디드, 알고리즘 | 웹, 서버, 자동화, 앱 |
| 서버 실행 | 별도 프레임워크 필요 | Node.js + Express 조합이 흔함 |

JavaScript는 C보다 타입이 느슨합니다. 그래서 처음에는 편하지만, 실무에서는 값의 모양을 의식해서 코드를 작성해야 합니다.

```js
let count = 3;
count = '세 개'; // JavaScript에서는 가능하지만, 좋은 코드는 아닙니다.
```

## 2. 변수: `let`과 `const`

C언어에서 변수는 보통 타입을 먼저 씁니다.

```c
int age = 20;
```

JavaScript에서는 타입 대신 `let` 또는 `const`를 씁니다.

```js
let age = 20;
const school = 'Backend University';

age = 21;      // 가능
school = 'X';  // 오류: const는 재할당 불가
```

기본 규칙은 간단합니다.

- 다시 대입할 값이면 `let`
- 바꾸지 않을 값이면 `const`
- `var`는 오래된 문법이므로 수업에서는 사용하지 않음

## 3. 조건문과 반복문

조건문과 반복문은 C언어와 모양이 비슷합니다.

```js
const score = 85;

if (score >= 90) {
  console.log('A');
} else if (score >= 80) {
  console.log('B');
} else {
  console.log('C');
}

for (let i = 0; i < 3; i++) {
  console.log(i);
}
```

다만 JavaScript에서는 배열을 순회할 때 `for...of`를 자주 사용합니다.

```js
const names = ['지민', '서연', '현우'];

for (const name of names) {
  console.log(name);
}
```

## 4. 함수

C언어 함수와 비교하면 JavaScript 함수는 더 자유롭습니다.

```c
int add(int a, int b) {
  return a + b;
}
```

```js
function add(a, b) {
  return a + b;
}

const multiply = (a, b) => {
  return a * b;
};

const square = (n) => n * n;
```

Express 코드에서는 화살표 함수가 자주 나옵니다.

```js
app.get('/', (req, res) => {
  res.json({ message: 'Hello Express' });
});
```

`(req, res) => { ... }`는 "요청이 들어왔을 때 실행할 함수"라고 읽으면 됩니다.

## 5. 배열과 객체

JavaScript 서버 코드는 배열과 객체를 매우 많이 사용합니다.

```js
const student = {
  id: 1,
  name: '지민',
  major: 'Computer Science',
};

console.log(student.name);

const students = [
  { id: 1, name: '지민' },
  { id: 2, name: '서연' },
];

const found = students.find((student) => student.id === 1);
```

객체는 API 응답의 기본 모양입니다.

```js
res.json({
  count: students.length,
  data: students,
});
```

## 6. 구조 분해 할당과 스프레드 문법

Express에서 `req.body`에서 값을 꺼낼 때 자주 사용합니다.

```js
const body = { name: '민수', major: 'Computer Science' };
const { name, major } = body;
```

객체를 복사하면서 일부만 바꿀 때는 스프레드 문법을 사용합니다.

```js
const student = { id: 1, name: '지민', major: 'Math' };
const updated = { ...student, major: 'Computer Science' };
```

이 문법은 Chapter 03 이후의 컨트롤러 코드에서 계속 등장합니다.

## 7. 모듈: 파일 나누기

Node.js에서는 한 파일의 값을 다른 파일에서 가져올 수 있습니다.

```js
// math.js
function add(a, b) {
  return a + b;
}

module.exports = { add };
```

```js
// app.js
const { add } = require('./math');

console.log(add(2, 3));
```

이 저장소의 Express 예제도 같은 방식으로 파일을 나눕니다.

```js
const app = require('./app');
const studentRouter = require('./routes/student.route');
```

## 8. 비동기 처리: Promise와 `async/await`

서버는 파일 읽기, DB 조회, 외부 API 호출처럼 시간이 걸리는 작업을 자주 합니다. 이때 프로그램 전체가 멈추지 않도록 비동기 처리를 사용합니다.

```js
function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`${ms}ms 기다림`);
    }, ms);
  });
}

async function main() {
  const result = await wait(1000);
  console.log(result);
}

main();
```

`await`는 Promise가 끝날 때까지 해당 함수 안에서 기다립니다. 나중에 Prisma로 DB를 조회할 때 다음과 같은 코드를 만나게 됩니다.

```js
const user = await prisma.user.findUnique({
  where: { id },
});
```

## 9. Express에서 꼭 알아야 할 JavaScript

Express 코드는 처음 보면 낯설지만, 대부분은 지금까지 배운 문법의 조합입니다.

```js
app.use(express.json());

app.get('/api/students/:id', (req, res) => {
  const id = Number(req.params.id);
  const student = students.find((item) => item.id === id);

  if (!student) {
    return res.status(404).json({ message: '학생을 찾을 수 없습니다.' });
  }

  res.json(student);
});
```

읽는 순서는 다음과 같습니다.

- `app.get(...)`: GET 요청을 받을 경로 등록
- `'/api/students/:id'`: `:id`는 URL 파라미터
- `(req, res) => { ... }`: 요청 처리 함수
- `req.params.id`: URL에서 넘어온 값
- `res.status(404).json(...)`: 상태 코드와 JSON 응답
- `return`: 응답 후 함수 종료

## 10. 수업 진행 추천 순서

1. `examples/01-hello.js`로 Node.js 실행 확인
2. `examples/02-variables.js`로 `let`, `const`, 타입 확인
3. `examples/03-functions.js`로 함수와 화살표 함수 비교
4. `examples/04-array-object.js`로 배열, 객체, `find`, `map` 연습
5. `examples/05-async.js`로 `async/await` 맛보기
6. `examples/06-module-app.js`로 `require`와 `module.exports` 확인
7. `src/server.js` 실행 후 Express 라우팅 확인

## 연습 문제

1. `examples/04-array-object.js`에서 전공이 `Computer Science`인 학생만 출력해보세요.
2. `src/server.js`에 `GET /api/students?major=Computer Science` 검색 기능을 추가해보세요.
3. `POST /api/students`에서 `name`이 없으면 400 응답을 보내도록 수정해보세요.
4. `PUT /api/students/:id` 라우트를 추가해 학생 정보를 수정해보세요.

## 포함 파일

- `examples/`: JavaScript 기초 문법 예제
- `src/server.js`: Express 미니 서버
- `package.json`: 실행 스크립트와 의존성
- `CH02_5_JavaScript_Node_Express_입문.pptx`: 수업용 PPT
