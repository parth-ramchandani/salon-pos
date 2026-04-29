const discountService = require("../services/discount.service");
const { logAudit } = require("../utils/audit");

const listDiscounts = async (req, res) => {
  let activeFilter;
  if (req.query.active === "true") activeFilter = true;
  else if (req.query.active === "false") activeFilter = false;

  const data = await discountService.listDiscounts(activeFilter);
  res.json({ success: true, data });
};

const createDiscount = async (req, res) => {
  const data = await discountService.createDiscount(req.body);
  await logAudit(req, "CREATE", "DISCOUNT", data.id, { name: data.name, isActive: data.isActive });
  res.status(201).json({ success: true, data });
};

const updateDiscount = async (req, res) => {
  const data = await discountService.updateDiscount(req.params.id, req.body);
  await logAudit(req, "UPDATE", "DISCOUNT", data.id, req.body);
  res.json({ success: true, data });
};

const deleteDiscount = async (req, res) => {
  await discountService.removeDiscount(req.params.id);
  await logAudit(req, "DELETE", "DISCOUNT", req.params.id);
  res.json({ success: true, message: "Discount deleted" });
};

module.exports = { listDiscounts, createDiscount, updateDiscount, deleteDiscount };
