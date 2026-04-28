const userRepository = require('../repositories/user.repository');

// GET /api/users
exports.getAll = async (req, res, next) => {
  try {
    const users = await userRepository.findAll();
    res.status(200).json({ count: users.length, data: users });
  } catch (err) {
    next(err);
  }
};

// GET /api/users/:id
exports.getOne = async (req, res, next) => {
  try {
    const user = await userRepository.findById(parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: '유저를 찾을 수 없습니다.' });
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// POST /api/users
exports.create = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'name, email, password는 필수 값입니다.' });
    }

    const exists = await userRepository.findByEmail(email);
    if (exists) return res.status(409).json({ message: '이미 사용 중인 이메일입니다.' });

    const user = await userRepository.create({ name, email, password });
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

// PUT /api/users/:id
exports.update = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const exists = await userRepository.findById(id);
    if (!exists) return res.status(404).json({ message: '유저를 찾을 수 없습니다.' });

    const updated = await userRepository.update(id, req.body);
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/users/:id
exports.remove = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const exists = await userRepository.findById(id);
    if (!exists) return res.status(404).json({ message: '유저를 찾을 수 없습니다.' });

    await userRepository.remove(id);
    res.status(200).json({ message: `ID ${id} 유저가 삭제되었습니다.` });
  } catch (err) {
    next(err);
  }
};
