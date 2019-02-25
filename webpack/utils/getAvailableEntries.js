const processArgs = require('../config/processArgs');
const _ = require('underscore-contrib');

module.exports = () => {
  const Modules = JSON.parse(processArgs.get('AlPACA_MODULES'));
  const resultEntries = {};
  const entries = processArgs.get('alpaca:webpack:entry') || {};
  _.forEach(Modules, (Module) => {
    _.forEach(Object.keys(entries), (key) => {
      if (key === Module) {
        resultEntries[key] = entries[key];
      }
    })
  })
  return resultEntries;
}