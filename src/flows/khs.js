const khsPromts = require('../modules/prompts/khs')
const khsScrap = require('../modules/scraps/khs')

module.exports = async function khs(page)  {
    const type = await khsPromts()
    
    await khsScrap(page, type.name)
}