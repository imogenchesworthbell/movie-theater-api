const express = require("express");
const showRouter = express.Router();
const { Show, User } = require("../models");
const { check, validationResult } = require("express-validator");

// GET all shows
showRouter.get("/", async (request, response) => {
  const shows = await Show.findAll({});
  response.json(shows);
});

// GET one show
showRouter.get("/:id", async (request, response) => {
  const number = request.params.id;
  const show = await Show.findByPk(number);
  response.json(show);
});

// GET all users who watched a show
showRouter.get("/:id/users", async (request, response) => {
  const showId = request.params.id;
  if (!(await Show.findByPk(showId))) {
    response.json({ error: "Show not found" });
  }
  const show = await Show.findByPk(showId, {
    include: {
      model: User,
      through: { attributes: [] },
    },
  });
  response.json(show.users);
});

//PUT - update 1 show
showRouter.put("/:id", async (request, response) => {
    const updatedShows = await Show.update(request.body, {where: {id: request.params.id}});
    let shows = await Show.findAll()
    response.json(shows);
})

// // PUT - update the available property of a show
showRouter.put("/:id/available", async (request, response) => {
    const updatedShows = await Show.update(request.body, {where: {id: request.params.id}});
    let shows = await Show.findAll()
    response.json(shows);
})

// DELETE a show
showRouter.delete("/:id", async (request, response) => {
  const deletedShow = await Show.destroy({ where: { id: request.params.id } });
  const shows = await Show.findAll();
  response.json(shows);
});

// GET shows of a particular genre (genre in req.query)
showRouter.get("/", async (request, response) => {});

//POST - Use server-side validation in your routes to ensure that:
//The title of a show must be a maximum of 25 characters
showRouter.post("/", async (request, response) => {});
module.exports = showRouter;
