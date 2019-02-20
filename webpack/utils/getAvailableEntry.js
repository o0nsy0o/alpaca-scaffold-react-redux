const processArgs = require('./processArgs');
const _ = require('underscore-contrib');
const path = require('path');

module.exports = (modules) => {
  const resultEntries = {};
  const entries = processArgs.get('alpaca:webpack:entry') || {};
  const Modules = JSON.parse(modules);
  _.forEach(Modules, (Module) => {
    _.forEach(Object.keys(entries), (key) => {
      if (key === Module) {
        resultEntries[key] = entries[key];
      }
    })
  })
  return resultEntries;
}