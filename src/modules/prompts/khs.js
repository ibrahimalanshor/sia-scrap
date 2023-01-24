const inquirer = require('inquirer')

module.exports = async function login() {
    const type = inquirer.prompt([
        {
            name: 'name',
            message: 'Enter Type',
            type: 'list',
            choices: [
                {
                    name: 'All Semester',
                    value: 'all'
                },
                {
                    name: 'Current Semester',
                    value: 'current'
                }
            ],
            validate: function (value) {
                const done = this.async()
                
                if (!value) {
                    done('Type Invalid')

                    return false
                }
                
                done(null, true)
            },
        }
    ])

    return type
}