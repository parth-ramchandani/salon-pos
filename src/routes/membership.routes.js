const express = require("express");
const { validateBody } = require("../middlewares/validate");
const { asyncHandler } = require("../utils/asyncHandler");
const { requireRole } = require("../middlewares/requireRole");
const { membershipSchema } = require("../modules/schemas");
const membershipController = require("../controllers/membership.controller");

const router = express.Router();

router.get("/", asyncHandler(membershipController.listMembershipPlans));
router.post(
  "/",
  requireRole(["ADMIN"]),
  validateBody(membershipSchema),
  asyncHandler(membershipController.createMembershipPlan)
);
router.patch(
  "/:id",
  requireRole(["ADMIN"]),
  validateBody(membershipSchema.partial()),
  asyncHandler(membershipController.updateMembershipPlan)
);
router.delete("/:id", requireRole(["ADMIN"]), asyncHandler(membershipController.deleteMembershipPlan));

module.exports = { membershipRouter: router };
