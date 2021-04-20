const Env = require('C:\\Users\\Prasamta Banerjee\\Documents\\JSAutomation\\AmazonWDIO\\envs.js');

class Page {

        //Browser actions.
        maximizeBrowserWindow() {
                if (Env.browser === 'Chrome') {
                        browser.maximizeWindow();
                }
                return browser.url("/");
        };
}

module.exports = new Page();