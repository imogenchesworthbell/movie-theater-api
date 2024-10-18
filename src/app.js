const express = require("express");
const app = express();
const showRouter = require("../routes/shows")
const userRouter = require("../routes/users")

app.use(express.json());
app.use(express.urlencoded());
app.use("/movies", restaurantRouter);
app.use("/users", restaurantRouter);

module.exports = app;