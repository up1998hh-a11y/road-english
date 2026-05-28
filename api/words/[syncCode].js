import { cleanSyncCode, normalizeWords, readLibrary, writeLibrary } from "../../backend/storage.js";

function allowCors(request, response) {
  response.setHeader("Access-Control-Allow-Origin", process.env.ALLOWED_ORIGIN || "*");
  response.setHeader("Access-Control-Allow-Methods", "GET,PUT,OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (request.method === "OPTIONS") {
    response.status(204).end();
    return true;
  }
  return false;
}

export default async function handler(request, response) {
  if (allowCors(request, response)) return;

  const syncCode = cleanSyncCode(request.query.syncCode);
  if (!syncCode) {
    response.status(400).json({ error: "同步码无效。" });
    return;
  }

  if (request.method === "GET") {
    const library = await readLibrary(syncCode);
    if (!library) {
      response.status(404).json({ error: "还没有这个同步码的数据。" });
      return;
    }
    response.status(200).json(library);
    return;
  }

  if (request.method === "PUT") {
    const data = {
      words: normalizeWords(request.body?.words),
      settings: request.body?.settings && typeof request.body.settings === "object" ? request.body.settings : {},
      updatedAt: new Date().toISOString(),
    };
    await writeLibrary(syncCode, data);
    response.status(200).json({ ok: true, count: data.words.length, updatedAt: data.updatedAt });
    return;
  }

  response.setHeader("Allow", "GET,PUT,OPTIONS");
  response.status(405).json({ error: "方法不支持。" });
}
