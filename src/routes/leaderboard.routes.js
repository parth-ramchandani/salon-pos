const express = require("express");
const { asyncHandler } = require("../utils/asyncHandler");
const leaderboardController = require("../controllers/leaderboard.controller");

const router = express.Router();

router.get("/", asyncHandler(leaderboardController.listLeaderboard));

module.exports = { leaderboardRouter: router };
