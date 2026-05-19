const API_BASE = "http://127.0.0.1:5000/api";

export async function scanURL(url) {
  const response = await fetch(`${API_BASE}/scan`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    throw new Error("Server error");
  }

  return await response.json();
}
