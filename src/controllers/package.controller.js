const packageService = require("../services/package.service");
const { logAudit } = require("../utils/audit");

const listPackages = async (req, res) => {
  let activeFilter;
  if (req.query.active === "true") activeFilter = true;
  else if (req.query.active === "false") activeFilter = false;

  const data = await packageService.listPackages(activeFilter);
  res.json({ success: true, data });
};

const createPackage = async (req, res) => {
  const data = await packageService.createPackage(req.body);
  await logAudit(req, "CREATE", "PACKAGE", data.id, { name: data.name, isActive: data.isActive });
  res.status(201).json({ success: true, data });
};

const updatePackage = async (req, res) => {
  const data = await packageService.updatePackage(req.params.id, req.body);
  await logAudit(req, "UPDATE", "PACKAGE", data.id, req.body);
  res.json({ success: true, data });
};

const deletePackage = async (req, res) => {
  await packageService.removePackage(req.params.id);
  await logAudit(req, "DELETE", "PACKAGE", req.params.id);
  res.json({ success: true, message: "Package deleted" });
};

module.exports = { listPackages, createPackage, updatePackage, deletePackage };
