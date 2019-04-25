const commonConf = require('./karma-common.conf.js');

module.exports = function(config) {
  config.set(commonConf.get(config));
};
