class Cart {

    //Locators.
    get loggedInUsername() {
        return $("//span[@id='nav-link-accountList-nav-line-1']");
    };

    get firstProduct() {
        return $("(//span[@class='a-size-medium a-color-base a-text-normal'])[1]/parent::a");
    };

    get addToCartBtn() {
        return $("//input[@id='add-to-cart-button']");
    };

    get successMessage() {
        return $("(//div[@class='a-scroller attach-accessory-section a-scroller-vertical']//div//div//div//h4[@class='a-alert-heading'])[3]");
    };
}

module.exports = new Cart();