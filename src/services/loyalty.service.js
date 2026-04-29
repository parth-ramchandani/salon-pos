const { prisma } = require("../config/prisma");
const { ApiError } = require("../utils/apiError");

const getLoyaltyRules = () => prisma.loyaltyRule.findMany({ orderBy: { createdAt: "asc" } });

const upsertLoyaltyRule = (sourceType, payload) =>
    prisma.loyaltyRule.upsert({
        where: { sourceType },
        update: payload,
        create: { sourceType, ...payload },
    });

async function ensureConfig() {
    const current = await prisma.loyaltyConfig.findUnique({ where: { id: "default" } });
    if (current) return current;
    return prisma.loyaltyConfig.create({ data: { id: "default" } });
}

const upsertLoyaltyConfig = (payload) =>
    prisma.loyaltyConfig.upsert({
        where: { id: "default" },
        update: payload,
        create: { id: "default", ...payload },
    });

async function getRule(sourceType) {
    const rule = await prisma.loyaltyRule.findUnique({ where: { sourceType } });
    if (!rule) throw new ApiError(400, `Loyalty rule missing for ${sourceType}`);
    return rule;
}

async function earnPoints({ memberId, sourceType, billAmount = 0, notes }) {
    const member = await prisma.member.findUnique({ where: { id: memberId } });
    if (!member) throw new ApiError(404, "Member not found");

    const rule = await getRule(sourceType);
    const points = sourceType === "REFERRAL" ? rule.referralBonusPoints : Math.floor((billAmount / rule.amountBase) * rule.pointsPerAmount);

    if (points <= 0) throw new ApiError(400, "Computed points must be greater than zero");

    return prisma.$transaction(async (tx) => {
        await tx.member.update({
            where: { id: memberId },
            data: { loyaltyPoints: { increment: points } },
        });

        return tx.loyaltyTransaction.create({
            data: {
                memberId,
                transactionType: "EARN",
                sourceType,
                billAmount,
                points,
                notes,
            },
        });
    });
}

async function redeemPoints({ memberId, points, notes }) {
    const [member, config] = await Promise.all([prisma.member.findUnique({ where: { id: memberId } }), ensureConfig()]);

    if (!member) throw new ApiError(404, "Member not found");
    if (member.loyaltyPoints < points) throw new ApiError(400, "Insufficient loyalty points");
    if (points < config.minPointsToRedeem) {
        throw new ApiError(400, `Minimum ${config.minPointsToRedeem} points required`);
    }

    const currencyValue = (points / config.pointsConversionBase) * config.pointsToCurrencyValue;
    if (currencyValue > config.maxRedeemCurrencyPerVisit) {
        throw new ApiError(400, `Max redeem value per visit is ${config.maxRedeemCurrencyPerVisit}`);
    }

    return prisma.$transaction(async (tx) => {
        await tx.member.update({
            where: { id: memberId },
            data: { loyaltyPoints: { decrement: points } },
        });

        return tx.loyaltyTransaction.create({
            data: {
                memberId,
                transactionType: "REDEEM",
                sourceType: "REDEMPTION",
                points,
                currencyValue,
                notes,
            },
        });
    });
}

module.exports = {
    getLoyaltyRules,
    upsertLoyaltyRule,
    ensureConfig,
    upsertLoyaltyConfig,
    earnPoints,
    redeemPoints,
};
