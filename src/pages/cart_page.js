'use strict'

let utils = require('../../lib/commonUtils.js');

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
};

module.exports = new CartPage();