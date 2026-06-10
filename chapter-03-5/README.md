# Chapter 03.5. [통합 복습] 간단한 게시판 API & Git/GitHub 실전

이 챕터는 앞서 배운 세 가지 챕터의 내용을 유기적으로 결합하여, **직접 손으로 코드를 따라 치며(Typing-along)** 하나의 완성된 게시판 API 서버를 구축하고, 이를 Git/GitHub 흐름을 통해 원격 저장소에 올리고 PR(Pull Request)을 병합하는 과정을 학습합니다.

### 🔍 복습 핵심 키워드
1. **Chapter 01 (백엔드 기초)**: Node.js 프로젝트 구조, 환경 변수(`dotenv`), 개발 서버 가동(`nodemon`)
2. **Chapter 02 (Git & GitHub)**: `git init`, `.gitignore`, `branch` 활용, **GitHub 원격 저장소 연동 및 PR(Pull Request) 생성/병합**
3. **Chapter 03 (REST API)**: Express.js 프레임워크, MVC 패턴(Routes - Controllers), HTTP 메서드 및 상태 코드, JSON 바디 파싱, 커스텀 미들웨어(Logging & 에러 핸들러)

---

## 🚀 실습 진행 순서

---

### [Step 1] Git 초기 설정 및 GitHub 연동 (Ch 02 & Ch 02-5 복습)

서버 코드를 작성하기 전에, 버전 관리를 활성화하고 GitHub 원격 저장소와 연결합니다.

1. **프로젝트 폴더로 이동하여 Git 초기화**
   터미널에서 `chapter-03-5` 폴더 내부로 이동하여 Git 로컬 저장소를 시작합니다.
   ```bash
   cd chapter-03-5
   git init
   ```

2. **`.gitignore` 설정하기**
   보안 정보(`.env`)나 용량이 매우 큰 `node_modules` 폴더가 Git에 추적되지 않도록 제외해 주어야 합니다.
   제공된 `.gitignore.example` 파일을 참고하여 **`.gitignore`** 파일을 새로 생성하고 아래 내용을 입력하세요.
   ```text
   # .gitignore
   node_modules/
   .env
   *.log
   .DS_Store
   ```

3. **첫 커밋 생성하기**
   설정 파일들을 추가하고 첫 번째 커밋을 작성합니다. (Ch 02-7 커밋 컨벤션 적용)
   ```bash
   git status
   git add package.json .env.example .gitignore.example .gitignore
   git commit -m "chore: initial project configuration"
   ```

4. **GitHub 원격 저장소 생성 및 연동 (Ch 02-5 복습)**
   - 본인의 GitHub 사이트에 접속하여 새 Repository(`backend-practice-board` 등)를 생성합니다. (README.md, .gitignore 생성 체크박스 해제 필수)
   - 생성된 원격 저장소 URL을 복사하여 로컬 저장소와 연결하고 메인 브랜치로 푸시합니다.
   ```bash
   # 본인의 GitHub 저장소 주소로 교체하세요.
   git remote add origin https://github.com/본인계정/저장소이름.git
   
   # 기본 브랜치 이름을 main으로 명명
   git branch -M main
   
   # 원격 저장소로 첫 푸시
   git push -u origin main
   ```

---

### [Step 2] 기능 개발을 위한 브랜치 분할 (Ch 02-4 복습)

실무에서는 안정적인 배포 버전인 `main` 브랜치에 직접 코드를 작성하지 않고, 별도의 기능 브랜치를 생성하여 작업한 후 리뷰를 거쳐 합칩니다.

1. **개발용 `feature/board-api` 브랜치 생성 및 이동**
   ```bash
   git switch -c feature/board-api
   # 또는 기존 명령어: git checkout -b feature/board-api
   ```
2. 현재 활성화된 브랜치가 `feature/board-api`인지 확인합니다.
   ```bash
   git branch
   ```

---

### [Step 3] Node.js 프로젝트 초기화 및 의존성 설치 (Ch 01 & Ch 03 복습)

1. **패키지 설치**
   미리 준비된 `package.json`을 기반으로 Express 및 환경 구축에 필요한 패키지들을 로컬 환경에 설치합니다.
   ```bash
   npm install
   ```
   * 설치가 완료되면 폴더에 `node_modules` 폴더와 `package-lock.json` 파일이 자동 생성됩니다.*

2. **설치된 패키지 확인 (`package.json`)**
   - `express`: REST API 라우팅 및 HTTP 요청/응답 처리를 위한 프레임워크
   - `dotenv`: 외부 환경 변수 파일(`.env`)을 `process.env`로 로드
   - `nodemon` (devDependencies): 소스 코드 변경 시 자동으로 서버를 재시작해주는 개발 도구

---

### [Step 4] 환경 변수 설정 (Ch 01-5 복습)

포트 번호와 환경 상태를 저장할 환경 변수 파일을 만듭니다.

1. **`.env` 파일 생성**
   제공된 `.env.example` 파일을 복사하여 `.env` 파일을 생성합니다.
   ```bash
   cp .env.example .env
   # 윈도우 PowerShell의 경우: Copy-Item .env.example .env
   ```

2. **`.env` 설정 값 채우기**
   생성된 `.env` 파일을 열고 다음과 같이 작성합니다.
   ```ini
   PORT=3000
   NODE_ENV=development
   ```

---

### [Step 5] 스켈레톤 코드 채우기 & 직접 타이핑 (Ch 01 & Ch 03 복습)

이제 `src/` 폴더 아래에 생성된 스켈레톤 파일들을 열어 하나씩 코드를 직접 손으로 치며 서버를 조립해 나갑니다.

#### 5-1. `src/server.js` 작성하기
서버 구동의 **진입점(Entry Point)** 파일입니다. `src/server.js` 파일을 열고 아래 코드를 타이핑하세요.

```javascript
// src/server.js
// 1. dotenv 환경 변수 로드
require('dotenv').config();

// 2. Express 애플리케이션 모듈(app.js) 가져오기
const app = require('./app');

// 3. 환경 변수에서 PORT 포트 번호 가져오기 (기본값: 3000)
const PORT = process.env.PORT || 3000;

// 4. 지정한 포트로 서버 리스닝(구동) 시작
app.listen(PORT, () => {
  console.log(`✅ [${process.env.NODE_ENV}] 서버가 http://localhost:${PORT} 에서 정상 가동 중입니다.`);
});
```

---

#### 5-2. `src/app.js` 작성하기
Express 인스턴스를 설정하고 공통 미들웨어, 라우터, 에러 처리 미들웨어를 장착합니다. `src/app.js` 파일을 열고 아래 코드를 타이핑하세요.

```javascript
// src/app.js
const express = require('express');
const postRouter = require('./routes/post.route');

const app = express();

// ── 1. 공통 미들웨어 설정 ──────────────────────────────────
// 요청 바디(JSON 포맷)를 파싱하기 위한 미들웨어
app.use(express.json());
// 요청 바디(URL-encoded)를 파싱하기 위한 미들웨어
app.use(express.urlencoded({ extended: true }));

// 간단한 요청 기록(Logging) 미들웨어
app.use((req, res, next) => {
  const now = new Date().toISOString();
  console.log(`[${now}] ${req.method} ${req.url}`);
  next(); // 다음 미들웨어 또는 라우터로 제어를 넘김
});

// ── 2. 라우터 연결 ─────────────────────────────────────────
// '/api/posts'로 시작하는 요청은 postRouter로 전송
app.use('/api/posts', postRouter);

// ── 3. 에러 및 404 예외 처리 미들웨어 ──────────────────────
// 일치하는 라우터 경로가 없을 때 발생하는 404 예외 처리
app.use((req, res, next) => {
  res.status(404).json({ message: '존재하지 않는 API 경로입니다.' });
});

// 서버 내부에서 발생한 모든 에러(500)를 통합 관리하는 에러 핸들러
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: '서버 내부 오류가 발생했습니다.',
    error: err.message
  });
});

module.exports = app;
```

---

#### 5-3. `src/routes/post.route.js` 작성하기
게시글 CRUD에 대한 엔드포인트를 정의하고 이를 컨트롤러와 매핑합니다. `src/routes/post.route.js` 파일을 열고 아래 코드를 타이핑하세요.

```javascript
// src/routes/post.route.js
const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');

// GET    /api/posts      - 전체 게시글 목록 조회 (작성자 검색 포함)
router.get('/', postController.getAll);

// GET    /api/posts/:id  - 특정 게시글 단건 조회 (조회수 1 증가)
router.get('/:id', postController.getOne);

// POST   /api/posts      - 새로운 게시글 생성 (유효성 검사 적용)
router.post('/', postController.create);

// PUT    /api/posts/:id  - 기존 게시글 수정
router.put('/:id', postController.update);

// DELETE /api/posts/:id  - 기존 게시글 삭제
router.delete('/:id', postController.remove);

module.exports = router;
```

---

#### 5-4. `src/controllers/post.controller.js` 작성하기
실제 게시글 데이터를 가공하고 인메모리 배열에 CRUD 연산을 적용하는 핵심 비즈니스 로직입니다. `src/controllers/post.controller.js` 파일을 열고 아래 완성 코드를 주의 깊게 타이핑하세요.

```javascript
// src/controllers/post.controller.js

// 1. 초기 인메모리 데이터 구성
let posts = [
  { id: 1, title: '첫 번째 게시글', content: '안녕하세요. 반갑습니다.', author: '이은성', views: 0, createdAt: new Date().toISOString() },
  { id: 2, title: 'Git 사용법에 대해', content: '브랜치 병합하는 방법입니다.', author: '홍길동', views: 0, createdAt: new Date().toISOString() },
];

let nextId = 3; // 다음 새 글 생성 시 할당될 고유 ID

// 2. 컨트롤러 액션 함수들 정의

// [Read] 전체 조회 및 작성자 검색 기능 (GET /api/posts)
exports.getAll = (req, res, next) => {
  try {
    const { author } = req.query; // 쿼리 파라미터에서 author 추출
    
    // 만약 작성자 필터링 쿼리가 있다면 필터링된 배열 반환, 없으면 전체 반환
    let resultPosts = posts;
    if (author) {
      resultPosts = posts.filter(
        (p) => p.author.toLowerCase() === author.trim().toLowerCase()
      );
    }

    res.status(200).json({
      count: resultPosts.length,
      data: resultPosts,
    });
  } catch (error) {
    next(error);
  }
};

// [Read] 단건 상세 조회 및 조회수 증가 (GET /api/posts/:id)
exports.getOne = (req, res, next) => {
  try {
    const id = parseInt(req.params.id); // URL 파라미터에서 id 정수 변환
    const post = posts.find((p) => p.id === id);

    // 게시글을 찾을 수 없는 경우 예외 처리
    if (!post) {
      return res.status(404).json({ message: `ID ${id}번에 해당하는 게시글이 없습니다.` });
    }

    // 게시글 조회 시 조회수(views) 1 증가
    post.views += 1;

    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

// [Create] 신규 게시글 추가 (POST /api/posts)
exports.create = (req, res, next) => {
  try {
    const { title, content, author } = req.body; // 요청 바디 데이터 추출

    // 간단한 필수값 유효성 검사 (Validation)
    if (!title || title.trim() === '') {
      return res.status(400).json({ message: 'title(제목)은 필수 입력 항목입니다.' });
    }
    if (!content || content.trim() === '') {
      return res.status(400).json({ message: 'content(내용)은 필수 입력 항목입니다.' });
    }
    if (!author || author.trim() === '') {
      return res.status(400).json({ message: 'author(작성자)는 필수 입력 항목입니다.' });
    }

    // 새 게시글 객체 조립
    const newPost = {
      id: nextId++,
      title: title.trim(),
      content: content.trim(),
      author: author.trim(),
      views: 0,
      createdAt: new Date().toISOString(),
    };

    posts.push(newPost);
    res.status(201).json(newPost); // 201 Created 응답 및 데이터 반환
  } catch (error) {
    next(error);
  }
};

// [Update] 게시글 수정 (PUT /api/posts/:id)
exports.update = (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const index = posts.findIndex((p) => p.id === id);

    if (index === -1) {
      return res.status(404).json({ message: `ID ${id}번에 해당하는 게시글이 없습니다.` });
    }

    const { title, content } = req.body;

    // 변경된 항목만 덮어쓰고, updatedAt 타임스탬프 기록
    posts[index] = {
      ...posts[index],
      title: title !== undefined ? title.trim() : posts[index].title,
      content: content !== undefined ? content.trim() : posts[index].content,
      updatedAt: new Date().toISOString(),
    };

    res.status(200).json(posts[index]);
  } catch (error) {
    next(error);
  }
};

// [Delete] 게시글 삭제 (DELETE /api/posts/:id)
exports.remove = (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const index = posts.findIndex((p) => p.id === id);

    if (index === -1) {
      return res.status(404).json({ message: `ID ${id}번에 해당하는 게시글이 없습니다.` });
    }

    // 배열에서 해당 요소 1개 제거
    posts.splice(index, 1);

    res.status(200).json({ message: `ID ${id}번 게시글이 성공적으로 삭제되었습니다.` });
  } catch (error) {
    next(error);
  }
};
```

---

### [Step 6] 로컬 서버 가동 및 API 수동 테스트 (Ch 03 복습)

1. **개발 서버 가동**
   코드를 모두 작성했다면 저장하고 터미널에서 개발용 스크립트를 작동시킵니다.
   ```bash
   npm run dev
   ```
   *정상 가동 시 `✅ [development] 서버가 http://localhost:3000 에서 정상 가동 중입니다.` 로그가 출력되어야 합니다.*

2. **API 검증하기 (cURL 명령어 실습)**
   터미널을 하나 더 열어 아래 커맨드를 순차적으로 복사하여 붙여넣고 API 결과를 점검하세요.

   - **전체 글 목록 조회 (GET)**
     ```bash
     curl http://localhost:3000/api/posts
     ```
   - **작성자 이름으로 필터링 조회 (GET)**
     ```bash
     curl http://localhost:3000/api/posts?author=이은성
     ```
   - **특정 글(1번 글) 단건 상세 조회 (GET)**
     ```bash
     # 이 명령을 보낸 뒤 다시 한 번 조회하면 views(조회수)가 늘어나 있는 것을 확인해 보세요.
     curl http://localhost:3000/api/posts/1
     ```
   - **새 글 등록 (POST - 성공 케이스)**
     ```bash
     curl -X POST -H "Content-Type: application/json" -d "{\"title\":\"Git 복습하기\",\"content\":\"Git PR 과정을 복습해 봅시다.\",\"author\":\"이은성\"}" http://localhost:3000/api/posts
     ```
   - **새 글 등록 예외 테스트 (POST - Validation 실패 케이스)**
     ```bash
     # 작성자(author)가 누락되어 400 Bad Request 에러 메시지가 잘 출력되는지 확인합니다.
     curl -X POST -H "Content-Type: application/json" -d "{\"title\":\"제목만 입력함\",\"content\":\"내용도 채움\"}" http://localhost:3000/api/posts
     ```
   - **게시글 내용 수정 (PUT)**
     ```bash
     curl -X PUT -H "Content-Type: application/json" -d "{\"title\":\"[수정] Git 완벽 복습\",\"content\":\"오늘 배운 내용을 확실히 기억합시다.\"}" http://localhost:3000/api/posts/1
     ```
   - **게시글 삭제 (DELETE)**
     ```bash
     curl -X DELETE http://localhost:3000/api/posts/2
     ```
     *삭제 완료 후 다시 전체 리스트를 요청하여 2번 글이 정말 사라졌는지 확인해 보세요.*

---

### [Step 7] 작업 완료 커밋 및 GitHub PR 병합 (Ch 02 & Ch 02-5 복습)

로컬에서의 개발과 검증이 모두 끝났으니, 작업을 원격 저장소에 공유하고 PR을 생성하여 병합해 보겠습니다.

1. **현재 개발 브랜치에 변경 코드 저장하기**
   `git status`로 변경된 파일의 상태를 살핀 뒤, 작성한 코드 파일들을 스테이징 영역에 올리고 커밋합니다.
   ```bash
   git status
   git add src/
   git commit -m "feat: implement in-memory post board API with custom logger"
   ```

2. **개발용 브랜치를 GitHub에 업로드**
   ```bash
   git push origin feature/board-api
   ```

3. **GitHub Pull Request 생성 및 병합**
   - 본인의 GitHub 저장소 페이지에 들어갑니다.
   - 상단에 나타나는 `Compare & pull request` 버튼을 누르거나 `Pull requests` 탭으로 가서 `New pull request`를 클릭합니다.
   - Base 브랜치는 `main`, Compare 브랜치는 `feature/board-api`로 지정한 후 아래 항목을 기입하고 **`Create pull request`**를 클릭합니다.
     - **제목**: `feat: 게시판 CRUD API 구현`
     - **본문**: `Express 및 인메모리 배열 기반 게시판 API 기능 개발 완료. 404 및 500 예외 미들웨어 구성 및 로거 부착.`
   - 생성된 PR의 파일 변경 사항(Files changed)을 직접 눈으로 검토해 보세요.
   - 문제가 없다면 **`Merge pull request`** -> **`Confirm merge`** 단추를 눌러 메인 브랜치에 기능을 안전하게 통합합니다.

4. **로컬 최신화**
   원격지에서 PR 병합이 끝났으니 로컬 main 브랜치로 돌아와 원격지의 수정 내역을 당겨옵니다.
   ```bash
   # 로컬에서 main 브랜치로 전환
   git switch main
   
   # 원격 저장소의 최신 병합 결과 가져오기
   git pull origin main
   
   # 작업 완료한 로컬 기능 브랜치 깔끔하게 삭제
   git branch -d feature/board-api
   ```

🎉 **축하합니다! Node.js 기본기 설정부터 Git 협업 방식, RESTful API 구현까지의 중요 고개를 모두 복습했습니다.**
**이제 다음 챕터(Chapter 04)로 넘어가 실제 관계형 데이터베이스(MySQL)와 Prisma ORM을 연동할 준비가 끝났습니다!**
