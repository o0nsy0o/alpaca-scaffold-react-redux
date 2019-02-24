process.on('unhandledRejection', err => { throw err; });

process.env.NODE_ENV = 'production';

const fs = require('fs-extra');
const _ = require('lodash');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const gitRev = require('git-rev-sync');
const WebpackConfig = require('../config');
const inquirer = require('../utils/inquirer.js');
const paths = require('../config/paths.js');
const fileSizeReporter = require('fileSizeReporter');

const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024;
const measureFileSizesBeforeBuild = fileSizeReporter.measureFileSizesBeforeBuild;
const printFileSizesAfterBuild = fileSizeReporter.printFileSizesAfterBuild;

// const imageMinifier = require('venus-dev-utils/lib/imageMinifier.js');
// const formatWebpackMessages = require('venus-dev-utils/lib/formatWebpackMessages');
// const formatWebpackMessages = require('venus-dev-utils/lib/formatWebpackMessages');

measureFileSizesBeforeBuild(paths.appPublic);
