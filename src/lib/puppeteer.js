const puppeteer = require('puppeteer-core')
const config = require('../../config')

exports.createApp = async function createPuppeteer() {
    const browser = await puppeteer.launch({
        executablePath: config.chromePath,
        headless: config.headless
    })
    const page = await browser.newPage()

    await page.goto(config.url)

    return { page, browser }
}