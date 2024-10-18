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
  const updatedShows = await Show.update(request.body, {
    where: { id: request.params.id },
  });
  const shows = await Show.findAll();
  response.json(shows);
});

// PUT - update the available property of a show

showRouter.put("/:id/available", async (request, response) => {
  const show = await Show.findByPk(request.params.id);
  if (show) {
    show.available = request.body.available;
    await show.save();
    response.json({ message: "Show availability updated", show });
  } else {
    response.json({ message: "Show not found" });
  }
});

// DELETE a show
showRouter.delete("/:id", async (request, response) => {
  const deletedShow = await Show.destroy({ where: { id: request.params.id } });
  const shows = await Show.findAll();
  response.json(shows);
});

// GET shows of a particular genre (genre in req.query)
//Method from Plenary ...
showRouter.get("/:genre", async (request, response) => {
    const specificGenre = await Show.findAll({
      where: {
        genre: request.params.genre
      }
    })
    response.json(specificGenre) 
});

//POST - Use server-side validation in your routes to ensure that:
//The title of a show must be a maximum of 25 characters
showRouter.post(
  "/",
  [
    check("title")
      .not()
      .isEmpty()
      .withMessage("Title is required.")
      .isLength({ max: 25 })
      .withMessage("Your title is too long."),
    check("genre").not().isEmpty().trim().withMessage("A genre is required."),
    check("available")
      .not()
      .isEmpty()
      .withMessage("Availability is required.")
      .isBoolean()
      .withMessage("Availability must be a boolean."),
  ],
  async (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      response.json({ error: errors.array() });
    } else {
      const newShow = await Show.create(request.body);
      const showAdded = await Show.findAll({});
      response.json(showAdded);
    }
  }
);

module.exports = showRouter;
