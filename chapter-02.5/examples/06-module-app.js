// require로 다른 파일의 함수를 가져오기
// 실행: npm run ex:module

const { add, subtract, multiply, divide } = require('./06-module-math');

console.log(add(10, 5)); // 15
console.log(subtract(10, 5)); // 5
console.log(multiply(5, 5)); // 25
console.log(divide(10, 0)); // 일부러 분모 부분에 0 을 넣어요! 예상값 0
console.log(divide(10, 5)); // 2
