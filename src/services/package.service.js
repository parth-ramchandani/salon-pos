const { prisma } = require("../config/prisma");

const mapPackage = (pkg) => ({ ...pkg, services: JSON.parse(pkg.servicesJson) });

const listPackages = async (activeFilter) => {
  const where =
    typeof activeFilter === "boolean"
      ? { isActive: activeFilter }
      : {};
  const data = await prisma.servicePackage.findMany({ where, orderBy: { createdAt: "desc" } });
  return data.map(mapPackage);
};

const createPackage = async (payload) => {
  const { services, ...rest } = payload;
  const data = await prisma.servicePackage.create({
    data: { ...rest, servicesJson: JSON.stringify(services) },
  });
  return mapPackage(data);
};

const updatePackage = async (id, payload) => {
  const data = { ...payload };
  if (data.services) {
    data.servicesJson = JSON.stringify(data.services);
    delete data.services;
  }
  const updated = await prisma.servicePackage.update({ where: { id }, data });
  return mapPackage(updated);
};

const removePackage = (id) => prisma.servicePackage.delete({ where: { id } });

module.exports = { listPackages, createPackage, updatePackage, removePackage };
