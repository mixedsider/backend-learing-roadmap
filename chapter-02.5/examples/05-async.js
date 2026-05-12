// 비동기 처리와 async/await
// 실행: npm run ex:async

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`${ms}ms 작업 완료`);
    }, ms);
  });
}

async function main() {
  console.log('작업 시작');

  const first = await wait(500);
  console.log(first);

  const second = await wait(500);
  console.log(second);

  console.log('작업 종료');
}

main();
