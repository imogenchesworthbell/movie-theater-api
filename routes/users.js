const express = require("express");
const userRouter = express.Router();
const { User, Show } = require("../models");
const { check, validationResult } = require("express-validator");

// GET all users
userRouter.get("/", async (request, response) => {
  const users = await User.findAll({});
  response.json(users);
});

// GET one user
userRouter.get("/:id", async (request, response) => {
  const number = request.params.id;
  const user = await User.findByPk(number);
  response.json(user);
});

// GET all shows watched by a user (user id in req.params)
userRouter.get("/:id/shows", async (request, response) => {
  const userId = request.params.id;
  if (!(await User.findByPk(userId))) {
    response.json({ error: "User not found" });
  }
  const user = await User.findByPk(userId, {
    include: {
      model: Show,
      through: { attributes: [] },
    },
  });
  response.json(user.shows);
});

//PUT - update 1 user
userRouter.put("/:id", async (request, response) => {
  const updatedUsers = await User.update(request.body, {
    where: { id: request.params.id },
  });
  let users = await User.findAll();
  response.json(users);
});

// PUT associate a user with a show they have watched
userRouter.put("/:userId/shows/:showId", async (request, response) => {
  const userId = request.params.userId;
  const showId = request.params.showId;
  const user = await User.findByPk(userId);
  const show = await Show.findByPk(showId);
  if (!user) {
    response.json({ message: "User not found" });
  } else if (!show) {
    response.json({ message: "Show not found" });
  } else {
    await user.addShow(show);
    const updatedUser = await User.findByPk(userId, { include: Show });
    response.json(updatedUser);
  }
});

//DELETE a user
userRouter.delete("/:id", async (request, response) => {
  const deletedUser = await User.destroy({ where: { id: request.params.id } });
  const users = await User.findAll();
  response.json(users);
});

//POST - Use server-side validation in your routes to ensure that:
//The username must be an email address hint
userRouter.post("/", async (request, response) => {});




module.exports = userRouter;
