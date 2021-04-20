const Login = require("../pageobjects/login.js");
const Page = require("../pageobjects/page.js");
const Cart = require("../pageobjects/cart.js");
const Search = require("../pageobjects/search.js");
const ProductData = require("../test_data/product.data");

describe("When User enters a Query in Search bar & clicks on Add to Cart option", () => {
    it("the product should be added to the Cart.", () => {
        Page.maximizeBrowserWindow();
        
        //Login to the app.
        Login.validLoginToApplication();

        //Enter Search Query in the Search bar & click on the Search icon.
        Search.searchTextbox.setValue(ProductData.productName);
        Search.searchBtn.click();
        browser.pause(1500);

        //Click on the first product.
        Cart.firstProduct.click();
        browser.pause(1500);

        //Switch to new tab.
        var parentUrl = browser.getUrl();
        var prodLink = Cart.firstProduct.getAttribute("href");
        browser.switchWindow(prodLink);
        browser.pause(1500);

        //Click Add to Cart Button.
        Cart.addToCartBtn.click();
        Cart.successMessage.waitForDisplayed({ timeout: 10000 });

        //Verify if product is successfully added to cart.
        console.log("Status: " + Cart.successMessage.getText());
        browser.pause(1500);

        //Close current tab & switch back to parent tab.
        browser.closeWindow();
        browser.switchWindow(parentUrl);

    });
});