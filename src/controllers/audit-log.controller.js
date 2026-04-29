const { listAuditLogs } = require("../services/audit-log.service");

const getAuditLogs = async (req, res) => {
  const limit = Number(req.query.limit || 50);
  const data = await listAuditLogs({
    limit,
    actorRole: req.query.actorRole,
    entityType: req.query.entityType,
  });
  res.json({ success: true, data });
};

module.exports = { getAuditLogs };
