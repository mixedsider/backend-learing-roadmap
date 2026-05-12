// 다른 파일에서 사용할 함수를 내보내는 파일입니다.

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

module.exports = {
  add,
  subtract,
};
