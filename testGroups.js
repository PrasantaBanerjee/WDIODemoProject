module.exports = {
    smoke: [
        //"./test/specs/Test_Login.js"
        "./test/specs/Test_URL.js"
    ],
    sanity: [
        "./test/specs/Test_Cart.js",
        "./test/specs/Test_Checkout.js"
    ],
    regression: [
        "./test/specs/*.js",
    ]
}