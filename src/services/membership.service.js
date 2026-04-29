const { prisma } = require("../config/prisma");

const mapMembership = (item) => ({ ...item, benefits: JSON.parse(item.benefitsJson) });

const listMembershipPlans = async () => {
  const data = await prisma.membershipPlan.findMany({ orderBy: { createdAt: "desc" } });
  return data.map(mapMembership);
};

const createMembershipPlan = async (payload) => {
  const { benefits, ...rest } = payload;
  const data = await prisma.membershipPlan.create({
    data: { ...rest, benefitsJson: JSON.stringify(benefits || []) },
  });
  return mapMembership(data);
};

const updateMembershipPlan = async (id, payload) => {
  const data = { ...payload };
  if (data.benefits) {
    data.benefitsJson = JSON.stringify(data.benefits);
    delete data.benefits;
  }
  const updated = await prisma.membershipPlan.update({ where: { id }, data });
  return mapMembership(updated);
};

const removeMembershipPlan = (id) => prisma.membershipPlan.delete({ where: { id } });

module.exports = {
  listMembershipPlans,
  createMembershipPlan,
  updateMembershipPlan,
  removeMembershipPlan,
};
