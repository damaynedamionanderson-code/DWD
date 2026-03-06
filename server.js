const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const DATA_DIR = path.join(__dirname, "data");
const INQUIRIES_FILE = path.join(DATA_DIR, "inquiries.jsonl");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname));

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function cleanText(value) {
  return String(value || "").trim();
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "damayne-web-design-api" });
});

app.post("/api/inquiries", (req, res) => {
  const payload = {
    name: cleanText(req.body.name),
    email: cleanText(req.body.email),
    business: cleanText(req.body.business),
    package: cleanText(req.body.package),
    details: cleanText(req.body.details),
    submittedAt: new Date().toISOString()
  };

  if (!payload.name || payload.name.length < 2) {
    return res.status(400).json({ ok: false, error: "Please enter a valid name." });
  }

  if (!payload.email || !isValidEmail(payload.email)) {
    return res.status(400).json({ ok: false, error: "Please enter a valid email address." });
  }

  if (!payload.package) {
    return res.status(400).json({ ok: false, error: "Please select a package." });
  }

  if (!payload.details || payload.details.length < 10) {
    return res.status(400).json({ ok: false, error: "Please provide more project details." });
  }

  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.appendFileSync(INQUIRIES_FILE, `${JSON.stringify(payload)}\n`, "utf8");
    return res.status(201).json({
      ok: true,
      message: "Inquiry received. You should get a response within 24 hours."
    });
  } catch (error) {
    return res.status(500).json({ ok: false, error: "Unable to save inquiry right now." });
  }
});

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "Starterpage.html"));
});

app.listen(PORT, () => {
  console.log(`Damayne Web Design server running on http://localhost:${PORT}`);
});
