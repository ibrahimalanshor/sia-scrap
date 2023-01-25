const inquirer = require('inquirer');

module.exports = async function login() {
  const selectedModule = inquirer.prompt([
    {
      name: 'name',
      message: 'Select Module',
      type: 'list',
      choices: [
        {
          name: 'KHS',
          value: 'khs',
        },
      ],
      validate: function (value) {
        const done = this.async();

        if (!value) {
          done('Module Invalid');

          return false;
        }

        done(null, true);
      },
    },
  ]);

  return selectedModule;
};
