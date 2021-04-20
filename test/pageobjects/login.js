const LoginData = require("../test_data/login.data.js");

class Login {

    //Locators.
    get signInLink() {
        return $("//span[@id='nav-link-accountList-nav-line-1']");
    };

    get emailTextbox() {
        return $("//input[@type='email']");
    };

    get passwordTextbox() {
        return $("//input[@type='password']");
    };

    get continueBtn() {
        return $("//input[@id='continue']");
    };

    get signInBtn() {
        return $("//input[@id='signInSubmit']");
    };

    get incorrectPhoneNumberErrorMessage() {
        return $("//div[@class='a-box-inner a-alert-container']//h4");
    };

    get incorrectPasswordErrorMessage() {
        return $("//ul[@class='a-unordered-list a-nostyle a-vertical a-spacing-none']//li//span");
    };

    //Page actions.
    validLoginToApplication() {
        this.signInLink.click();
        browser.pause(1500);

        this.emailTextbox.setValue(LoginData.validUsername);
        this.continueBtn.click();
        browser.pause(1500);

        this.passwordTextbox.setValue(LoginData.validPassword);
        this.signInBtn.click();
        browser.pause(1500);
    };
}

module.exports = new Login();