const express = require("express");
const { validateInquiry } = require("../utils/validation");
const { saveInquiry } = require("../services/inquiryService");

const router = express.Router();

router.get("/health", (_req, res) => {
  res.json({ ok: true, service: "damayne-web-design-api" });
});

router.post("/inquiries", async (req, res) => {
  const { payload, error } = validateInquiry(req.body);

  if (error) {
    return res.status(400).json({ ok: false, error });
  }

  try {
    await saveInquiry(payload);
    return res.status(201).json({
      ok: true,
      message: "Inquiry received. You should get a response within 24 hours."
    });
  } catch (saveError) {
    return res.status(500).json({
      ok: false,
      error: "Unable to save inquiry right now."
    });
  }
});

module.exports = router;
