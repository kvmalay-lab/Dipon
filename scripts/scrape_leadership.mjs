import puppeteer from 'puppeteer';
import fs from 'fs';

async function run() {
  console.log("Launching browser...");
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  try {
    console.log("Navigating to leadership page...");
    await page.goto('https://www.dipongroup.com/about-us/leadership/', { waitUntil: 'networkidle2', timeout: 60000 });
    
    console.log("Scrolling page to trigger lazy load...");
    // Scroll down gradually
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 100;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 100);
      });
    });

    console.log("Waiting a bit...");
    await new Promise(r => setTimeout(r, 3000));

    console.log("Extracting images with lazy attributes...");
    const data = await page.evaluate(() => {
      const results = [];
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        results.push({
          src: img.src,
          lazySrc: img.getAttribute('data-lazy-src') || img.getAttribute('data-src') || img.getAttribute('lazy-src'),
          alt: img.alt,
          class: img.className,
          parentClass: img.parentElement ? img.parentElement.className : ''
        });
      });
      return results;
    });

    console.log(`Found ${data.length} images.`);
    fs.writeFileSync('scraped_leadership_images_lazy.json', JSON.stringify(data, null, 2));
    console.log("Scraped data saved to scraped_leadership_images_lazy.json");
  } catch (error) {
    console.error("Error scraping:", error);
  } finally {
    await browser.close();
  }
}

run();
