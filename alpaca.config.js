const projectVirtualPath = 'projectVirtualPath';
module.exports = {
  scaffoldType: 'react',

  projectVirtualPath: projectVirtualPath,

  // If true will received `public/inferno/demo/button/bundle229503e9d2e481b9223c.js`
  // If false will received `public/inferno/demo/button/bundle.js`
  enableBundleHashName: true,

  // The version 
  version: Date.now(),

  // The name of zip packages
  getZipFileName: () => {
    let hoursDay = require('dateformat')(Date.now(), 'yyyy_mm_dd_HH_MM');
    return `mkt_activities_inferno_v2__${hoursDay}.zip`;
  },

  // set to `null` won't initialize sentry.
  webpack: {
    entry: {
      [`${projectVirtualPath}/app/201804/sharePlusProfit`]: ["./client/app/201804/sharePlusProfit/index.tsx"],
    },
    output: {
      // Config CDN path for static files, images ....
      publicPath: '/'
    },
    urlLoaderQuery: {
      limit: 5000
    }
  }
};
