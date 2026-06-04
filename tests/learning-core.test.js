import assert from "node:assert/strict";
import fs from "node:fs";
import { describe, it } from "node:test";
import vm from "node:vm";

const context = { RoadEnglishCore: null };
vm.createContext(context);
vm.runInContext(fs.readFileSync(new URL("../learning-core.js", import.meta.url), "utf8"), context);

const {
  getDailyAssignableWords,
  getPlayableWordsForSettings,
  parseBulkText,
} = context.RoadEnglishCore;

describe("bulk import parsing", () => {
  it("skips Chinese section headings and keeps English word rows", () => {
    const words = parseBulkText(`
      二、通用名词（400 个）
      二
      necessary | 必要的
      commute | 通勤
      三、动词（100 个）
      operate 操作
    `);

    assert.deepEqual(
      JSON.parse(JSON.stringify(words.map((word) => [word.term, word.meaning]))),
      [
        ["necessary", "必要的"],
        ["commute", "通勤"],
        ["operate", "操作"],
      ]
    );
  });
});

describe("daily learning pool", () => {
  it("assigns only unassigned unfamiliar words", () => {
    const words = [
      { id: "a", term: "necessary", known: false, assignedDate: "" },
      { id: "b", term: "commute", known: false, assignedDate: "2026-06-03" },
      { id: "c", term: "recognize", known: true, assignedDate: "" },
      { id: "d", term: "confident", known: false },
    ];

    assert.deepEqual(
      JSON.parse(JSON.stringify(getDailyAssignableWords(words)
        .map((word) => word.id)
        .slice(0, 2))),
      ["a", "d"]
    );
  });

  it("can limit playback to today's words", () => {
    const words = [
      { id: "a", term: "necessary", known: false, hard: false, assignedDate: "2026-06-04" },
      { id: "b", term: "commute", known: false, hard: false, assignedDate: "2026-06-03" },
      { id: "c", term: "recognize", known: true, hard: false, assignedDate: "2026-06-04" },
    ];

    const playable = getPlayableWordsForSettings(words, {
      todayOnly: true,
      currentDate: "2026-06-04",
      hardOnly: false,
      skipKnown: true,
    });

    assert.deepEqual(
      JSON.parse(JSON.stringify(playable.map((word) => word.id))),
      ["a"]
    );
  });
});
