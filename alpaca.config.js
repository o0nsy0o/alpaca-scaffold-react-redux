const path = require('path');
const projectVirtualPath = 'projectVirtualPath';
module.exports = {
  scaffoldType: 'react',

  projectVirtualPath: projectVirtualPath,

  enableBundleHashName: true,

  version: Date.now(),

  getZipFileName: () => {
    let hoursDay = require('dateformat')(Date.now(), 'yyyy_mm_dd_HH_MM');
    return `mkt_activities_inferno_v2__${hoursDay}.zip`;
  },

  webpack: {
    entry: { ['module1']: './src/module1' },
    output: { publicPath: '/' },
    urlLoaderQuery: { limit: 5000 }
  }
};
