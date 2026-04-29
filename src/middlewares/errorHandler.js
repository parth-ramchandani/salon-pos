const { Prisma } = require("@prisma/client");

function formatUniqueConstraintMessage(target) {
  if (!target) return "Duplicate value violates unique constraint";
  const fields = Array.isArray(target) ? target : [target];
  return `Duplicate value for unique field(s): ${fields.join(", ")}`;
}

function errorHandler(err, req, res, next) {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: formatUniqueConstraintMessage(err.meta?.target),
      });
    }

    if (err.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "Requested record was not found",
      });
    }
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  return res.status(statusCode).json({
    success: false,
    message,
  });
}

module.exports = { errorHandler };
