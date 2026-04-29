const { prisma } = require("../config/prisma");

const listMembers = () =>
  prisma.member.findMany({
    include: { membershipPlan: true },
    orderBy: { createdAt: "desc" },
  });

const createMember = (payload) => prisma.member.create({ data: payload });

const getMemberById = (id) =>
  prisma.member.findUnique({
    where: { id },
    include: {
      membershipPlan: true,
      transactions: { orderBy: { createdAt: "desc" }, take: 20 },
    },
  });

const updateMember = (id, payload) =>
  prisma.member.update({
    where: { id },
    data: payload,
  });

const deleteMember = (id) => prisma.member.delete({ where: { id } });

module.exports = { listMembers, createMember, getMemberById, updateMember, deleteMember };
