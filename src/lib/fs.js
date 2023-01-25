const fs = require('fs/promises')
const path = require('path')

exports.saveFile = async function (filename, data) {
    try {
        const filepath = path.resolve(__dirname, '../../res/', filename)

        await fs.writeFile(filepath, data)

        return filepath
    } catch (err) {
        throw new Error(`Error saving file ${filename}`)
    }
}