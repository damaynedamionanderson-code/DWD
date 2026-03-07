const express = require("express");
const path = require("path");
const apiRoutes = require("./routes/inquiries");

const app = express();
const frontendDir = path.resolve(__dirname, "../../frontend");

app.disable("x-powered-by");

app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
});

app.use("/api", (req, res, next) => {
  // Allow local static-dev servers to call the API during development.
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: false }));

app.use("/api", apiRoutes);
app.use(express.static(frontendDir));

app.get("*", (_req, res) => {
  res.sendFile(path.join(frontendDir, "index.html"));
});

module.exports = app;
