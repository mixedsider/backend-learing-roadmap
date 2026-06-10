// 변수와 기본 타입
// 실행: npm run ex:variables

let score = 85; 
const studentName = '지민';
const isPassed = score >= 60; // true / false

console.log(studentName); // 지민
console.log(score); // 85
console.log(isPassed); // true

score = 92;
console.log(`수정된 점수: ${score}`); // 수정된 점수: 92

console.log(typeof score); // let 생각을 했는데 확인해보니 number 타입
console.log(typeof studentName); // const >> string 타입
console.log(typeof isPassed); // const >> boolean 타입
