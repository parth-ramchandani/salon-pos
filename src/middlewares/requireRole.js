const { ApiError } = require("../utils/apiError");

const requireRole = (allowedRoles) => (req, res, next) => {
  const role = req.user?.role;
  if (!role || !allowedRoles.includes(role)) {
    return next(new ApiError(403, `Forbidden: requires role ${allowedRoles.join(" or ")}`));
  }
  return next();
};

module.exports = { requireRole };
