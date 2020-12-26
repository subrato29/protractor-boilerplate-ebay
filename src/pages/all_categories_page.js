'use strict';

let utils = require('../../lib/commonUtils.js');

class All_Categories_Page {
	validate_all_categories() {
		let locator = '//h1[text() = \'All Categories\']/..//a';
		let el = element.all(by.xpath(locator));
		return new Promise ((resolve, reject) => {
			el.then((list) => {
				if (list.length > 0) {
					element.all(by.xpath(locator)).getText().then ((text) => {
						let num = [];
						for (let i = 0; i < text.length; i++) {
							num.push(text[i].split('\n')[0]);
						}
						resolve(num);
					});
				} else {
					reject (locator + ' is not present');
				}
			});
		});
	};
}

module.exports = new All_Categories_Page();