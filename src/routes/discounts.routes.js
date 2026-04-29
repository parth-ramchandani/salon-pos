const express = require("express");
const { validateBody } = require("../middlewares/validate");
const { asyncHandler } = require("../utils/asyncHandler");
const { requireRole } = require("../middlewares/requireRole");
const { discountSchema } = require("../modules/schemas");
const discountController = require("../controllers/discount.controller");

const router = express.Router();

router.get("/", asyncHandler(discountController.listDiscounts));
router.post("/", requireRole(["ADMIN"]), validateBody(discountSchema), asyncHandler(discountController.createDiscount));
router.patch(
  "/:id",
  requireRole(["ADMIN"]),
  validateBody(discountSchema.partial()),
  asyncHandler(discountController.updateDiscount)
);
router.delete("/:id", requireRole(["ADMIN"]), asyncHandler(discountController.deleteDiscount));

module.exports = { discountsRouter: router };
