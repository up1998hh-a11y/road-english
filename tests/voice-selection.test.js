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

const voiceSource = [
  sliceBetween("const britishStyleVoiceLangs", "const defaultSettings"),
  sliceBetween("function getVoiceLangRank", "function describeVoice"),
  sliceBetween("function describeVoice", "function getVoice"),
].join("\n");

const context = { console };
vm.createContext(context);
vm.runInContext(
  `${voiceSource};
  globalThis.__isNaturalEnglishVoice = isNaturalEnglishVoice;
  globalThis.__pickVoicesByAccent = pickVoicesByAccent;
  globalThis.__describeVoice = describeVoice;`,
  context
);

function plain(value) {
  return JSON.parse(JSON.stringify(value));
}

describe("voice selection", () => {
  it("keeps mainstream Apple-style English voices ahead of novelty voices", () => {
    const rawVoices = [
      { name: "Bubbles", lang: "en-US", localService: true },
      { name: "Samantha", lang: "en-US", localService: true },
      { name: "Daniel", lang: "en-GB", localService: true },
      { name: "Fiona", lang: "en-GB", localService: true },
      { name: "Moira", lang: "en-IE", localService: true },
      { name: "Karen", lang: "en-AU", localService: true },
      { name: "Alex", lang: "en-US", localService: true },
      { name: "Kathy", lang: "en-US", localService: true },
    ];

    const voices = rawVoices.filter(context.__isNaturalEnglishVoice);
    const selected = plain(context.__pickVoicesByAccent(voices).map((voice) => voice.name));

    assert.deepEqual(selected.includes("Bubbles"), false);
    assert.deepEqual(selected.slice(0, 5), ["Alex", "Kathy", "Samantha", "Daniel", "Fiona"]);
    assert.deepEqual(selected.includes("Moira"), true);
    assert.deepEqual(selected.includes("Karen"), true);
  });

  it("allows a broader set of mainstream Apple and system English voices", () => {
    const voices = [
      ["Alex", "en-US"],
      ["Allison", "en-US"],
      ["Ava", "en-US"],
      ["Joelle", "en-US"],
      ["Kendra", "en-US"],
      ["Kimberly", "en-US"],
      ["Kathy", "en-US"],
      ["Matthew", "en-US"],
      ["Nicky", "en-US"],
      ["Noelle", "en-US"],
      ["Samantha", "en-US"],
      ["Stephanie", "en-US"],
      ["Susan", "en-US"],
      ["Tom", "en-US"],
      ["Zoe", "en-US"],
      ["Daniel", "en-GB"],
      ["Fiona", "en-GB"],
      ["Serena", "en-GB"],
      ["Oliver", "en-GB"],
      ["Martha", "en-GB"],
      ["Arthur", "en-GB"],
      ["Kate", "en-GB"],
      ["Malcolm", "en-GB"],
      ["Olivia", "en-GB"],
      ["Karen", "en-AU"],
      ["Lee", "en-AU"],
      ["Russell", "en-AU"],
      ["Matilda", "en-AU"],
      ["Moira", "en-IE"],
      ["Tessa", "en-ZA"],
      ["Catherine", "en-CA"],
      ["Rishi", "en-IN"],
      ["Veena", "en-IN"],
      ["Melina", "en-IN"],
      ["Rocko", "en-US"],
    ].map(([name, lang]) => ({ name, lang, localService: true }));

    const selected = plain(context.__pickVoicesByAccent(voices).map((voice) => voice.name));

    assert.ok(selected.length > 18);
    assert.ok(selected.includes("Samantha"));
    assert.ok(selected.includes("Daniel"));
    assert.ok(selected.includes("Olivia"));
    assert.ok(selected.includes("Russell"));
    assert.ok(selected.includes("Veena"));
    assert.ok(selected.includes("Rocko"));
    assert.ok(selected.indexOf("Rocko") > selected.indexOf("Samantha"));
  });

  it("labels accent regions and quality in the dropdown", () => {
    assert.equal(
      context.__describeVoice({ name: "Samantha", lang: "en-US" }),
      "Samantha · 美式 · 自然音质"
    );
    assert.equal(
      context.__describeVoice({ name: "Moira", lang: "en-IE" }),
      "Moira · 爱尔兰 · 自然音质"
    );
  });
});
