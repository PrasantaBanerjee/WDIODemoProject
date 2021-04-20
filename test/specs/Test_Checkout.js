const Checkout = require("../pageobjects/checkout.js");
const Page = require("../pageobjects/page.js");
const Login = require("../pageobjects/login.js");

describe("When User clicks on the Radio button for any item in the Cart List", () => {

    beforeEach("Loading", () => {
        console.log("STARTING");
    });

    it("should check/uncheck the item from the Cart List.", () => {
        Page.maximizeBrowserWindow();
        Login.validLoginToApplication();

        Checkout.cartListLink.click();
        browser.pause(3000);

        Checkout.checkIfSelected();

        Checkout.cartCheckbox.click();
        browser.pause(3000);
        console.log("Clicked on Radio button.");

        Checkout.checkIfSelected();
    });

    afterEach("Ending", () => {
        console.log("ENDED");
    });

});