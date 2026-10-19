// Quét /public/images, sinh manifest (kích thước + blur placeholder) cho next/image,
// tách logo thành PNG trong suốt (bản đen & bản trắng) và dựng ảnh Open Graph từ ảnh thật.
// Chạy: npm run images
import { readdirSync, statSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join, relative, extname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const imagesDir = join(root, "public/images");
const collections = ["old-town", "countryside", "moments"];

// 1. Manifest ảnh
const manifest = {};
for (const dir of collections) {
  for (const file of readdirSync(join(imagesDir, dir)).sort()) {
    if (![".jpg", ".jpeg", ".png", ".webp"].includes(extname(file).toLowerCase())) continue;
    const abs = join(imagesDir, dir, file);
    const img = sharp(abs);
    const { width, height } = await img.metadata();
    const blur = await img.clone().resize(16).jpeg({ quality: 40 }).toBuffer();
    const src = "/" + relative(join(root, "public"), abs).replaceAll("\\", "/");
    manifest[src] = { width, height, blurDataURL: `data:image/jpeg;base64,${blur.toString("base64")}` };
    console.log(`manifest ${src} ${width}x${height}`);
  }
}
const out = join(root, "src/data/images.generated.js");
writeFileSync(
  out,
  `// File sinh tự động bởi scripts/build-images.mjs — đừng sửa tay.\nexport const imageMeta = ${JSON.stringify(manifest, null, 2)};\n`
);

// 2. Logo trong suốt: lấy độ tối làm alpha, giữ màu gốc (chấm cam) cho bản đen, phủ trắng cho bản trắng.
const logoSrc = join(imagesDir, "brand/logo.jpg");
if (statSync(logoSrc, { throwIfNoEntry: false })) {
  const { data, info } = await sharp(logoSrc).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const dark = Buffer.alloc(data.length);
  const light = Buffer.alloc(data.length);
  for (let i = 0; i < data.length; i += 4) {
    const px = i / 4;
    const x = px % info.width;
    const y = Math.floor(px / info.width);
    const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    // Bỏ cụm chấm xám góc trên phải của ảnh gốc; nâng tương phản alpha để viền nét.
    const junk = x > info.width * 0.8 && y < info.height * 0.22;
    const saturation = Math.max(r, g, b) - Math.min(r, g, b);
    const alpha = junk
      ? 0
      : saturation > 50
        ? 255 // pixel có màu (chấm cam) giữ nguyên
        : Math.min(255, Math.max(0, Math.round((255 - lum - 30) * 1.6)));
    dark.set([r, g, b, alpha], i);
    light.set([255, 255, 255, alpha], i);
  }
  const opts = { raw: { width: info.width, height: info.height, channels: 4 } };
  await sharp(dark, opts).trim().png().toFile(join(imagesDir, "brand/logo.png"));
  await sharp(light, opts).trim().png().toFile(join(imagesDir, "brand/logo-white.png"));
  console.log("logo    brand/logo.png, brand/logo-white.png");
}

// 3. Ảnh Open Graph 1200x630 từ ảnh thật + logo.
mkdirSync(join(imagesDir, "og"), { recursive: true });
const logoWhite = await sharp(join(imagesDir, "brand/logo-white.png")).resize({ width: 520 }).png().toBuffer();
await sharp(join(imagesDir, "old-town/yellow-house-kiss.jpg"))
  .resize(1200, 630, { fit: "cover", position: "attention" })
  .composite([
    {
      input: Buffer.from(
        `<svg width="1200" height="630"><rect width="1200" height="630" fill="url(#g)"/><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0.4" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.65"/></linearGradient></defs></svg>`
      ),
    },
    { input: logoWhite, left: 72, top: 630 - 72 - Math.round((520 * 207) / 738) },
  ])
  .jpeg({ quality: 86 })
  .toFile(join(imagesDir, "og/og-image.jpg"));
console.log("og      og/og-image.jpg");
