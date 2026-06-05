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

const meaningSource = [
  sliceBetween("const basicTranslations", "const chineseToEnglish"),
  sliceBetween("function cleanMeaningText", "function fitCurrentTerm"),
  sliceBetween("function hasChineseText", "async function translateChineseToEnglish"),
].join("\n");

const context = {};
vm.createContext(context);
vm.runInContext(
  `${meaningSource};
  globalThis.__studyTranslations = studyTranslations;
  globalThis.__getDisplayMeaning = getDisplayMeaning;
  globalThis.__cleanMeaningText = cleanMeaningText;`,
  context
);

describe("meaning display", () => {
  it("shows richer part-of-speech meanings for common ambiguous words", () => {
    assert.equal(
      context.__getDisplayMeaning({ term: "command", meaning: "命令" }),
      "n. 命令；指令；控制权 / v. 命令；指挥；掌握"
    );
  });

  it("uses the richer local study dictionary before network translation", () => {
    assert.equal(
      context.__studyTranslations.command,
      "n. 命令；指令；控制权 / v. 命令；指挥；掌握"
    );
    assert.equal(
      context.__studyTranslations.order,
      "n. 顺序；订单；命令 / v. 命令；订购；整理"
    );
  });

  it("keeps detailed user meanings instead of replacing them", () => {
    assert.equal(
      context.__getDisplayMeaning({ term: "command", meaning: "命令；指令；掌握；控制" }),
      "命令；指令；掌握；控制"
    );
  });
});
