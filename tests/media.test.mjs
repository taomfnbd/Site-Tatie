import { test } from "node:test";
import assert from "node:assert/strict";
import sharp from "sharp";
import { imageDimensions } from "../src/utils/media.js";
test("declared image dimensions agree with the real photos and unknown uploads are not guessed", async () => {
  for (const id of [1, 2, 3, 4]) {
    const path = `/images/photo-${id}-1200.webp`;
    const metadata = await sharp("public" + path).metadata();
    assert.deepEqual(imageDimensions(path), {
      width: metadata.width,
      height: metadata.height,
    });
    assert.deepEqual(
      imageDimensions(
        `https://raw.githubusercontent.com/taomfnbd/image2/main/${id}.svg`,
      ),
      imageDimensions(path),
    );
  }
  assert.equal(imageDimensions("/media/upload.webp"), undefined);
});
