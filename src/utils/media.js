const sourcePattern =
  /^https:\/\/raw\.githubusercontent\.com\/taomfnbd\/image2\/main\/([1-4])\.svg$/;
export function imageSource(src = "") {
  const match = src.match(sourcePattern);
  return match ? `/images/photo-${match[1]}-800.webp` : src;
}
export function imageSet(src = "") {
  const match =
    src.match(sourcePattern) ||
    src.match(/^\/images\/photo-([1-4])-\d+\.webp$/);
  return match
    ? (match[1] === "1" ? [480, 640, 800, 1200] : [480, 800, 1200])
        .map((width) => `/images/photo-${match[1]}-${width}.webp ${width}w`)
        .join(", ")
    : undefined;
}

export function portraitAvifSet(src = "") {
  return imageSource(src).startsWith("/images/photo-1-")
    ? imageSet(src)?.replaceAll(".webp", ".avif")
    : undefined;
}

export function imageDimensions(src = "") {
  const match =
    src.match(sourcePattern) ||
    src.match(/^\/images\/photo-([1-4])-\d+\.(?:webp|avif)$/);
  return match
    ? { width: 1200, height: { 1: 1600, 2: 900, 3: 924, 4: 900 }[match[1]] }
    : undefined;
}
