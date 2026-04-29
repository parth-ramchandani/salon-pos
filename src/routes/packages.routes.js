const express = require("express");
const { validateBody } = require("../middlewares/validate");
const { asyncHandler } = require("../utils/asyncHandler");
const { requireRole } = require("../middlewares/requireRole");
const { packageSchema } = require("../modules/schemas");
const packageController = require("../controllers/package.controller");

const router = express.Router();

router.get("/", asyncHandler(packageController.listPackages));
router.post("/", requireRole(["ADMIN"]), validateBody(packageSchema), asyncHandler(packageController.createPackage));
router.patch(
  "/:id",
  requireRole(["ADMIN"]),
  validateBody(packageSchema.partial()),
  asyncHandler(packageController.updatePackage)
);
router.delete("/:id", requireRole(["ADMIN"]), asyncHandler(packageController.deletePackage));

module.exports = { packagesRouter: router };
