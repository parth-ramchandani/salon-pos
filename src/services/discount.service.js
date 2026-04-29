const { prisma } = require("../config/prisma");

const listDiscounts = (activeFilter) => {
  const where =
    typeof activeFilter === "boolean"
      ? { isActive: activeFilter }
      : {};
    return prisma.discount.findMany({ where, orderBy: { createdAt: "desc" } });
};

const createDiscount = (payload) =>
    prisma.discount.create({
        data: {
            ...payload,
            validFrom: payload.validFrom ? new Date(payload.validFrom) : null,
            validTo: payload.validTo ? new Date(payload.validTo) : null,
        },
    });

const updateDiscount = (id, payload) => {
    const data = { ...payload };
    if (data.validFrom) data.validFrom = new Date(data.validFrom);
    if (data.validTo) data.validTo = new Date(data.validTo);
    return prisma.discount.update({ where: { id }, data });
};

const removeDiscount = (id) => prisma.discount.delete({ where: { id } });

module.exports = { listDiscounts, createDiscount, updateDiscount, removeDiscount };
