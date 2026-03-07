function cleanText(value) {
  return String(value || "").trim();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateInquiry(input) {
  const payload = {
    name: cleanText(input.name),
    email: cleanText(input.email),
    business: cleanText(input.business),
    package: cleanText(input.package),
    details: cleanText(input.details),
    submittedAt: new Date().toISOString()
  };

  if (!payload.name || payload.name.length < 2) {
    return { error: "Please enter a valid name." };
  }

  if (!payload.email || !isValidEmail(payload.email)) {
    return { error: "Please enter a valid email address." };
  }

  if (!payload.package) {
    return { error: "Please select a package." };
  }

  if (!payload.details || payload.details.length < 10) {
    return { error: "Please provide more project details." };
  }

  return { payload };
}

module.exports = {
  cleanText,
  isValidEmail,
  validateInquiry
};
