const express = require("express");
const userRouter = express.Router();
const User = require("../models/User");
const {check, validationResult } = require("express-validator")

module.exports = userRouter