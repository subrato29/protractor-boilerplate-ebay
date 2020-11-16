'use strict'

let utils = require('../../lib/commonUtils.js');
let genericUtils = require('../../lib/genericUtils.js');

class ProductDetailsPage {
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
		utils.waitForElement(element(by.xpath(locator)));
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
			let locator = '//div[contains(@class, \'lable quantity\')]/label[contains(text(), \'Quantity\')]/../..//input';
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
		let el = element(by.xpath(locator));
		utils.waitForElement(el);
		return new Promise ((resolve, reject) => {
			el.isPresent().then((present) => {
				if (present) {
					resolve (el.click());
				} else {
					reject (locator + ' is not present');
				}
			});
		});
	};

	select_color (value) {
		let locator = '//select[@name = \'Color\']/option[text() = \'' + value + '\']';
		let el = element(by.xpath(locator));
		return new Promise ((resolve, reject) => {
			el.isPresent().then((present) => {
				if (present) {
					resolve (el.click());
				} else {
					reject (locator + ' is not present');
				}
			});
		});
	};

	click_go_to_cart () {
		let locator = '//span[text() = \'Go to cart\']/../..';
		let el = element(by.xpath(locator));
		utils.waitForElement(el);
		return new Promise ((resolve, reject) => {
			el.isPresent().then((present) => {
				if (present) {
					resolve (el.click());
				} else {
					reject (locator + ' is not present');
				}
			});
		});
	}

	get_total_cart_items() {
		let locator = '//h1[contains(text(), \'Shopping cart\')]';
		let el = element(by.xpath(locator));
		return new Promise((resolve, reject) => {
			el.isPresent().then((present) => {
				if (present) {
					el.getText().then((text) => {
						resolve ((text.split('(')[1]).split(' ')[0]);
					});
				} else {
					reject (locator + ' is not present');
				}
			});
		});
	}

	get_total_price () {
		let locator = '//div[@ data-test-id = \'ITEM_TOTAL\']/span/span/span';
		let el = element(by.xpath(locator));
		return new Promise((resolve, reject) => {
			el.isPresent().then((present) => {
				if (present) {
					el.getText().then((text) => {
						resolve (text.split('$')[1]);
					});
				} else {
					reject (locator + ' is not present');
				}
			});
		});
	}
};

module.exports = new ProductDetailsPage();