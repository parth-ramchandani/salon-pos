const express = require("express");
const { asyncHandler } = require("../utils/asyncHandler");
const { requireRole } = require("../middlewares/requireRole");
const auditLogController = require("../controllers/audit-log.controller");

const router = express.Router();

router.get("/", requireRole(["ADMIN"]), asyncHandler(auditLogController.getAuditLogs));

module.exports = { auditLogsRouter: router };
