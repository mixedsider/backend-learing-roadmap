// Chapter 03.5 - post.controller.js (실습 및 완성본)
// 아래 코드는 인메모리(메모리 배열) 방식을 사용하여 게시판 CRUD 기능을 실제로 수행하는 컨트롤러 파일입니다.

// 1. 임시 데이터 역할을 수행할 posts 배열을 정의합니다. (서버 재시작 시 초기화됨)
let posts = [
  { id: 1, title: '첫 번째 게시글', content: '안녕하세요. 반갑습니다.', author: '이은성', views: 0, createdAt: new Date().toISOString() },
  { id: 2, title: 'Git 사용법에 대해', content: '브랜치 병합하는 방법입니다.', author: '홍길동', views: 0, createdAt: new Date().toISOString() },
];

// 2. 새 글 추가 시 고유 식별값(ID)을 매칭하기 위한 증감용 카운터 변수입니다.
let nextId = 3;

// ── 3. 컨트롤러 액션 함수 구현 ──────────────────────────────────

/**
 * 3-1. 전체 조회 및 작성자 검색 (GET /api/posts)
 * - 쿼리 파라미터(req.query)를 활용해 특정 작성자의 글만 필터링할 수 있습니다.
 */
exports.getAll = (req, res, next) => {
  try {
    const { author } = req.query; // URL의 '?author=이름'에서 'author' 값을 추출합니다.
    let resultPosts = posts;

    // 만약 작성자 필터링 조건이 넘어왔다면, 해당 조건에 맞는 글들만 추려냅니다.
    if (author) {
      resultPosts = posts.filter(
        (p) => p.author.toLowerCase() === author.trim().toLowerCase()
      );
    }

    // 200 OK 상태코드와 함께 조회수 필터링 결과를 JSON 형태로 반환합니다.
    res.status(200).json({
      count: resultPosts.length, // 데이터 건수
      data: resultPosts,         // 실제 데이터 목록
    });
  } catch (error) {
    next(error); // 에러 발생 시 글로벌 에러 핸들러로 전달
  }
};

/**
 * 3-2. 단건 상세 조회 및 조회수 증가 (GET /api/posts/:id)
 * - URL 경로 파라미터(req.params)에서 ID를 추출하여 단건 데이터를 조회하고 views를 1 증가시킵니다.
 */
exports.getOne = (req, res, next) => {
  try {
    const id = parseInt(req.params.id); // URL 파라미터인 문자열 id를 숫자로 변환합니다.
    
    // posts 배열에서 id 값이 일치하는 게시글 객체를 탐색합니다.
    const post = posts.find((p) => p.id === id);

    // 해당 게시글이 존재하지 않는 경우 404 Not Found 코드를 반환합니다.
    if (!post) {
      return res.status(404).json({ message: `ID ${id}번에 해당하는 게시글이 존재하지 않습니다.` });
    }

    // 조회 성공 시 해당 게시글의 조회수(views)를 1 증가시킵니다.
    post.views += 1;

    // 최종 변경된 게시글 데이터를 반환합니다.
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

/**
 * 3-3. 신규 게시글 추가 (POST /api/posts)
 * - 요청 바디(req.body) 데이터를 받아서 입력값 검사(Validation)를 한 뒤 배열에 추가합니다.
 */
exports.create = (req, res, next) => {
  try {
    const { title, content, author } = req.body; // 구조분해할당으로 필요한 바디 데이터를 가져옵니다.

    // 필수 항목들이 누락되었거나 빈 문자열(공백 제외)인지 확인하여 예외 처리(400 Bad Request)합니다.
    if (!title || title.trim() === '') {
      return res.status(400).json({ message: 'title(제목)은 필수 입력 항목입니다.' });
    }
    if (!content || content.trim() === '') {
      return res.status(400).json({ message: 'content(내용)은 필수 입력 항목입니다.' });
    }
    if (!author || author.trim() === '') {
      return res.status(400).json({ message: 'author(작성자)는 필수 입력 항목입니다.' });
    }

    // 새로운 게시글 데이터 생성 (id 부여, views 0 설정, 생성 시간 기록)
    const newPost = {
      id: nextId++,
      title: title.trim(),
      content: content.trim(),
      author: author.trim(),
      views: 0,
      createdAt: new Date().toISOString(),
    };

    posts.push(newPost); // 인메모리 배열에 신규 데이터를 삽입합니다.

    // 201 Created 상태코드와 함께 생성된 데이터를 최종 반환합니다.
    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};

/**
 * 3-4. 게시글 내용 수정 (PUT /api/posts/:id)
 * - ID로 게시글의 존재 여부를 확인하고, 넘어온 수정 데이터(제목, 내용)만 갱신합니다.
 */
exports.update = (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    
    // posts 배열에서 해당 id를 가진 요소의 인덱스(순서)를 찾습니다.
    const index = posts.findIndex((p) => p.id === id);

    // 해당 게시글이 배열에 없으면(index가 -1인 경우) 404 에러를 반환합니다.
    if (index === -1) {
      return res.status(404).json({ message: `ID ${id}번에 해당하는 게시글이 존재하지 않습니다.` });
    }

    const { title, content } = req.body;

    // 기존 데이터 구조를 보존하면서(Spread Operator 사용), 넘겨받은 값만 업데이트하고 수정 시간을 기록합니다.
    posts[index] = {
      ...posts[index],
      title: title !== undefined ? title.trim() : posts[index].title,
      content: content !== undefined ? content.trim() : posts[index].content,
      updatedAt: new Date().toISOString(), // 수정일 추가
    };

    res.status(200).json(posts[index]); // 수정 완료된 데이터를 반환합니다.
  } catch (error) {
    next(error);
  }
};

/**
 * 3-5. 게시글 삭제 (DELETE /api/posts/:id)
 * - ID로 게시글의 존재 여부를 판단한 뒤 배열에서 삭제(splice) 처리합니다.
 */
exports.remove = (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const index = posts.findIndex((p) => p.id === id);

    if (index === -1) {
      return res.status(404).json({ message: `ID ${id}번에 해당하는 게시글이 존재하지 않습니다.` });
    }

    // splice(인덱스, 개수) 함수를 사용하여 배열 내 해당 요소를 제거합니다.
    posts.splice(index, 1);

    // 삭제 성공 메시지를 JSON 응답으로 반환합니다.
    res.status(200).json({ message: `ID ${id}번 게시글이 정상적으로 삭제되었습니다.` });
  } catch (error) {
    next(error);
  }
};
