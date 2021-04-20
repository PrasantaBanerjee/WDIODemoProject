const testGroups = require("./testGroups.js");
const envData = require('./envs.js');
const Env = envData.test_region;
const Browser = envData.browser;
var threads = 1;
var setCapabilities = [];
var setService = [];


//Setting up Test Environment (as mentioned in envs.js file.)
if (Env !== 'DEV' && Env !== 'STG' && Env !== "PROD") {
    console.log("Invalid 'test_region' mentioned in envs.js -> " + Env);
    process.exit(1);
}
console.log("Environment is set to -> " + Env);


//Setting up Test URLs (as mentioned in envs.js file.)
url = process.env.ENV;
if (Env === 'DEV') {
    url = envData.dev_url;
} else if (Env === 'STG') {
    url = envData.stg_url;
} else if (Env === 'PROD') {
    url = envData.prod_url;
}
console.log("Test URL -> " + url);


//============================== Set browser capabilities here ==============================
const localCapabilities = [
    {
        //Chrome
        browserName: 'chrome',
        maxInstances: threads,
        acceptInsecureCerts: true,
        'goog:chromeOptions': {
            // args: ['--incognito']
            // args: ['--headless', '--disable-gpu'],
            prefs: {
                'directory_upgrade': true,
                'prompt_for_download': false,
                //'download.default_directory': downloadDir
            }
        }
    },
    {
        //Firefox
        browserName: 'firefox',
        maxInstances: threads,
        executablePath:'C:\\Program Files (x86)\\Mozilla Firefox\\firefox.exe',
    },
    {
        //Edge
        browserName: 'MicrosoftEdge',
        maxInstances: threads,
        'ms:edgeOptions': {
            args: ['--start-maximized'],
            prefs: {
                'directory_upgrade': true,
                'prompt_for_download': false,
                //'download.default_directory': downloadDir
            }
        }
    }
];

//Setting up Browser (as mentioned in envs.js file.)
if (Browser === 'Chrome') {
    setCapabilities.push(localCapabilities[0]);
    setService.push('chromedriver');
} else if (Browser === 'Firefox') {
    setCapabilities.push(localCapabilities[1]);
    setService.push('geckodriver');
} else if (Browser === 'Edge') {
    setCapabilities.push(localCapabilities[2]);
    setService.push('edgedriver');
} else {
    console.log("Invalid 'browser' mentioned in envs.js: " + Browser);
    process.exit(1);
}
console.log("Browser is set to -> " + envData.browser);


//======================================================================================


exports.config = {

    runner: 'local',

    suites: {
        smoke: testGroups.smoke,
        sanity: testGroups.sanity,
        regression: testGroups.regression
    },

    specs: [
        //'./test/specs/**/*.js'
    ],

    // Patterns to exclude.
    exclude: [
        //'path/to/excluded/files'
        //'./test/specs/**/Test_Cart.js'
    ],

    // =========================
    // Browser Capabilities
    // =========================
    maxInstances: threads,
    services: setService,
    capabilities: setCapabilities,

    // ===================
    // Test Configurations
    // ===================
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'info',

    // If you only want to run your tests until a specific amount of tests have failed use
    // bail (default is 0 - don't bail, run all tests).
    bail: 0,

    baseUrl: url,

    // Default timeout for all waitFor* commands.
    waitforTimeout: 10000,

    // Default timeout in milliseconds for request
    // if browser driver or grid doesn't send response
    connectionRetryTimeout: 120000,

    // Default request retries count
    connectionRetryCount: 3,

    // Test runner services
    // Services take over a specific job you don't want to take care of. They enhance
    // your test setup with almost no effort. Unlike plugins, they don't add new
    // commands. Instead, they hook themselves up into the test process.
    services: ['chromedriver'],

    // Framework you want to run your specs with.
    // The following are supported: Mocha, Jasmine, and Cucumber
    // see also: https://webdriver.io/docs/frameworks
    //
    // Make sure you have the wdio adapter package for the specific framework installed
    // before running any tests.
    framework: 'mocha',
    //
    // The number of times to retry the entire specfile when it fails as a whole
    // specFileRetries: 1,
    //
    // Delay in seconds between the spec file retry attempts
    // specFileRetriesDelay: 0,
    //
    // Whether or not retried specfiles should be retried immediately or deferred to the end of the queue
    // specFileRetriesDeferred: false,
    //
    // Test reporter for stdout.
    // The only one supported by default is 'dot'
    // see also: https://webdriver.io/docs/dot-reporter
    reporters: ['spec'],
    reporters: [
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: false,
            disableWebdriverScreenshotsReporting: false,
        }]
    ],

    //
    // Options to be passed to Mocha.
    // See the full list at http://mochajs.org/
    mochaOpts: {
        ui: 'bdd',
        timeout: 6000000
    },
    //
    // =====
    // Hooks
    // =====
    // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
    // it and to build services around it. You can either apply a single function or an array of
    // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
    // resolved to continue.
    /**
     * Gets executed once before all workers get launched.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */
    // onPrepare: function (config, capabilities) {
    // },
    /**
     * Gets executed before a worker process is spawned and can be used to initialise specific service
     * for that worker as well as modify runtime environments in an async fashion.
     * @param  {String} cid      capability id (e.g 0-0)
     * @param  {[type]} caps     object containing capabilities for session that will be spawn in the worker
     * @param  {[type]} specs    specs to be run in the worker process
     * @param  {[type]} args     object that will be merged with the main configuration once worker is initialised
     * @param  {[type]} execArgv list of string arguments passed to the worker process
     */
    // onWorkerStart: function (cid, caps, specs, args, execArgv) {
    // },
    /**
     * Gets executed just before initialising the webdriver session and test framework. It allows you
     * to manipulate configurations depending on the capability or spec.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
    // beforeSession: function (config, capabilities, specs) {
    // },
    /**
     * Gets executed before test execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs        List of spec file paths that are to be run
     * @param {Object}         browser      instance of created browser/device session
     */
    // before: function (capabilities, specs) {
    // },
    /**
     * Runs before a WebdriverIO command gets executed.
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     */
    // beforeCommand: function (commandName, args) {
    // },
    /**
     * Hook that gets executed before the suite starts
     * @param {Object} suite suite details
     */
    // beforeSuite: function (suite) {
    // },
    /**
     * Function to be executed before a test (in Mocha/Jasmine) starts.
     */
    // beforeTest: function (test, context) {
    // },
    /**
     * Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
     * beforeEach in Mocha)
     */
    // beforeHook: function (test, context) {
    // },
    /**
     * Hook that gets executed _after_ a hook within the suite starts (e.g. runs after calling
     * afterEach in Mocha)
     */
    // afterHook: function (test, context, { error, result, duration, passed, retries }) {
    // },
    /**
     * Function to be executed after a test (in Mocha/Jasmine).
     */
    // afterTest: function(test, context, { error, result, duration, passed, retries }) {
    // },


    /**
     * Hook that gets executed after the suite has ended
     * @param {Object} suite suite details
     */
    // afterSuite: function (suite) {
    // },
    /**
     * Runs after a WebdriverIO command gets executed
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     * @param {Number} result 0 - command success, 1 - command error
     * @param {Object} error error object if any
     */
    // afterCommand: function (commandName, args, result, error) {
    // },
    /**
     * Gets executed after all tests are done. You still have access to all global variables from
     * the test.
     * @param {Number} result 0 - test pass, 1 - test fail
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // after: function (result, capabilities, specs) {
    // },
    /**
     * Gets executed right after terminating the webdriver session.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // afterSession: function (config, capabilities, specs) {
    // },
    /**
     * Gets executed after all workers got shut down and the process is about to exit. An error
     * thrown in the onComplete hook will result in the test run failing.
     * @param {Object} exitCode 0 - success, 1 - fail
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {<Object>} results object containing test results
     */
    // onComplete: function(exitCode, config, capabilities, results) {
    // },
    /**
    * Gets executed when a refresh happens.
    * @param {String} oldSessionId session ID of the old session
    * @param {String} newSessionId session ID of the new session
    */
    //onReload: function(oldSessionId, newSessionId) {
    //}
}
