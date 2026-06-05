import assert from "node:assert/strict";
import fs from "node:fs";
import { describe, it } from "node:test";

const styles = fs.readFileSync(new URL("../styles.css", import.meta.url), "utf8");

function getCssBlock(selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = styles.match(new RegExp(`${escaped}\\s*\\{(?<body>[^}]+)\\}`));
  assert.ok(match?.groups?.body, `Missing CSS block for ${selector}`);
  return match.groups.body;
}

function getCssValue(block, property) {
  const escaped = property.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = block.match(new RegExp(`${escaped}\\s*:\\s*([^;]+);`));
  return match?.[1]?.trim() || "";
}

describe("player typography", () => {
  it("does not clip descenders in the large current word", () => {
    const block = getCssBlock("#currentTerm");

    assert.notEqual(getCssValue(block, "overflow"), "hidden");
    assert.ok(Number(getCssValue(block, "line-height")) >= 1.08);
  });

  it("keeps switch inputs inside the visible switch control", () => {
    const switchBlock = getCssBlock(".switch");
    const inputBlock = getCssBlock(".switch input");

    assert.equal(getCssValue(switchBlock, "position"), "relative");
    assert.equal(getCssValue(switchBlock, "overflow"), "hidden");
    assert.equal(getCssValue(inputBlock, "inset"), "0");
    assert.equal(getCssValue(inputBlock, "width"), "100%");
  });
});
