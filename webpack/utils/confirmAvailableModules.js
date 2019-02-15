const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const inquirer = require('inquirer');
const jclrz = require('json-colorz');
const parseModules = require('venus-dev-utils/lib/parseModules.js');
const WebpackConfig = require('../config');
const processArgs = require('../config/processArgs.js');

// public built folders.
const virtualProjectName = processArgs.get('venus:projectVirtualPath');
const publishBuiltFolders = parseModules(
  processArgs.get('VENUS_PUBLISH_BUILT_FOLDERS')
);

exports.confirmAvailableModules = (callback) => {
  let availableModules = new WebpackConfig().getAvailableEntries();
  console.log(availableModules);
  publishBuiltFolders.forEach((folder) => {
    let builtFolder = path.join(virtualProjectName, folder);
    if (fs.existsSync(path.join('public', builtFolder))) {
      availableModules[builtFolder] = [chalk.magenta.bold('Publishing customized built folders')];
    } else {
      console.log(
        chalk.red(`\n* [${chalk.cyan('builtFolders')}] ${builtFolder} can't be found`)
      )
    }
  });

  if (!Object.keys(availableModules).length) {
    console.log(
      chalk.cyan.bold('No available modules here, please check `--modules`!')
    )
    return;
  }

  jclrz(availableModules);

  return inquirer.prompt([{
    type: 'confirm',
    name: 'availableModulesOk',
    message: 'Please confirm above modules you could like?'
  }]).then((answer) => {
    let availableModulesOk = answer.availableModulesOk;

    callback({
      availableModulesOk: availableModulesOk,
      moduleEntryKeys: Object.keys(availableModules)
    });

  });
}