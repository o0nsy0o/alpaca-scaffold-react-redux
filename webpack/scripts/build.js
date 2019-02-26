process.on('unhandledRejection', err => { throw err; });

process.env.NODE_ENV = 'production';

const fs = require('fs-extra');
const _ = require('lodash');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const gitRev = require('git-rev-sync');
const config = require('../config/webpack.dev.conf');
const inquirer = require('../utils/inquirer.js');
const paths = require('../config/paths.js');
const fileSizeReporter = require('fileSizeReporter');
const { confirmAvailableModules } = require('../utils/confirmAvailableModules');

const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024;
const measureFileSizesBeforeBuild = fileSizeReporter.measureFileSizesBeforeBuild;
const printFileSizesAfterBuild = fileSizeReporter.printFileSizesAfterBuild;

const imageMinifier = require('alpaca-dev-utils/lib/imageMinifier.js');
const formatWebpackMessages = require('alpaca-dev-utils/lib/formatWebpackMessages');

(async () => {
  const answer = await confirmAvailableModules();
  if (!answer.availableModulesOk) return;
  const previousFileSizes = await measureFileSizesBeforeBuild(paths.appPublic);

  _.forEach(answer.moduleEntryKeys, (entryKey) => {
    console.log(chalk.black.bold(`Clean folder "${chalk.cyan(entryKey)}"`));
    fs.emptyDirSync(path.join(paths.appPublic, entryKey));
  })

  const { stats, previousFileSizes, warnings } = await build(previousFileSizes);
  if (warnings.length) {
    console.log(chalk.yellow('Compiled with warnings.\n'));
    console.log(warnings.join('\n\n'));
    console.log(
      '\nSearch for the ' +
      chalk.underline(chalk.yellow('keywords')) +
      ' to learn more about each warning.'
    );
    console.log(
      'To ignore, add ' +
      chalk.cyan('// eslint-disable-next-line') +
      ' to the line before.\n'
    );
  } else {
    console.log(chalk.green('Compiled successfully.\n'));
  }
  console.log('File sizes after gzip:\n');

  await imageMinifier(stats, paths.appPublic);
  printFileSizesAfterBuild(
    stats,
    previousFileSizes,
    paths.appPublic,
    WARN_AFTER_BUNDLE_GZIP_SIZE,
    WARN_AFTER_CHUNK_GZIP_SIZE
  );
})


// Create the production build and print the deployment instructions.
const build = async (previousFileSizes) => {
  console.log('Creating an optimized production build...');
  let compiler = webpack(config);

  build();

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) { return reject(err); }
      const messages = formatWebpackMessages(stats.toJson({}, true));
      if (messages.errors.length) {
        if (messages.errors.length > 1) {
          messages.errors.length = 1;
        }
        return reject(new Error(messages.errors.join('\n\n')));
      }
      if (
        process.env.CI &&
        (typeof process.env.CI !== 'string' ||
          process.env.CI.toLowerCase() !== 'false') &&
        messages.warnings.length
      ) {
        console.log(
          chalk.yellow(
            '\nTreating warnings as errors because process.env.CI = true.\n' +
            'Most CI servers set it automatically.\n'
          )
        );
        return reject(new Error(messages.warnings.join('\n\n')));
      }
      return resolve({ stats, previousFileSizes, warnings: messages.warnings, });
    });
  });
}
