(function (global) {
const ENGLISH_LETTER_RE = /[A-Za-z]/;
const CHINESE_RE = /[\u3400-\u9fff]/;
const PHONETIC_RE = /\/[^/]+\/|\[[^\]]+\]/;

const DEFAULT_DAILY_NEW_TARGET = 15;

function todayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

function stripListMarker(value) {
  return String(value || "")
    .trim()
    .replace(/^[\s\-*•·]+/, "")
    .replace(/^(?:\d+|[一二三四五六七八九十百千万]+)[、.．)）:：\s]+/, "")
    .trim();
}

function extractLeadingEnglish(value) {
  const text = stripListMarker(value);
  const match = text.match(/^[A-Za-z][A-Za-z'’.-]*(?:\s+[A-Za-z][A-Za-z'’.-]*)*/);
  return match ? match[0].replace(/[.。,:：;；]+$/, "").trim() : "";
}

function isUsableTerm(value) {
  const term = String(value || "").trim();
  return Boolean(term && ENGLISH_LETTER_RE.test(term) && !CHINESE_RE.test(term));
}

function splitMeaningFromLine(line) {
  const text = stripListMarker(line);
  const chineseIndex = text.search(CHINESE_RE);
  const beforeMeaning = chineseIndex >= 0 ? text.slice(0, chineseIndex).trim() : text;
  const meaning = chineseIndex >= 0 ? text.slice(chineseIndex).trim() : "";
  const phoneticMatch = beforeMeaning.match(PHONETIC_RE);
  const phonetic = phoneticMatch ? phoneticMatch[0] : "";
  const termSource = phonetic ? beforeMeaning.replace(phonetic, " ").trim() : beforeMeaning;
  const term = extractLeadingEnglish(termSource);
  const rest = term ? termSource.slice(term.length).trim() : "";

  return {
    term,
    phonetic,
    meaning: meaning || rest,
  };
}

function parseDelimitedLine(line) {
  const parts = line.includes("|") ? line.split(/\s*\|\s*/) : line.split(/\t+/);
  const term = extractLeadingEnglish(parts[0] || "");
  if (!isUsableTerm(term)) return null;

  const hasPhonetic = parts[1] && /[\/\[\]ˈˌəɪʊɑɔæɛɜθðʃʒŋ]/.test(parts[1]);
  return {
    term,
    phonetic: hasPhonetic ? String(parts[1] || "").trim() : "",
    meaning: hasPhonetic ? String(parts[2] || "").trim() : String(parts[1] || "").trim(),
    sentence: hasPhonetic ? parts.slice(3).join(" ").trim() : parts.slice(2).join(" ").trim(),
  };
}

function parsePlainLine(line) {
  const parsed = splitMeaningFromLine(line);
  if (!isUsableTerm(parsed.term)) return null;
  return {
    term: parsed.term,
    phonetic: parsed.phonetic,
    meaning: parsed.meaning,
    sentence: "",
  };
}

function parseBulkText(text) {
  return String(text || "")
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => (line.includes("|") || line.includes("\t") ? parseDelimitedLine(line) : parsePlainLine(line)))
    .filter(Boolean);
}

function normalizeAssignedDate(value) {
  const text = String(value || "").trim();
  return /^\d{4}-\d{2}-\d{2}$/.test(text) ? text : "";
}

function getCurrentStudyDate(planDate = "") {
  return normalizeAssignedDate(planDate) || todayIsoDate();
}

function getTodayWords(words, date = todayIsoDate()) {
  const currentDate = getCurrentStudyDate(date);
  return words.filter((word) => normalizeAssignedDate(word?.assignedDate) === currentDate);
}

function getDailyAssignableWords(words) {
  return words.filter((word) => word && !word.known && !normalizeAssignedDate(word.assignedDate));
}

function prepareQuickAddedWord(word, date = todayIsoDate()) {
  if (!word) return null;
  word.assignedDate = getCurrentStudyDate(date);
  return word;
}

function getPlayableWordsForSettings(words, settings = {}) {
  const currentDate = getCurrentStudyDate(settings.currentDate);
  return words.filter((word) => {
    if (settings.todayOnly && normalizeAssignedDate(word.assignedDate) !== currentDate) return false;
    if (settings.hardOnly && !word.hard) return false;
    if (settings.skipKnown && word.known) return false;
    return true;
  });
}

global.RoadEnglishCore = {
  DEFAULT_DAILY_NEW_TARGET,
  getCurrentStudyDate,
  getDailyAssignableWords,
  getPlayableWordsForSettings,
  getTodayWords,
  normalizeAssignedDate,
  prepareQuickAddedWord,
  parseBulkText,
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = global.RoadEnglishCore;
}
})(typeof globalThis !== "undefined" ? globalThis : window);
