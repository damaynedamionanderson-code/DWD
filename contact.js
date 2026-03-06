(function () {
  const form = document.getElementById("inquiry-form");
  const status = document.getElementById("form-status");

  if (!form || !status) {
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitBtn = form.querySelector("button[type='submit']");
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    submitBtn.disabled = true;
    status.textContent = "Sending your inquiry...";
    status.className = "form-status";

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Unable to submit your inquiry right now.");
      }

      form.reset();
      status.textContent = result.message;
      status.className = "form-status success";
    } catch (error) {
      status.textContent = error.message;
      status.className = "form-status error";
    } finally {
      submitBtn.disabled = false;
    }
  });
})();
