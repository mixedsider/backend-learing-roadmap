require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const postRouter = require('./routes/post.route');
const errorHandler = require('./middlewares/errorHandler');
const { NotFoundError } = require('./errors/AppError');
const logger = require('./utils/logger');

const app = express();

app.use(express.json());
app.use(morgan('dev', {
  stream: {
    write: (message) => logger.info(message.trim()),
  },
}));

app.use('/api/posts', postRouter);

app.use((req, res, next) => {
  next(new NotFoundError('존재하지 않는 경로입니다.'));
});

app.use(errorHandler);

module.exports = app;

