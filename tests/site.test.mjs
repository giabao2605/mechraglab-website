import test from "node:test";
import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";

const html = await readFile(new URL("../src/index.html", import.meta.url), "utf8");
const css = await readFile(new URL("../src/styles.css", import.meta.url), "utf8");
const script = await readFile(new URL("../src/main.js", import.meta.url), "utf8");

test("SEO metadata and canonical URL", () => {
  for (const field of ['lang="en"', 'name="description"', 'rel="canonical" href="https://mechraglab.click/"', 'property="og:image"', 'type="application/ld+json"']) {
    assert.ok(html.includes(field), field);
  }
});
test("all internal anchor links point to an element", () => {
  const ids = new Set(Array.from(html.matchAll(/\bid="([^"]+)"/g), match => match[1]));
  for (const [, fragment] of html.matchAll(/\bhref="#([^"]+)"/g)) {
    assert.ok(ids.has(fragment), "Missing anchor #" + fragment);
  }
});
test("IDs in the document are unique", () => {
  const ids = Array.from(html.matchAll(/\bid="([^"]+)"/g), match => match[1]);
  assert.equal(ids.length, new Set(ids).size);
});
test("keyboard and mobile navigation are supported", () => {
  assert.match(html, /aria-controls="nav-links" aria-expanded="false"/);
  assert.match(script, /aria-expanded/);
  assert.match(script, /Escape/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(html, /<details>/);
});
test("core sections and content boundaries are present", () => {
  for (const phrase of ["CORE CAPABILITIES", "USE CASES", "THE APPROACH", "ABOUT MECHRAG LAB", "Does it currently integrate Claude?", "Illustrative demo — synthetic data"]) {
    assert.ok(html.includes(phrase), phrase);
  }
  assert.doesNotMatch(html, /zero hallucinations|100% accurate OCR|powered by Claude|enterprise certified/i);
  assert.doesNotMatch(html, /<form\b/i);
});
test("new-tab links have rel=noopener noreferrer", () => {
  const anchors = Array.from(html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g), match => match[0]);
  assert.ok(anchors.length > 0);
  for (const a of anchors) assert.match(a, /rel="noopener noreferrer"/);
});
test("responsive breakpoints exist and public files are present", async () => {
  for (const width of [1120,810,590]) assert.ok(css.includes("max-width:" + width + "px"));
  for (const file of ["../public/favicon.svg", "../public/og-image.svg", "../public/robots.txt", "../public/sitemap.xml", "../public/_headers", "../scripts/build.mjs"]) {
    const item = await stat(new URL(file, import.meta.url));
    assert.ok(item.isFile() && item.size > 0, file);
  }
});
