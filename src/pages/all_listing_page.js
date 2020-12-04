'use strict'

let utils = require('../../lib/commonUtils.js');

class All_Listing_Page {
	set_price_from (price) {
		let locator = '//h3[text() = \'Price\']/../..//div[1]/div[contains(@class, \'textrange\')]//input';
		let el = element(by.xpath(locator));
		return new Promise ((resolve, reject) => {
			el.isPresent().then((present) => {
				if (present) {
					resolve (el.sendKeys (price));
				} else {
					reject (locator + ' is not displayed ' + url);
				}
			})
		})
	};

	set_price_to (price) {
		let locator = '//h3[text() = \'Price\']/../..//div[2]/div[contains(@class, \'textrange\')]//input';
		let el = element(by.xpath(locator));
		return new Promise ((resolve, reject) => {
			el.isPresent().then((present) => {
				if (present) {
					resolve (el.sendKeys (price));
				} else {
					reject (locator + ' is not displayed ' + url);
				}
			})
		})
	};

	click_price_btn () {
		let locator = '//h3[text() = \'Price\']/../..//button';
		let el = element(by.xpath(locator));
		return new Promise ((resolve, reject) => {
			el.isPresent().then((present) => {
				if (present) {
					resolve (el.click());
				} else {
					reject (locator + ' is not displayed ' + url);
				}
			})
		})
	};

	get_price_list () {
		let locator = '//li[contains(@class, \'s-item\')]//span[@class = \'s-item__price\']';
		let el = element.all(by.xpath(locator));
		return new Promise ((resolve, reject) => {
			el.then((list) => {
				if (list.length > 0) {
					el.getText().then ((list) => {
						resolve (list);
					})
				} else {
					reject (locator + ' is not displayed');
				}
			})
		})
	};

	select_best_match () {
		let locator = '//button[contains(@aria-label, \'Sort selector\')]';
		let el = element(by.xpath(locator));
		return new Promise ((resolve, reject) => {
			el.isPresent().then((present) => {
				if (present) {
					resolve (el.click());
				} else {
					reject (locator + ' is not displayed');
				}
			});
		});
	};

	select_ascending_price () {
		let locator = '//span[contains(text(), \'lowest first\')]';
		let el = element(by.xpath(locator));
		return new Promise ((resolve, reject) => {
			el.isPresent().then((present) => {
				if (present) {
					resolve (el.click());
				} else {
					reject (locator + ' is not displayed');
				}
			});
		});
	};

	select_descending_price () {
		let locator = '//span[contains(text(), \'highest first\')]';
		let el = element(by.xpath(locator));
		return new Promise ((resolve, reject) => {
			el.isPresent().then((present) => {
				if (present) {
					resolve (el.click());
				} else {
					reject (locator + ' is not displayed');
				}
			});
		});
	};
}

module.exports = new All_Listing_Page();