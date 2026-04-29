const express = require("express");
const { validateBody } = require("../middlewares/validate");
const { asyncHandler } = require("../utils/asyncHandler");
const { requireRole } = require("../middlewares/requireRole");
const { earnSchema, redeemSchema, loyaltyConfigSchema, loyaltyRuleSchema } = require("../modules/schemas");
const loyaltyController = require("../controllers/loyalty.controller");

const router = express.Router();

router.get("/rules", asyncHandler(loyaltyController.getLoyaltyRules));
router.put(
  "/rules/:sourceType",
  requireRole(["ADMIN"]),
  validateBody(loyaltyRuleSchema),
  asyncHandler(loyaltyController.updateLoyaltyRule)
);
router.get("/config", asyncHandler(loyaltyController.getLoyaltyConfig));
router.put(
  "/config",
  requireRole(["ADMIN"]),
  validateBody(loyaltyConfigSchema),
  asyncHandler(loyaltyController.updateLoyaltyConfig)
);
router.post(
  "/earn",
  requireRole(["ADMIN", "STAFF"]),
  validateBody(earnSchema),
  asyncHandler(loyaltyController.earnPoints)
);
router.post(
  "/redeem",
  requireRole(["ADMIN", "STAFF"]),
  validateBody(redeemSchema),
  asyncHandler(loyaltyController.redeemPoints)
);

module.exports = { loyaltyRouter: router };
