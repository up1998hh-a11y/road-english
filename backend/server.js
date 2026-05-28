import express from "express";
import { cleanSyncCode, normalizeWords, readLibrary, writeLibrary } from "./storage.js";

const app = express();
const port = Number(process.env.PORT || 8787);

app.use(express.json({ limit: "2mb" }));

app.use((request, response, next) => {
  response.setHeader("Access-Control-Allow-Origin", process.env.ALLOWED_ORIGIN || "*");
  response.setHeader("Access-Control-Allow-Methods", "GET,PUT,OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (request.method === "OPTIONS") {
    response.status(204).end();
    return;
  }
  next();
});

app.get("/api/health", (_request, response) => {
  response.json({ ok: true });
});

app.get("/api/words/:syncCode", async (request, response) => {
  const syncCode = cleanSyncCode(request.params.syncCode);
  if (!syncCode) {
    response.status(400).json({ error: "同步码无效。" });
    return;
  }
  const library = await readLibrary(syncCode);
  if (!library) {
    response.status(404).json({ error: "还没有这个同步码的数据。" });
    return;
  }
  response.json(library);
});

app.put("/api/words/:syncCode", async (request, response) => {
  const syncCode = cleanSyncCode(request.params.syncCode);
  if (!syncCode) {
    response.status(400).json({ error: "同步码无效。" });
    return;
  }
  const data = {
    words: normalizeWords(request.body?.words),
    settings: request.body?.settings && typeof request.body.settings === "object" ? request.body.settings : {},
    updatedAt: new Date().toISOString(),
  };
  await writeLibrary(syncCode, data);
  response.json({ ok: true, count: data.words.length, updatedAt: data.updatedAt });
});

app.listen(port, () => {
  console.log(`Road English backend listening on ${port}`);
});
