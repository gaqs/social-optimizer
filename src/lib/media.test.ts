import { test } from "node:test";
import assert from "node:assert/strict";
import { MEDIA_RULES, firstImageMedia, mediaKind, parsePostMedia, validateMediaFile } from "./media";

test("parsePostMedia: JSON array", () => {
  assert.deepEqual(parsePostMedia('["/uploads/a.jpg","/uploads/b.mp4"]'), [
    "/uploads/a.jpg",
    "/uploads/b.mp4",
  ]);
});

test("parsePostMedia: ruta única legada (posts antiguos)", () => {
  assert.deepEqual(parsePostMedia("/uploads/a.jpg"), ["/uploads/a.jpg"]);
});

test("parsePostMedia: vacío", () => {
  assert.deepEqual(parsePostMedia(""), []);
});

test("parsePostMedia: JSON inválido queda como ruta única", () => {
  assert.deepEqual(parsePostMedia("[no-json"), ["[no-json"]);
});

test("firstImageMedia: salta videos", () => {
  assert.equal(firstImageMedia('["/uploads/a.mp4","/uploads/b.jpg"]'), "/uploads/b.jpg");
  assert.equal(firstImageMedia('["/uploads/a.mp4"]'), null);
  assert.equal(firstImageMedia("/uploads/legacy.png"), "/uploads/legacy.png");
});

test("mediaKind", () => {
  assert.equal(mediaKind("image/jpeg"), "image");
  assert.equal(mediaKind("image/gif"), "gif");
  assert.equal(mediaKind("video/mp4"), "video");
  assert.equal(mediaKind("text/plain"), null);
});

test("validateMediaFile: rechaza mime no soportado", async () => {
  const err = await validateMediaFile(new File(["x"], "a.txt", { type: "text/plain" }), MEDIA_RULES, 0);
  assert.match(err!, /no soportado/i);
});

test("validateMediaFile: rechaza pasarse del máximo de archivos", async () => {
  const err = await validateMediaFile(
    new File(["x"], "a.jpg", { type: "image/jpeg" }),
    MEDIA_RULES,
    MEDIA_RULES.maxFiles
  );
  assert.match(err!, /hasta 10 archivos/);
});

test("validateMediaFile: rechaza imagen que pesa de más", async () => {
  const big = new File([new Uint8Array(11 * 1024 * 1024)], "big.jpg", { type: "image/jpeg" });
  const err = await validateMediaFile(big, MEDIA_RULES, 0);
  assert.match(err!, /10MB/);
});

test("validateMediaFile: rechaza video que pesa de más", async () => {
  const big = new File([new Uint8Array(101 * 1024 * 1024)], "big.mp4", { type: "video/mp4" });
  const err = await validateMediaFile(big, MEDIA_RULES, 0);
  assert.match(err!, /100MB/);
});
