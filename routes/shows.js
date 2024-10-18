const express = require("express");
const showRouter = express.Router();
const Show = require("../models/Show");
const {check, validationResult } = require("express-validator")

module.exports = showRouter