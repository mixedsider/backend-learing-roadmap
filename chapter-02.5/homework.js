// 온라인이니까 숙제 하나만 하자.

/*
문제. 학생들이라는 배열이 주어질 때
학생들 테스트 점수가 score 로 주어진다.
score 기준 합격점이 70점 이상일 때,
합격된 학생들의 평균 점수를 구하시오.
*/

const students = [
  { id: 1, score: 92 }, // 객체
  { id: 2, score: 84 },
  { id: 3, score: 76 },
  { id: 4, score: 10 }, // 객체
  { id: 5, score: 50 },
  { id: 6, score: 70 },
  { id: 7, score: 40 }, // 객체
  { id: 8, score: 94 },
  { id: 9, score: 100 },
  { id: 10, score: 20 }, // 객체
  { id: 11, score: 84 },
  { id: 12, score: 56 },
  { id: 13, score: 21 }, // 객체
  { id: 14, score: 67 },
  { id: 15, score: 13 },
];

// 점수가 70 점이 넘는 학생들만 남기기
const studentPass = students.filter((student) => student.score >= 70 );

// 점수 배열로 변경
const studentPassScores = studentPass.map((student) => student.score );

let sum = 0;
for( let i = 0; i < studentPassScores.length; i++ ) {
    const score = studentPassScores[i];
    sum += score;
}

console.log(sum / studentPassScores.length);