const { z } = require("zod");

const memberSchema = z.object({
  fullName: z.string().min(2),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  email: z.string().email().optional(),
  membershipPlanId: z.string().optional().nullable(),
});

const discountSchema = z.object({
  name: z.string().min(2),
  type: z.enum(["PERCENTAGE", "FLAT"]),
  value: z.number().positive(),
  appliesTo: z.string().min(2),
  isActive: z.boolean().optional(),
  validFrom: z.string().datetime().optional().nullable(),
  validTo: z.string().datetime().optional().nullable(),
});

const packageSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional().nullable(),
  price: z.number().positive(),
  originalPrice: z.number().positive().optional().nullable(),
  services: z.array(z.string().min(1)).min(1),
  isActive: z.boolean().optional(),
});

const membershipSchema = z.object({
  name: z.string().min(2),
  price: z.number().positive(),
  discountPercent: z.number().min(0).max(100).optional(),
  benefits: z.array(z.string().min(1)).optional(),
  isActive: z.boolean().optional(),
});

const earnSchema = z.object({
  memberId: z.string(),
  sourceType: z.enum(["SERVICE", "PRODUCT", "REFERRAL", "MANUAL"]),
  billAmount: z.number().nonnegative().optional(),
  notes: z.string().optional(),
});

const redeemSchema = z.object({
  memberId: z.string(),
  points: z.number().int().positive(),
  notes: z.string().optional(),
});

const loyaltyConfigSchema = z.object({
  minPointsToRedeem: z.number().int().positive(),
  pointsToCurrencyValue: z.number().positive(),
  pointsConversionBase: z.number().int().positive(),
  maxRedeemCurrencyPerVisit: z.number().positive(),
});

const loyaltyRuleSchema = z.object({
  pointsPerAmount: z.number().nonnegative().optional(),
  amountBase: z.number().positive().optional(),
  referralBonusPoints: z.number().int().nonnegative().optional(),
});

module.exports = {
  memberSchema,
  discountSchema,
  packageSchema,
  membershipSchema,
  earnSchema,
  redeemSchema,
  loyaltyConfigSchema,
  loyaltyRuleSchema,
};
