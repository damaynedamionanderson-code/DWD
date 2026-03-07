const fs = require("fs/promises");
const path = require("path");

const DATA_DIR = path.resolve(__dirname, "../../data");
const INQUIRIES_FILE = path.join(DATA_DIR, "inquiries.jsonl");

async function saveInquiry(payload) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.appendFile(INQUIRIES_FILE, `${JSON.stringify(payload)}\n`, "utf8");
}

module.exports = {
  saveInquiry,
  DATA_DIR,
  INQUIRIES_FILE
};
