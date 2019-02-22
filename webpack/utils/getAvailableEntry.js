const processArgs = require('./processArgs');
const _ = require('underscore-contrib');
const path = require('path');

module.exports = (Modules) => {
  const resultEntries = {};
  const entries = processArgs.get('alpaca:webpack:entry') || {};
  hasModule = false;
  _.forEach(Modules, (Module) => {
    _.forEach(Object.keys(entries), (key) => {
      if (key === Module) {
        resultEntries[key] = entries[key];
        hasModule = true;
      }
    })
  })
  if (!hasModule) {
    console.log('Can not found the module,please check file alpaca.config.js');
    process.exit(1);
  }
  return resultEntries;
}