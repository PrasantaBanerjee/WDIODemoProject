class Search {

    //Locators.
    get searchTextbox(){
        return $("//div[@class='nav-search-field ']//input");
    };

    get searchBtn(){
        return $("//input[@id='nav-search-submit-button']");
    };

    get productNameList(){
        return $$("//span[@class='a-size-medium a-color-base a-text-normal']");
    };

    get productPriceList(){
        return $$("//span[@class='a-price-whole']");
    };
}

module.exports = new Search();