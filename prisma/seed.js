const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.loyaltyConfig.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      minPointsToRedeem: 100,
      pointsConversionBase: 100,
      pointsToCurrencyValue: 10,
      maxRedeemCurrencyPerVisit: 500,
    },
  });

  const rules = [
    { sourceType: "SERVICE", pointsPerAmount: 1, amountBase: 100, referralBonusPoints: 0 },
    { sourceType: "PRODUCT", pointsPerAmount: 2, amountBase: 100, referralBonusPoints: 0 },
    { sourceType: "REFERRAL", pointsPerAmount: 0, amountBase: 100, referralBonusPoints: 200 },
    { sourceType: "MANUAL", pointsPerAmount: 0, amountBase: 100, referralBonusPoints: 0 },
  ];

  for (const rule of rules) {
    await prisma.loyaltyRule.upsert({
      where: { sourceType: rule.sourceType },
      update: rule,
      create: rule,
    });
  }
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
