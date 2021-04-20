const Page = require("../pageobjects/page.js");

describe('Validate URL', () => {
    it('on page load', () => {
        Page.maximizeBrowserWindow();
        console.log(browser.getUrl());
    });
});