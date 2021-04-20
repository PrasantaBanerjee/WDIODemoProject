const Login = require("../pageobjects/login.js");
const Page = require("../pageobjects/page.js");
const Cart = require("../pageobjects/cart.js");
const LoginData = require("../test_data/login.data.js");

describe("When User enters Invalid Phone Number on Login page", () => {
    it("Should display an Error Message to the User", () => {
        //Launch Application.
        Page.maximizeBrowserWindow();

        //Click Sign-In link from top-header.
        Login.signInLink.click();
        browser.pause(1500);

        //Enter Invalid Phone Number.
        Login.emailTextbox.setValue(LoginData.invalidUser2);
        Login.continueBtn.click();
        browser.pause(1500);

        //Verify Error Message.
        expect(Login.incorrectPhoneNumberErrorMessage).toHaveTextContaining("Incorrect phone number");
    });
});

describe("When User enters Valid Phone Number but Invalid Password on Login page", () => {
    it("Should throw an Error Message to the User", () => {
        //Launch Application.
        Page.maximizeBrowserWindow();

        //Click Sign-In link from top-header.
        Login.signInLink.click();
        browser.pause(1500);

        //Enter Valid Phone Number.
        Login.emailTextbox.setValue(LoginData.invalidUser1);
        Login.continueBtn.click();
        browser.pause(1500);

        //Enter Invalid Phone Number.
        Login.passwordTextbox.setValue(LoginData.invalidPassword);
        Login.signInBtn.click();
        browser.pause(1500);

        //Verify Error Message.
        expect(Login.incorrectPasswordErrorMessage).toHaveTextContaining("To better protect your account, please re-enter your password and then enter the characters as they are shown in the image below");
    });
});

describe("When User enters Valid Username & Valid Password", () => {
    it("he successfully logs-in & Username is displayed on the top-header section.", () => {
        Page.maximizeBrowserWindow();

        Login.validLoginToApplication();
        expect(Cart.loggedInUsername).toHaveTextContaining("Hello, prasanta");
    });
});