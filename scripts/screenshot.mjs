// Chụp màn hình trang để kiểm tra giao diện: node scripts/screenshot.mjs <url> <outdir>
import { chromium } from "playwright-core";
const [url = "http://localhost:3000/", out = "./shots"] = process.argv.slice(2);
const browser = await chromium.launch({ channel: "chrome", headless: true });
for (const [name, vp] of [["desktop", { width: 1440, height: 900 }], ["mobile", { width: 390, height: 844 }]]) {
  const page = await browser.newPage({ viewport: vp, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(2600); // preloader + intro
  await page.screenshot({ path: `${out}/${name}-hero.png` });
  // cuộn chậm để mọi .reveal được kích hoạt
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < h; y += vp.height * 0.6) {
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await page.waitForTimeout(220);
  }
  await page.waitForTimeout(1200);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${out}/${name}-full.png`, fullPage: true });
  console.log(name, "ok", h);
  await page.close();
}
await browser.close();
