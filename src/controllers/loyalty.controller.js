const { ApiError } = require("../utils/apiError");
const loyaltyService = require("../services/loyalty.service");
const { logAudit } = require("../utils/audit");

const getLoyaltyRules = async (req, res) => {
  const data = await loyaltyService.getLoyaltyRules();
  res.json({ success: true, data });
};

const updateLoyaltyRule = async (req, res) => {
  const sourceType = req.params.sourceType.toUpperCase();
  const allowed = ["SERVICE", "PRODUCT", "REFERRAL", "MANUAL"];
  if (!allowed.includes(sourceType)) {
    throw new ApiError(400, `Invalid source type. Allowed: ${allowed.join(", ")}`);
  }

  const data = await loyaltyService.upsertLoyaltyRule(sourceType, req.body);
  await logAudit(req, "UPDATE", "LOYALTY_RULE", data.id, { sourceType, ...req.body });
  res.json({ success: true, data });
};

const getLoyaltyConfig = async (req, res) => {
  const data = await loyaltyService.ensureConfig();
  res.json({ success: true, data });
};

const updateLoyaltyConfig = async (req, res) => {
  const data = await loyaltyService.upsertLoyaltyConfig(req.body);
  await logAudit(req, "UPDATE", "LOYALTY_CONFIG", data.id, req.body);
  res.json({ success: true, data });
};

const earnPoints = async (req, res) => {
  const data = await loyaltyService.earnPoints(req.body);
  await logAudit(req, "CREATE", "LOYALTY_TRANSACTION", data.id, {
    transactionType: data.transactionType,
    sourceType: data.sourceType,
    memberId: data.memberId,
    points: data.points,
  });
  res.status(201).json({ success: true, data });
};

const redeemPoints = async (req, res) => {
  const data = await loyaltyService.redeemPoints(req.body);
  await logAudit(req, "CREATE", "LOYALTY_TRANSACTION", data.id, {
    transactionType: data.transactionType,
    sourceType: data.sourceType,
    memberId: data.memberId,
    points: data.points,
    currencyValue: data.currencyValue,
  });
  res.status(201).json({ success: true, data });
};

module.exports = {
  getLoyaltyRules,
  updateLoyaltyRule,
  getLoyaltyConfig,
  updateLoyaltyConfig,
  earnPoints,
  redeemPoints,
};
