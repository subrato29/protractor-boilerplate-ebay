var { SpecReporter } = require('jasmine-spec-reporter');
var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');
var jasmineReporters = require('jasmine-reporters');

var reportsDirectory = './results';
var dashboardReportDirectory = reportsDirectory + '/dashboardReport';
var detailsReportDirectory = reportsDirectory + '/detailReport';

var specSuite = require('./config/groups.js');

var ScreenshotAndStackReporter = new HtmlScreenshotReporter({
  dest: detailsReportDirectory,
  filename: 'detail_report.html',
  reportTitle: "Boilerplate Test Execution Report",
  showSummary: true,
  reportOnlyFailedSpecs: false,
  captureOnlyFailedSpecs: true,
});

exports.config = {
  directConnect: true,
  suites: [
    specSuite.configure.smoke.specs,
    specSuite.configure.regression.specs
  ],

  beforeLaunch: function () {
    return new Promise(function (resolve) {
      ScreenshotAndStackReporter.beforeLaunch(resolve);
    });
  },

  onPrepare: function () {
    // xml report generated for dashboard
    jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
      consolidateAll: true,
      savePath: reportsDirectory + '/xml',
      filePrefix: 'xmlOutput'
    }));

    //Test Summary report creation
    jasmine.getEnv().addReporter(ScreenshotAndStackReporter);

    var fs = require('fs-extra');
    if (!fs.existsSync(dashboardReportDirectory)) {
      fs.mkdirSync(dashboardReportDirectory);
    }

    jasmine.getEnv().addReporter({
      specDone: function (result) {
        if (result.status == 'failed') {
          browser.getCapabilities().then(function (caps) {
            var browserName = caps.get('browserName');
            browser.takeScreenshot().then(function (png) {
              var stream = fs.createWriteStream(dashboardReportDirectory + '/' + browserName + '-' + result.fullName + '.png');
              stream.write(new Buffer(png, 'base64'));
              stream.end();
            });
          });
        }
      }
    });

    //console logs configurations
    jasmine.getEnv().addReporter(new SpecReporter({
      displayStacktrace: 'all', 
      displaySuccessesSummary: false,
      displayFailuresSummary: true,
      displayPendingSummary: true, 
      displaySuccessfulSpec: true,
      displayFailedSpec: true,
      displayPendingSpec: false,
      displaySpecDuration: true,
      displaySuiteNumber: true,
      colors: {
        success: 'green',
        failure: 'red',
        pending: 'yellow'
      },
      prefixes: {
        success: '✓ ',
        failure: '✗ ',
        pending: '* '
      },
      customProcessors: []
    }));

  },

  onComplete: function () {
    var browserName, browserVersion;
    var capsPromise = browser.getCapabilities();

    capsPromise.then(function (caps) {
      browserName = caps.get('browserName');
      browserVersion = caps.get('version');
      platform = caps.get('platform');
      var HTMLReport = require('protractor-html-reporter-2');
      testConfig = {
        reportTitle: 'Boilerplate Test Execution Report',
        outputPath: dashboardReportDirectory,
        outputFilename: 'dashboard_report',
        screenshotPath: './',
        testBrowser: browserName,
        browserVersion: browserVersion,
        modifiedSuiteName: false,
        screenshotsOnlyOnFailure: true,
        testPlatform: platform
      };
      new HTMLReport().from(reportsDirectory + '/xml/xmlOutput.xml', testConfig);
    });
  },

  afterLaunch: function (exitCode) {
    return new Promise(function (resolve) {
      ScreenshotAndStackReporter.afterLaunch(resolve.bind(this, exitCode));
    });
  },
};
