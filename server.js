import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/health", (_req, res) => {
  res.json({ status: "ok", app: "BLVCK" });
});

app.get("/proxy", async (req, res) => {
  const rawUrl = req.query.url;

  if (typeof rawUrl !== "string" || !rawUrl) {
    return res.status(400).send("Add a URL using ?url=https://example.com");
  }

  let target;
  try {
    target = new URL(rawUrl);
  } catch {
    return res.status(400).send("Invalid URL.");
  }

  if (!["http:", "https:"].includes(target.protocol)) {
    return res.status(400).send("Only HTTP and HTTPS URLs are supported.");
  }

  // This starter intentionally does not fetch arbitrary websites.
  // A production proxy needs domain allowlisting, private-IP blocking,
  // redirect validation, response-size limits, and content sanitization.
  return res.status(501).send(
    "BLVCK proxy endpoint is not enabled yet. Safe upstream fetching must be configured first."
  );
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`BLVCK running on port ${PORT}`);
});
