require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const { apiRouter } = require("./routes");
const { errorHandler } = require("./middlewares/errorHandler");
const { authContext } = require("./middlewares/authContext");

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(authContext);

app.get("/health", (req, res) => res.json({ success: true, message: "OK" }));
app.use("/api", apiRouter);
app.use(errorHandler);

module.exports = { app };
