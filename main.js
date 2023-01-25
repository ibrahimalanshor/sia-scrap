const { createApp } = require('./src/lib/puppeteer');
const loginPrompt = require('./src/modules/prompts/login');
const modulePrompt = require('./src/modules/prompts/module');
const loginScrap = require('./src/modules/scraps/login');
const flows = require('./src/flows');

loginPrompt().then(async (answers) => {
  const { page, browser } = await createApp();

  await loginScrap(page, answers);

  const selectedModule = await modulePrompt();

  await flows[selectedModule.name](page);

  browser.close();
  process.exit(0);
});
