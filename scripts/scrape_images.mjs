import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://www.dipongroup.com';
const pages = [
  '/',
  '/about-us/',
  '/engineering-construction/',
  '/it-ites/',
  '/shipping-logistics/',
  '/investment-project-development/',
  '/about-us/leadership/',
  '/contact-us/',
];

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  const result = {};

  for (const slug of pages) {
    const url = `${BASE_URL}${slug}`;
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
      // Wait for images to appear (fallback delay)
      await new Promise(r => setTimeout(r, 2000));
      // Ensure at least one img is present before evaluating
      await page.waitForSelector('img', { timeout: 5000 }).catch(() => {});
      // Scroll to bottom to trigger lazy loaded images
      await page.evaluate(() => {
        window.scrollBy(0, document.body.scrollHeight);
      });
      await new Promise(r => setTimeout(r, 3000)); // wait for images to load
      const images = await page.evaluate(() => {
        const imgEls = Array.from(document.querySelectorAll('img'));
        return imgEls.map((img) => ({
          src: img.getAttribute('src') || img.getAttribute('data-src') || '',
          alt: img.getAttribute('alt') || ''
        }));
      });
      result[slug] = images;
      console.log(`Scraped ${images.length} images from ${slug}`);
    } catch (e) {
      console.error(`Error scraping ${url}:`, e);
      result[slug] = [];
    }
  }

  await browser.close();
  const outPath = path.resolve(process.cwd(), 'scraped_images.json');
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf-8');
  console.log('Scraping complete. Results saved to', outPath);
})();
