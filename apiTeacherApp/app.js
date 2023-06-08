const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const usersRouter = require("./routes/users");
const locationsRouter = require("./routes/locations");
const categoriesRouter = require("./routes/categories");
const registerRouter = require("./routes/register");
const apiRouter = require("./routes/api");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", usersRouter);
app.use("/locations", locationsRouter);
app.use("/categories", categoriesRouter);
app.use("/register", registerRouter);
app.use("/api", apiRouter);

module.exports = app;
