const { createAuditLog } = require("../services/audit-log.service");

async function logAudit(req, action, entityType, entityId, details) {
  await createAuditLog({
    actorId: req.user?.id || "system",
    actorName: req.user?.name || "System User",
    actorRole: req.user?.role || "ADMIN",
    action,
    entityType,
    entityId,
    details,
  });
}

module.exports = { logAudit };
