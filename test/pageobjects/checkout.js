class Checkout {

    //Locators.
    get cartListLink() {
        return $("//div[@id='nav-cart-count-container']");
    };

    get cartCheckbox() {
        return $("(//div[starts-with(@class,'a-fixed-left-grid-col a-float-left')]//i[@class='a-icon a-icon-checkbox'])[1]");
    };

    //Page actions.
    checkIfSelected() {
        if (this.cartCheckbox.isSelected() === true) {
            console.log("Product Item is checked.");
        } else {
            console.log("Product Item is not checked.");
        }
    };
};

module.exports = new Checkout();