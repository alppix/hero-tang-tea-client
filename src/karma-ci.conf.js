const commonConf = require('./karma-common.conf.js');

module.exports = function(config) {
  const conf = commonConf.get(config);

  config.set({
    ...conf,
    plugins: [...conf.plugins, require('karma-junit-reporter')],
    reporters: [...conf.reporters, 'junit'],
    junitReporter: {
      outputDir: '../test_results/karma', // results will be saved as $outputDir/$browserName.xml
      outputFile: undefined, // if included, results will be saved as $outputDir/$browserName/$outputFile
      suite: '', // suite will become the package name attribute in xml testsuite element
      useBrowserName: true, // add browser name to report and classes names
      nameFormatter: undefined, // function (browser, result) to customize the name attribute in xml testcase element
      classNameFormatter: undefined, // function (browser, result) to customize the classname attribute in xml testcase element
      properties: {}, // key value pair of properties to add to the <properties> section of the report
      xmlVersion: null // use '1' if reporting to be per SonarQube 6.2 XML format
    }
  });
};
