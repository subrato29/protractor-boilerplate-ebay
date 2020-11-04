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
};

module.exports = new HomePage();