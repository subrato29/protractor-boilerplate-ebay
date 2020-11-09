'use strict'

let utils = require('../../lib/commonUtils.js');
let genericUtils = require('../../lib/genericUtils.js');

class CartPage {
	validate_shopping_cart_text() {
		let locator = '//h1[text() = \'Shopping cart\']';
		return new Promise((resolve, reject) => {
			element(by.xpath(locator)).isPresent().then((present) => {
				if (present) {
					resolve (true);
				} else {
					reject (locator + ' is not present');
				}
			});
		});
	};

	validate_shopping_cart_with_no_item() {
		let locator = '//a[@title = \'Your shopping cart\']';
		return new Promise((resolve, reject) => {
			element(by.xpath(locator)).isPresent().then((present) => {
				if (present) {
					resolve (true);
				} else {
					reject (locator + ' is not present');
				}
			});
		});
	};

	validate_no_item_text() {
		let locator = '//span[contains(text(), "don\'t have any items in your cart")]';
		return new Promise((resolve, reject) => {
			element(by.xpath(locator)).isPresent().then((present) => {
				if (present) {
					resolve (true);
				} else {
					reject (locator + ' is not present');
				}
			});
		});
	};

	validate_item_title () {
		let locator = '//h1[@id = \'itemTitle\']';
		return new Promise ((resolve, reject) => {
			element(by.xpath(locator)).isPresent().then((present) => {
				if (present) {
					resolve (element(by.xpath(locator)).getText());
				} else {
					reject (locator + ' is not present');
				}
			});
		}); 
	}

	validate_item_price () {
		let locator = '//span[@itemprop = \'price\']';
		return new Promise ((resolve, reject) => {
			element(by.xpath(locator)).isPresent().then((present) => {
				if (present) {
					element(by.xpath(locator)).getText().then((text) => {
						resolve (genericUtils.getArray(text, '$')[1]);
					});
				} else {
					reject (locator + ' is not present');
				}
			});
		}); 
	}

	set_quantity (value) {
		if (value != 1) {
			let locator = '//label[contains(text(), \'Quantity\')]/../..//input';
			return new Promise ((resolve, reject) => {
				let el = element(by.xpath(locator));
				el.isPresent().then((present) => {
					if (present) {
						el.clear().then(() => {
							resolve (el.sendKeys(value));
						})
					} else {
						reject (locator + ' is not present');
					}
				});
			}); 
		}
	}

	click_add_to_cart () {
		let locator = '//a[contains(text(), \'Add to cart\')]';
		return new Promise ((resolve, reject) => {
			element(by.xpath(locator)).isPresent().then((present) => {
				if (present) {
					resolve (element(by.xpath(locator)).click());
				} else {
					reject (locator + ' is not present');
				}
			});
		});
	};

	click_no_thanks () {
		let locator = '//button[text() = \'No thanks\']';
		return new Promise ((resolve, reject) => {
			element(by.xpath(locator)).isPresent().then((present) => {
				if (present) {
					resolve (element(by.xpath(locator)).click());
				} else {
					reject (locator + ' is not present');
				}
			});
		});
	};
};

module.exports = new CartPage();