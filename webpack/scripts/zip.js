const processArgs = require('../config/processArgs.js');
const paths = require('../config/paths.js');
const _ = require('lodash');
const fs = require('fs');
const yazl = require('yazl');
const { walk } = require('alpaca-dev-utils/lib/file');
const { confirmAvailableModules } = require('../utils/confirmAvailableModules');
const path = require('path');
const chalk = require('chalk');

(async () => {
  const answer = await confirmAvailableModules();

  if (!answer.availableModulesOk) return;

  const zipfile = new yazl.ZipFile();

  const packagesPath = path.join(paths.appPublic, 'packages');

  let hasZipFiles = false;

  const modules = Object.keys(answer.availableModules);

  _.forEach(modules, async (value) => {
    const allFiles = await walk(path.join(paths.appPublic, value));
    allFiles.forEach((absFilePath) => {
      if (!/^\./.test(path.basename(absFilePath))) {
        let metaPath = path.relative(path.join(process.cwd(), 'public'), absFilePath);
        console.log(
          chalk.magenta(` * ${metaPath}`)
        );
        hasZipFiles = true;
        zipfile.addFile(absFilePath, metaPath);
      }
    })
  })

  if (!hasZipFiles) {
    return console.log(
      chalk.red(`\n*====No zip files found====*\n`)
    );
  }

  if (!fs.existsSync(packagesPath)) {
    fs.mkdirSync(packagesPath);
  }

  zipfile.outputStream.pipe(
    fs.createWriteStream(path.join(packages, zipFileName))
  ).on("close", () => {
    console.log(
      `\nZip file [${chalk.cyan(zipFileName)}] modules successfully.\n`
    );
  });

  zipfile.end();
})()