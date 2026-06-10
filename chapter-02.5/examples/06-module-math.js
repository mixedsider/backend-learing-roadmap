// 다른 파일에서 사용할 함수를 내보내는 파일입니다.

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

const multiply = (a, b) => {
  return a * b;
}

const divide = (a, b) => { // 나누기는 조건이 있다. 분모가 0 이면 안된다!
  if( b === 0 ) return 0; // 예외 처리 개발자들은 이게 재일 중요하다.
  return a / b;
}

module.exports = {
  add,
  subtract,
  multiply,
  divide
};
