const express = require('express');
const registerRoutes = require('./routes/auth.routes.js');
const problemRoutes = require('./routes/problem.routes.js');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:4000',
    credentials: true,
  })
);

// resgiterRoutes
app.use('/v1/auth/user', registerRoutes);
app.use('/v1/problems', problemRoutes);

module.exports = app;
