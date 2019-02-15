const processArgs = require('./processArgs');
module.exports = (modules) => {
  const entries = processArgs.get('alpaca:webpack:entry') || {};

  _.forEach(modules, (module) => {
    let modulePattern = path.join(module.replace(/(\*)+$/ig, ''), '').replace(/^client/, '');
    modulePattern = ['./', path.join('client', modulePattern)].join('');
    _.forEach(entries, (value, key) => {
      if (value[0].startsWith(modulePattern)) {
        // allow query parameters
        // For old android device (4.2+) we need to load the polyfills;
        newEntries[keepQuery ? key : key.split('?')[0]] = ['polyfills'].concat(value);
      }
    });
  })
}