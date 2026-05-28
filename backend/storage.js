import { Redis } from "@upstash/redis";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dataDir = process.env.DATA_DIR || join(dirname(fileURLToPath(import.meta.url)), "data");
const maxWords = 5000;
const redis =
  process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN
    ? new Redis({
        url: process.env.KV_REST_API_URL,
        token: process.env.KV_REST_API_TOKEN,
      })
    : null;

export function cleanSyncCode(value) {
  return String(value || "")
    .trim()
    .replace(/[^a-zA-Z0-9_-]/g, "")
    .slice(0, 80);
}

export function normalizeWords(words) {
  if (!Array.isArray(words)) return [];
  return words
    .slice(0, maxWords)
    .map((word) => ({
      id: String(word.id || "").slice(0, 120),
      term: String(word.term || "").trim().slice(0, 200),
      meaning: String(word.meaning || "").trim().slice(0, 500),
      phonetic: String(word.phonetic || "").trim().slice(0, 120),
      sentence: String(word.sentence || "").trim().slice(0, 800),
      known: Boolean(word.known),
      createdAt: String(word.createdAt || new Date().toISOString()).slice(0, 80),
      listenCount: Number(word.listenCount || 0),
    }))
    .filter((word) => word.term);
}

function filePath(syncCode) {
  return join(dataDir, `${syncCode}.json`);
}

export async function readLibrary(syncCode) {
  if (redis) {
    return redis.get(`library:${syncCode}`);
  }
  const path = filePath(syncCode);
  if (!existsSync(path)) return null;
  return JSON.parse(readFileSync(path, "utf8"));
}

export async function writeLibrary(syncCode, data) {
  if (redis) {
    await redis.set(`library:${syncCode}`, data);
    return;
  }
  mkdirSync(dataDir, { recursive: true });
  writeFileSync(filePath(syncCode), JSON.stringify(data, null, 2));
}
