const inquirer = require('inquirer');

module.exports = async function login() {
  const credentials = await inquirer.prompt([
    {
      name: 'npm',
      message: 'Enter NPM',
      validate: function (value) {
        const done = this.async();

        if (!value) {
          done('NPM Invalid');

          return false;
        }

        done(null, true);
      },
    },
    {
      name: 'password',
      type: 'password',
      message: 'Enter Password',
      validate: function (value) {
        const done = this.async();

        if (!value) {
          done('Password Invalid');

          return false;
        }

        done(null, true);
      },
    },
  ]);

  return credentials;
};
