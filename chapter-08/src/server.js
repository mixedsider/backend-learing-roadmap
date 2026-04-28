require('dotenv').config();

const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Chapter 08 test API is running on http://localhost:${PORT}`);
});

