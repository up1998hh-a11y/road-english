import assert from "node:assert/strict";
import fs from "node:fs";
import { describe, it } from "node:test";
import vm from "node:vm";

const context = { RoadEnglishCore: null };
vm.createContext(context);
vm.runInContext(fs.readFileSync(new URL("../learning-core.js", import.meta.url), "utf8"), context);

const {
  getDailyAssignableWords,
  getDailyPlanStats,
  getPlayableWordsForSettings,
  prepareQuickAddedWord,
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

  it("does not assign a category while parsing plain bulk text", () => {
    const words = parseBulkText("command 命令");

    assert.equal(words[0].category, undefined);
  });
});

describe("daily learning pool", () => {
  it("calculates today's familiar target progress from today's words", () => {
    const words = [
      { id: "a", known: true, assignedDate: "2026-06-04" },
      { id: "b", known: false, assignedDate: "2026-06-04" },
      { id: "c", known: true, assignedDate: "2026-06-03" },
    ];

    const stats = getDailyPlanStats(words, { date: "2026-06-04", target: 2 });

    assert.equal(stats.todayKnown, 1);
    assert.equal(stats.todayRemaining, 1);
    assert.equal(stats.rate, 50);
    assert.deepEqual(
      JSON.parse(JSON.stringify(stats.todayWords.map((word) => word.id))),
      ["a", "b"]
    );
  });

  it("puts a single quick-added word into today's learning pool", () => {
    const word = { id: "a", term: "command", known: false, assignedDate: "" };

    prepareQuickAddedWord(word, "2026-06-04");

    assert.equal(word.assignedDate, "2026-06-04");
  });

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

  it("can limit playback to today's hard words", () => {
    const words = [
      { id: "a", term: "necessary", known: false, hard: true, assignedDate: "2026-06-04" },
      { id: "b", term: "commute", known: false, hard: false, assignedDate: "2026-06-04" },
      { id: "c", term: "recognize", known: false, hard: true, assignedDate: "2026-06-03" },
    ];

    const playable = getPlayableWordsForSettings(words, {
      todayOnly: true,
      currentDate: "2026-06-04",
      hardOnly: true,
      skipKnown: false,
    });

    assert.deepEqual(
      JSON.parse(JSON.stringify(playable.map((word) => word.id))),
      ["a"]
    );
  });
});
