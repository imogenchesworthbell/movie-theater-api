const express = require("express");
const app = express();
const showRouter = require("../routes/shows")
const userRouter = require("../routes/users")

app.use(express.json());
app.use(express.urlencoded());
app.use("/shows", showRouter);
app.use("/users", userRouter);

module.exports = app;