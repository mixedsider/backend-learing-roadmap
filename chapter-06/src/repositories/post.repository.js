let posts = [
  {
    id: 1,
    title: '계층형 아키텍처 연습',
    content: 'Controller, Service, Repository의 역할을 분리합니다.',
    createdAt: new Date().toISOString(),
  },
];

let nextId = 2;

exports.findAll = () => posts;

exports.findById = (id) => posts.find((post) => post.id === id);

exports.create = ({ title, content }) => {
  const post = {
    id: nextId++,
    title,
    content,
    createdAt: new Date().toISOString(),
  };

  posts.push(post);
  return post;
};

exports.update = (id, data) => {
  const post = exports.findById(id);
  if (!post) return null;

  Object.assign(post, data, { updatedAt: new Date().toISOString() });
  return post;
};

exports.remove = (id) => {
  const index = posts.findIndex((post) => post.id === id);
  if (index === -1) return false;

  posts.splice(index, 1);
  return true;
};

