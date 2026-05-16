// 함수와 화살표 함수
// 실행: npm run ex:functions

// 입력 받는 값은 a, b ( 매개변수 )
function add(a, b) { // add 라는 이름의 함수 
  return a + b; // 응답 값
}

const multiply = (a, b) => {
  return a * b;
};

const square = (n) => n * n;

console.log(add(2, 3));
console.log(multiply(4, 5));
console.log(square(6));

const printResult = (label, value) => { // label 계산식, value 실제 동작할 함수
  console.log(`${label}: ${value}`);
};

printResult('10 + 20', add(10, 20));
printResult('10 * 2', multiply(10, 2));
printResult('10 제곱', square(10));
