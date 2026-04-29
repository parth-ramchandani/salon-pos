const { getLeaderboard } = require("../services/leaderboard.service");

const listLeaderboard = async (req, res) => {
  const limit = Number(req.query.limit || 10);
  const data = await getLeaderboard(limit);
  res.json({ success: true, data });
};

module.exports = { listLeaderboard };
