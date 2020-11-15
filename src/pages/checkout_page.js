'use strict'

let utils = require('../../lib/commonUtils.js');

class CheckoutPage {
	validate_checkout_title () {
		let locator = '//h1[text() = \'Checkout\']';
		let el = element(by.xpath(locator));
		utils.waitForElement(el);
		return new Promise((resolve, reject) => {
			el.isPresent().then((present) => {
				if (present) {
					resolve (true);
				} else {
					reject (locator + ' is not present');
				}
			});
		});
	};

	get_item_total_count () {
		let locator = '//tr[@data-test-id = \'SUB_TOTAL\']/td[1]/span';
		let el = element(by.xpath(locator));
		utils.waitForElement(el);
		return new Promise ((resolve, reject) => {
			el.isPresent().then((present) => {
				if (present) {
					el.getText().then((text) => {
						resolve (text.split('(')[1].split(')')[0]);
					});
				} else {
					reject (locator + ' is not present');
				}
			});
		}); 
	};

	get_item_total_price () {
		let locator = '//tr[@data-test-id = \'SUB_TOTAL\']/td[@class = \'amount\']/span/span';
		let el = element(by.xpath(locator));
		return new Promise ((resolve, reject) => {
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
	};
}

module.exports = new CheckoutPage();