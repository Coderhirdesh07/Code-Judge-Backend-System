const express = require("express");
const registerRoutes = require("../src/routes/auth.routes");
const problemRoutes = require("../src/routes/problem.routes.js");
const app = express();
const cookie = require("cookie-parser");
const cors = require("cors");

app.use(express.json());
app.use(cookie());
app.use(
  cors({
    origin: "http://localhost:4000",
    credentials: true,
  })
);

// resgiterRoutes
app.use("/v1/auth/user", registerRoutes);
app.use("/v1/problems", problemRoutes);

module.exports = app;
