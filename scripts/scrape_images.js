const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

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
  const result = {};

  for (const slug of pages) {
    const url = `${BASE_URL}${slug}`;
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
      // Wait for images to load
      await page.waitForTimeout(2000);
      const images = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('img'));
        return imgs.map(img => ({ src: img.src, alt: img.alt || '' }));
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
