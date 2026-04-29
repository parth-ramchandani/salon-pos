const { prisma } = require("../config/prisma");

const getLeaderboard = (limit) =>
  prisma.member.findMany({
    orderBy: { loyaltyPoints: "desc" },
    take: limit,
    select: {
      id: true,
      fullName: true,
      loyaltyPoints: true,
      membershipPlan: { select: { name: true } },
    },
  });

module.exports = { getLeaderboard };
