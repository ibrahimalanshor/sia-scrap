const { saveFile } = require('../../lib/fs')
const { parseTable } = require('../parser/table')

async function getAllKhs(page) {
    const allTable = await page.$$('.table-responsive')
    const khsTable = allTable[1]

    const result = await parseTable(page, khsTable)

    const filename = await saveFile('khs-all-semester.json', JSON.stringify(result, null, 4))

    console.log(`result saved: `, filename)
}

module.exports = async function khs(page, type) {
    await page.goto('https://sia.uty.ac.id/std/khs', {
        waitUntil: 'load',
        timeout: 0
    })
    
    await getAllKhs(page)
}