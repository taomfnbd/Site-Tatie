import sharp from "sharp";
import { mkdir, readFile } from "node:fs/promises";
await mkdir("public/images", { recursive: true });
for (let i = 1; i <= 4; i++) {
  let input;
  if (process.argv[2]) input = await readFile(`${process.argv[2]}/${i}.img`);
  else {
    const response = await fetch(
      `https://raw.githubusercontent.com/taomfnbd/image2/main/${i}.svg`,
    );
    if (!response.ok) throw new Error(`Source ${i} indisponible`);
    const svg = await response.text();
    const match = svg.match(/data:image\/[^;]+;base64,([^"\s]+)/);
    if (!match) throw new Error(`Photographie ${i} manquante`);
    input = Buffer.from(match[1], "base64");
  }
  for (const width of i === 1 ? [480, 640, 800, 1200] : [480, 800, 1200]) {
    await sharp(input)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(`public/images/photo-${i}-${width}.webp`);
    if (i === 1)
      await sharp(input)
        .rotate()
        .resize({ width, withoutEnlargement: true })
        .avif({ quality: 50, effort: 6 })
        .toFile(`public/images/photo-1-${width}.avif`);
  }
}
