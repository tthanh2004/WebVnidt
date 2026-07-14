const puppeteer = require('puppeteer-core');
const fs = require('fs');

async function main() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  
  page.on('console', msg => {
    console.log(`[BROWSER CONSOLE ${msg.type().toUpperCase()}]:`, msg.text());
  });

  page.on('pageerror', err => {
    console.error('[BROWSER EXCEPTION]:', err.message);
  });

  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

  console.log('Taking screenshot...');
  await page.screenshot({ path: 'D:\\VNIDT\\VNIDT\\screenshot_captured.png' });

  console.log('Checking DOM elements...');
  
  const projectsHtml = await page.evaluate(() => {
    const el = document.getElementById('projects-grid');
    return el ? el.innerHTML.trim() : 'NOT FOUND';
  });
  console.log('=== PROJECTS GRID INNER HTML ===');
  console.log(projectsHtml);

  const newsHtml = await page.evaluate(() => {
    const el = document.getElementById('news-grid');
    return el ? el.innerHTML.trim() : 'NOT FOUND';
  });
  console.log('\n=== NEWS GRID INNER HTML ===');
  console.log(newsHtml);

  const bodyStyles = await page.evaluate(() => {
    const loader = document.getElementById('loader');
    const hero = document.getElementById('home');
    return {
      loaderClass: loader ? loader.className : 'NONE',
      loaderDisplay: loader ? window.getComputedStyle(loader).display : 'NONE',
      loaderOpacity: loader ? window.getComputedStyle(loader).opacity : 'NONE',
      heroDisplay: hero ? window.getComputedStyle(hero).display : 'NONE',
      heroOpacity: hero ? window.getComputedStyle(hero).opacity : 'NONE'
    };
  });
  console.log('\n=== LOADER & HERO STYLES ===');
  console.log(bodyStyles);

  await browser.close();
  console.log('Finished.');
}

main().catch(console.error);
