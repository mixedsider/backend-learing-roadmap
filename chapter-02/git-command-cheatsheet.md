# Git Command Cheatsheet

## 상태 확인

```bash
git status
git log --oneline
git diff
```

## 커밋 만들기

```bash
git add .
git commit -m "feat: add login api"
```

## 브랜치

```bash
git branch
git switch -c feature/auth
git switch main
git merge feature/auth
```

## 원격 저장소

```bash
git remote -v
git push origin main
git pull origin main
```

