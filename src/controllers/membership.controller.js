const membershipService = require("../services/membership.service");
const { logAudit } = require("../utils/audit");

const listMembershipPlans = async (req, res) => {
  const data = await membershipService.listMembershipPlans();
  res.json({ success: true, data });
};

const createMembershipPlan = async (req, res) => {
  const data = await membershipService.createMembershipPlan(req.body);
  await logAudit(req, "CREATE", "MEMBERSHIP_PLAN", data.id, { name: data.name, isActive: data.isActive });
  res.status(201).json({ success: true, data });
};

const updateMembershipPlan = async (req, res) => {
  const data = await membershipService.updateMembershipPlan(req.params.id, req.body);
  await logAudit(req, "UPDATE", "MEMBERSHIP_PLAN", data.id, req.body);
  res.json({ success: true, data });
};

const deleteMembershipPlan = async (req, res) => {
  await membershipService.removeMembershipPlan(req.params.id);
  await logAudit(req, "DELETE", "MEMBERSHIP_PLAN", req.params.id);
  res.json({ success: true, message: "Membership plan deleted" });
};

module.exports = {
  listMembershipPlans,
  createMembershipPlan,
  updateMembershipPlan,
  deleteMembershipPlan,
};
