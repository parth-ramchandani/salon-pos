const express = require("express");
const { membersRouter } = require("./members.routes");
const { discountsRouter } = require("./discounts.routes");
const { packagesRouter } = require("./packages.routes");
const { membershipRouter } = require("./membership.routes");
const { loyaltyRouter } = require("./loyalty.routes");
const { leaderboardRouter } = require("./leaderboard.routes");
const { auditLogsRouter } = require("./audit-logs.routes");

const apiRouter = express.Router();

apiRouter.get("/", (req, res) => res.json({ success: true, message: "Salon POS API" }));
apiRouter.use("/members", membersRouter);
apiRouter.use("/discounts", discountsRouter);
apiRouter.use("/packages", packagesRouter);
apiRouter.use("/membership-plans", membershipRouter);
apiRouter.use("/loyalty", loyaltyRouter);
apiRouter.use("/leaderboard", leaderboardRouter);
apiRouter.use("/audit-logs", auditLogsRouter);

module.exports = { apiRouter };
