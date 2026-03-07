function resolveApiUrl(pathname) {
  const { protocol, port } = window.location;
  const isStaticDevServer = protocol.startsWith("http") && (port === "5500" || port === "5501");

  if (isStaticDevServer) {
    return `http://localhost:3000${pathname}`;
  }

  return pathname;
}

export async function postInquiry(payload) {
  const response = await fetch(resolveApiUrl("/api/inquiries"), {
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

  return result;
}
