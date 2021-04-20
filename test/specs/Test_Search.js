const Search = require("../pageobjects/search.js");
const Page = require("../pageobjects/page.js");
const ProductData = require("../test_data/product.data.js");

describe("When User enters a Query in Search bar", () => {
    it("should display a list of Products with their names & prices", () => {
        //Launch Application.
        Page.maximizeBrowserWindow();

        //Enter Search Query in the Search bar & click on the Search icon.
        Search.searchTextbox.setValue(ProductData.searchQuery);
        Search.searchBtn.click();
        browser.pause(1500);

        //Iterate Product name list & print name of each.
        Search.productNameList.forEach(element => {
            console.log("PRODUCT NAME: " + element.getText());
        });

        //Iterate Product price list & print price of each.
        Search.productPriceList.forEach(element => {
            console.log("PRODUCT PRICE: " + element.getText());
        });

    });
});