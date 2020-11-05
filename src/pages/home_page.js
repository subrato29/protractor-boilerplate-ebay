'use strict'

let utils = require('../../lib/commonUtils.js');

class HomePage {
	validate_search_box() {
		let locator = '//input[@placeholder = \'Search for anything\']';
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

	validate_search_activity(value) {
		let locator = '//input[@placeholder = \'Search for anything\']';
		let validate_search_activity = this.validate_search_box();
		return new Promise((resolve, reject) => {
			validate_search_activity.then((bool) => {
				if(bool) {
					resolve (element(by.xpath(locator)).sendKeys(value));
				} else {
					reject ('err with ' + element(by.xpath(locator)));
				}
			})
		});
	};

	click_btn_search () {
		let locator = '//input[@value = \'Search\']';
		return new Promise ((resolve, reject) => {
			element(by.xpath(locator)).isPresent().then((present) => {
				if (present) {
					resolve (element(by.xpath(locator)).click());
				} else {
					reject (locator + ' is not working');
				}
			});
		});
	};

	validate_count_of_searched_result () {
		let locator = '//h3[contains(@class, \'s-item__title s\')]';
		return new Promise ((resolve, reject) => {
			element.all(by.xpath(locator)).then((list) => {
				utils.wait(2000);
				if (list.length > 0) {
					resolve (list.length);
				} else {
					reject (0);
				}
			});
		});
	};

	validation_of_all_categories() {
		let locator = '//option[text() = \'All Categories\']/../..//select/option';
		return new Promise((resolve, reject) => {
			element.all(by.xpath(locator)).getText().then((list) => {
				if (list.length > 0) {
					resolve (list);
				} else {
					reject ('all Categories is empty');
				}
			});
		});
	};
};

module.exports = new HomePage();