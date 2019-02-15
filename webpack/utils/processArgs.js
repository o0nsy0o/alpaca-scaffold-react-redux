const nconf = require('nconf');
const path = require('path');
const paths = require('../config/paths.js');

nconf.argv().env()
  .file({
    file: path.join(__dirname, 'environment.json')
  })
  .merge({ venus: require(paths.appVenusConfig) });

module.exports = nconf;
