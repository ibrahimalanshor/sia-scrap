async function getAllKhs(page) {
    const allTable = await page.$$('.table-responsive')
    const khsTable = allTable[1]

    const headersTh = await khsTable.$$('th')
    const columns = await Promise.all(headersTh.map(async headerTh => await page.evaluate(el => el.textContent.trim(), headerTh)))

    const rowsTr = await khsTable.$$('tbody tr')
    const rows = await Promise.all(rowsTr.map(async rowTr => {
        const res = {}
        const rowTds = await rowTr.$$('td')

        columns.forEach(async (column, index) => {
            res[column] = await page.evaluate(el => el.textContent.trim(), rowTds[index])
        })

        return res
    }))

    console.log(rows)
}

module.exports = async function khs(page, type) {
    await page.goto('https://sia.uty.ac.id/std/khs', {
        waitUntil: 'load',
        timeout: 0
    })
    
    await getAllKhs(page)
}