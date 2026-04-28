# Chapter 02. Git & GitHub 실전 속성

이 챕터는 별도의 Node.js 서버를 실행하기보다 Git 저장소 안에서 직접 명령어를 연습하는 챕터입니다.

## 실습 목표

- Working Directory, Staging Area, Repository의 흐름 이해
- `add`, `commit`, `log`, `status`, `branch`, `merge` 명령어 반복 연습
- GitHub 원격 저장소 연결과 Pull Request 흐름 익히기
- `.gitignore`와 커밋 메시지 규칙 적용하기

## 추천 실습 순서

```bash
git status
git add README.md
git commit -m "docs: add chapter 02 practice guide"

git switch -c feature/git-practice
git log --oneline
git switch main
```

## 포함 파일

- `git-command-cheatsheet.md`: 매일 쓰는 Git 명령어 요약
- `commit-message-examples.md`: 좋은 커밋 메시지 예시
- `.gitignore.example`: Node.js 백엔드 프로젝트용 ignore 예시

