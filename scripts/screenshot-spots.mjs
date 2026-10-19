// Chụp vài vị trí cụ thể: node scripts/screenshot-spots.mjs <baseUrl> <outdir>
import { chromium } from "playwright-core";
const [base = "http://localhost:3000", out = "./shots"] = process.argv.slice(2);
const browser = await chromium.launch({ channel: "chrome", headless: true });
const shot = async (path, vp, y, name, extra) => {
  const page = await browser.newPage({ viewport: vp });
  await page.goto(base + path, { waitUntil: "networkidle" });
  await page.waitForTimeout(2600);
  if (y === "bottom") y = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let s = 0; s <= y; s += vp.height * 0.6) { await page.evaluate((s) => window.scrollTo(0, s), s); await page.waitForTimeout(120); }
  await page.evaluate((y) => window.scrollTo(0, y), y);
  await page.waitForTimeout(1500);
  if (extra) await extra(page);
  await page.screenshot({ path: `${out}/${name}.png` });
  await page.close();
};
const D = { width: 1440, height: 900 }, M = { width: 390, height: 844 };
await shot("/", D, 1300, "spot-header-light");
await shot("/", D, "bottom", "spot-footer");
await shot("/", M, "bottom", "spot-mobile-footer");
await shot("/en", D, 0, "spot-en-hero");
await shot("/", D, 2900, "spot-collections-hover", async (p) => { await p.hover("#collections article:nth-child(2)"); await p.waitForTimeout(1200); });
await shot("/", D, 4200, "spot-lightbox", async (p) => { await p.click("#gallery li:nth-child(2) button"); await p.waitForTimeout(900); });
await shot("/", M, 0, "spot-mobile-menu", async (p) => { await p.click("header button[aria-controls=mobile-menu]"); await p.waitForTimeout(900); });
await browser.close();
console.log("done");
