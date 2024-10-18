const express = require("express");
const userRouter = express.Router();
const User = require("../models/User");
const { check, validationResult } = require("express-validator");

// GET all users
userRouter.get("/", async (request, response) => {
  const users = await User.findAll({});
  response.json(users);
});

// GET one user
userRouter.get("/:id", async (request, response) => {
    const number = request.params.id
    const user = await User.findByPk(number)
    response.json(user)
})

// GET all shows watched by a user (user id in req.params)
userRouter.get("/", async (request, response) => {})

//POST - Use server-side validation in your routes to ensure that:
//The username must be an email address hint
userRouter.post("/", async (request, response) => {})

// PUT associate a user with a show they have watched
userRouter.put("/", async (request, response) => {})

//DELETE a user
userRouter.delete("/:id", async (request, response) => {
    const deletedUser = await User.destroy({where: {id: request.params.id}})
    const users = await User.findAll()
    response.json(users)
})

module.exports = userRouter;