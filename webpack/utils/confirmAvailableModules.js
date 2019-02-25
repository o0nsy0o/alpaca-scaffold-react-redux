const chalk = require('chalk');
const inquirer = require("inquirer-promise");
const jclrz = require('json-colorz');
const getAvailableEntries = require('./getAvailableEntries');

exports.confirmAvailableModules = async () => {
  let availableModules = getAvailableEntries();

  if (!Object.keys(availableModules).length) {
    console.log(chalk.cyan.bold('No available modules here, please check `-m`!'))
    return;
  }

  jclrz(availableModules);

  const answer = await inquirer.prompt([{
    type: 'confirm',
    name: 'availableModulesOk',
    message: 'Please confirm above modules you could like?'
  }])

  return { availableModulesOk: answer.availableModulesOk, availableModules };
}