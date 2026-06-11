import assert from "node:assert/strict";
import fs from "node:fs";
import { describe, it } from "node:test";
import vm from "node:vm";

const source = fs.readFileSync(new URL("../app.js", import.meta.url), "utf8");

function sliceBetween(startMarker, endMarker) {
  const start = source.indexOf(startMarker);
  const end = source.indexOf(endMarker, start);
  assert.notEqual(start, -1, `Missing start marker: ${startMarker}`);
  assert.notEqual(end, -1, `Missing end marker: ${endMarker}`);
  return source.slice(start, end);
}

const categorySource = [
  sliceBetween("const defaultCategories", "const basicTranslations"),
  sliceBetween("function createId", "function getPlayableWords"),
].join("\n");

const context = {
  window: {
    crypto: {
      randomUUID: () => "fixed-test-id",
    },
  },
  normalizeAssignedDate: (value = "") => (/^\d{4}-\d{2}-\d{2}$/.test(String(value)) ? String(value) : ""),
};
vm.createContext(context);
vm.runInContext(
  `${categorySource};
  globalThis.__createWord = createWord;
  globalThis.__normalizeWord = normalizeWord;
  globalThis.__getCategoryLabel = getCategoryLabel;`,
  context
);

describe("library categories", () => {
  it("stores selected category ids on new words", () => {
    const word = context.__createWord({ term: "invoice", meaning: "发票", category: "外贸词汇" });

    assert.equal(word.category, "trade");
    assert.equal(context.__getCategoryLabel(word.category), "外贸词汇");
  });

  it("keeps imported category aliases and defaults old words to unassigned", () => {
    const dailyWord = context.__normalizeWord({ term: "coffee", group: "日常词汇" });
    const oldWord = context.__normalizeWord({ term: "necessary" });

    assert.equal(dailyWord.category, "daily");
    assert.equal(oldWord.category, "unassigned");
  });
});
