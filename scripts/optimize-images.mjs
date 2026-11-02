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
  for (const width of [480, 800, 1200])
    await sharp(input)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(`public/images/photo-${i}-${width}.webp`);
}
