exports.parseTable = async function parseTable(page, table) {
    const ths = await table.$$('th')
    const columns = await Promise.all(ths.map(async th => await page.evaluate(el => el.textContent.trim(), th)))

    const trs = await table.$$('tbody tr')
    const data = await Promise.all(trs.map(async tr => {
        const res = {}
        const tds = await tr.$$('td')

        let i = 0;

        for (const column of columns) {
            res[column] = await page.evaluate(el => el.textContent.trim(), tds[i]) 
            i++
        }

        return res
    }))

    return data
}