'use strict'

let utils = require('../../lib/commonUtils.js');
let genericUtils = require('../../lib/genericUtils.js');

class ViewCart {
	validate_item_price () {
		let locator = '//div[@class = \'item-price\']/span';
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
	};

	validate_item_title () {
		let locator = '//h3[contains(@class, \'item-title\')]//a/span/span';
		let el = element(by.xpath(locator));
		utils.waitForElement(el);
		return new Promise ((resolve, reject) => {
			el.isPresent().then((present) => {
				if (present) {
					resolve (el.getText());
				} else {
					reject (locator + ' is not present');
				}
			});
		}); 
	};

	validate_item_count () {
		let locator = '//h1[contains(text(), \'Shopping cart\')]';
		let el = element(by.xpath(locator));
		return new Promise ((resolve, reject) => {
			el.isPresent().then((present) => {
				if (present) {
					el.getText().then((text) => {
						resolve (text.split('(')[1].split(' ')[0]);
					});
				} else {
					reject (locator + ' is not present');
				}
			});
		}); 
	};

	click_btn_remove () {
		let locator = '//span[text() = \'Remove\']/../..';
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

	validate_item_removal () {
		let locator = '//span[contains(text(),\'was removed from your cart\')]';
		let el = element(by.xpath(locator));
		utils.waitForElement(el)
		return new Promise ((resolve, reject) => {
			el.isPresent().then((present) => {
				if (present) {
					resolve (true);
				} else {
					reject (locator + ' is not present');
				}
			});
		}); 
	};

	click_check_out () {
		let locator = '//button[text() = \'Go to checkout\']';
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

	click_continue_as_guest () {
		let locator = '//button[text() = \'Continue as guest\']';
		let el = element(by.xpath(locator));
		utils.waitForElement(el)
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

	select_item_quantity (value) {
		let locator = '//select[@class = \'listbox__control\']/../../../../..//div[contains(@class, \'grid__cell\')]//select/option[text() = \'' + value + '\']';
		let el = element(by.xpath(locator));
		utils.waitForElement(el);
		return new Promise ((resolve, reject) => {
			el.isPresent().then((present) => {
				if (present) {
					resolve (el.click())
				} else {
					reject (locator + ' is not present');
				}
			});
		});
	};

	get_item_total_price_checkout_area () {
		let locator = '//div[@data-test-id = \'ITEM_TOTAL\']/span/span/span';
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
	};

	get_item_price () {
		let locator = '//div[@class = \'item-price\']/span/span/span';
		return new Promise ((resolve, reject) => {
			element(by.xpath(locator)).isPresent().then((present) => {
				if (present) {
					element(by.xpath(locator)).getText().then((text) => {
						utils.wait(6000)
						resolve (genericUtils.getArray(text, '$')[1]);
					});
				} else {
					reject (locator + ' is not present');
				}
			});
		}); 
	};

	click_remove_all () {
		let locator = '//div[@class = \'cart-bucket\']/div/div//span[text() = \'Remove\']/../..';
		let row = 1;
		element.all (by.xpath(locator)).then((list) => {
			while (row <= list.length) {
				let el = element(by.xpath('//div[@class = \'cart-bucket\']/div/div[1]//span[text() = \'Remove\']/../..'));
				el.click();
				utils.wait(1000);
				row++;
			}
		});
	}
}

module.exports = new ViewCart();