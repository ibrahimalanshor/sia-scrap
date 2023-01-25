const puppeteer = require('puppeteer-core');
const config = require('../../config');

exports.createApp = async function createPuppeteer(option) {
  const browser = await puppeteer.launch({
    executablePath: config.chromePath,
    headless: config.headless,
    ...option,
  });
  const page = await browser.newPage();

  await page.goto(config.url);

  return { page, browser };
};
