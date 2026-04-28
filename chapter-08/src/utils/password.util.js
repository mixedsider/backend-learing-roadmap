const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

exports.hash    = (password) => bcrypt.hash(password, SALT_ROUNDS);
exports.compare = (plain, hashed) => bcrypt.compare(plain, hashed);
