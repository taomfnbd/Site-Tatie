const sourcePattern = /^https:\/\/raw\.githubusercontent\.com\/taomfnbd\/image2\/main\/([1-4])\.svg$/;
export function imageSource(src = '') {
  const match = src.match(sourcePattern);
  return match ? `/images/photo-${match[1]}-800.webp` : src;
}
export function imageSet(src = '') {
  const match = src.match(sourcePattern) || src.match(/^\/images\/photo-([1-4])-\d+\.webp$/);
  return match ? [480, 800, 1200].map(width => `/images/photo-${match[1]}-${width}.webp ${width}w`).join(', ') : undefined;
}
