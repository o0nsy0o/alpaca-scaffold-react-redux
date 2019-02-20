const path = require('path');
const fs = require('fs');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  appCwd: resolveApp(''),
  appPublic: resolveApp('public'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appServer: resolveApp('server'),
  appNodeModules: resolveApp('node_modules'),
  appAlpacaConfig: resolveApp('alpaca.config.js'),
};
