const { ApiError } = require("../utils/apiError");

const validateBody = (schema) => (req, res, next) => {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    return next(new ApiError(400, parsed.error.issues[0].message));
  }
  req.body = parsed.data;
  return next();
};

module.exports = { validateBody };
