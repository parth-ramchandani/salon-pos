const express = require("express");
const { validateBody } = require("../middlewares/validate");
const { asyncHandler } = require("../utils/asyncHandler");
const { requireRole } = require("../middlewares/requireRole");
const { memberSchema } = require("../modules/schemas");
const memberController = require("../controllers/member.controller");

const router = express.Router();

router.get("/", asyncHandler(memberController.listMembers));
router.post(
  "/",
  requireRole(["ADMIN", "STAFF"]),
  validateBody(memberSchema),
  asyncHandler(memberController.createMember)
);
router.get("/:id", asyncHandler(memberController.getMember));
router.patch(
  "/:id",
  requireRole(["ADMIN", "STAFF"]),
  validateBody(memberSchema.partial()),
  asyncHandler(memberController.updateMember)
);
router.delete("/:id", requireRole(["ADMIN"]), asyncHandler(memberController.deleteMember));

module.exports = { membersRouter: router };
