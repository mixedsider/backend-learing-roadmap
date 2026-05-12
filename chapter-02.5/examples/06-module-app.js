// require로 다른 파일의 함수를 가져오기
// 실행: npm run ex:module

const { add, subtract } = require('./06-module-math');

console.log(add(10, 5));
console.log(subtract(10, 5));
