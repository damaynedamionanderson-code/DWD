import { postInquiry } from "./api.js";

function setStatus(statusNode, message, type = "") {
  statusNode.textContent = message;
  statusNode.className = type ? `form-status ${type}` : "form-status";
}

export function initContactForm() {
  const form = document.getElementById("inquiry-form");
  const statusNode = document.getElementById("form-status");

  if (!form || !statusNode) {
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = form.querySelector("button[type='submit']");
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    if (submitButton) {
      submitButton.disabled = true;
    }

    setStatus(statusNode, "Sending your inquiry...");

    try {
      const result = await postInquiry(payload);
      form.reset();
      setStatus(statusNode, result.message, "success");
    } catch (error) {
      setStatus(statusNode, error.message, "error");
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
      }
    }
  });
}
