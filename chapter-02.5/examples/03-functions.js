// 함수와 화살표 함수
// 실행: npm run ex:functions

function add(a, b) {
  return a + b;
}

const multiply = (a, b) => {
  return a * b;
};

const square = (n) => n * n;

console.log(add(2, 3));
console.log(multiply(4, 5));
console.log(square(6));

const printResult = (label, value) => {
  console.log(`${label}: ${value}`);
};

printResult('10 + 20', add(10, 20));
