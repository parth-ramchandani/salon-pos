const { UserRole } = require("@prisma/client");

function authContext(req, res, next) {
  const roleHeader = String(req.headers["x-user-role"] || "ADMIN").toUpperCase();
  const role = Object.values(UserRole).includes(roleHeader) ? roleHeader : UserRole.ADMIN;

  req.user = {
    id: String(req.headers["x-user-id"] || "system"),
    name: String(req.headers["x-user-name"] || "System User"),
    role,
  };

  return next();
}

module.exports = { authContext };
