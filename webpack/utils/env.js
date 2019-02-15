const _ = require('lodash');
const processArgs = require('./processArgs.js');

/**
 * Indicates current process env is `production` or `development`
 */
exports.isProdEnv = () => {
  return processArgs.get('NODE_ENV') === 'production';
};

/**
 * Return short name of environment 'prod', 'dev'
 * 
 * @param {String} envName 'prod', 'production'
 */
exports.getEnvShortName = (envName) => {
  envName = envName || processArgs.get('NODE_ENV');
  return _.includes(['prod', 'production'], envName) ? 'prod' : 'dev';
};

