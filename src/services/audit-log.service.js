const { prisma } = require("../config/prisma");

const createAuditLog = ({
  actorId,
  actorName,
  actorRole,
  action,
  entityType,
  entityId,
  details,
}) =>
  prisma.auditLog.create({
    data: {
      actorId,
      actorName,
      actorRole,
      action,
      entityType,
      entityId,
      details: details ? JSON.stringify(details) : null,
    },
  });

const listAuditLogs = ({ limit = 50, actorRole, entityType }) => {
  const where = {};
  if (actorRole) where.actorRole = actorRole;
  if (entityType) where.entityType = entityType;

  return prisma.auditLog.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: limit,
  });
};

module.exports = { createAuditLog, listAuditLogs };
