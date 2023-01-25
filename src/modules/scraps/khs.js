const { saveFile } = require('../../lib/fs');
const { parseTable } = require('../parser/table');

async function getAllKhs(page) {
  const allTable = await page.$$('.table-responsive');
  const khsTable = allTable[1];

  const result = await parseTable(page, khsTable);

  const filename = await saveFile(
    'khs-all-semester.json',
    JSON.stringify(result, null, 4)
  );

  console.log(`result saved: `, filename);
}

async function getCurrentKhs(page) {
  await page.goto('https://sia.uty.ac.id/std/khssmt', {
    waitUntil: 'load',
    timeout: 0,
  });

  const khsTable = await page.$('.table-responsive');

  const result = await parseTable(page, khsTable, { headerRowNum: 1 });

  const filename = await saveFile(
    'khs-current-semester.json',
    JSON.stringify(result, null, 4)
  );

  console.log(`result saved: `, filename);
}

module.exports = async function khs(page, type) {
  await page.goto('https://sia.uty.ac.id/std/khs', {
    waitUntil: 'load',
    timeout: 0,
  });

  switch (type) {
    case 'current':
      await getCurrentKhs(page);
      break;
    default:
      await getAllKhs(page);
      break;
  }
};
