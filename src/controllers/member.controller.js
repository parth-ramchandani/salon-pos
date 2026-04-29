const { ApiError } = require("../utils/apiError");
const memberService = require("../services/member.service");
const { logAudit } = require("../utils/audit");

const listMembers = async (req, res) => {
  const data = await memberService.listMembers();
  res.json({ success: true, data });
};

const createMember = async (req, res) => {
  const data = await memberService.createMember(req.body);
  await logAudit(req, "CREATE", "MEMBER", data.id, { fullName: data.fullName, phone: data.phone });
  res.status(201).json({ success: true, data });
};

const getMember = async (req, res) => {
  const data = await memberService.getMemberById(req.params.id);
  if (!data) throw new ApiError(404, "Member not found");
  res.json({ success: true, data });
};

const updateMember = async (req, res) => {
  const data = await memberService.updateMember(req.params.id, req.body);
  await logAudit(req, "UPDATE", "MEMBER", data.id, req.body);
  res.json({ success: true, data });
};

const deleteMember = async (req, res) => {
  await memberService.deleteMember(req.params.id);
  await logAudit(req, "DELETE", "MEMBER", req.params.id);
  res.json({ success: true, message: "Member deleted" });
};

module.exports = { listMembers, createMember, getMember, updateMember, deleteMember };
