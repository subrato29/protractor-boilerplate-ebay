'use strict';

let utils = require('../../lib/commonUtils.js');
let genericUtils = require('../../lib/genericUtils.js');

class SearchedResultPage {
	validate_search_result () {
		let locator = '//div[@id = \'srp-river-results\']//li[contains(@class, \'s-item\')]';
		let el = element(by.xpath(locator));
		utils.waitForElement(el);
		return new Promise ((resolve, reject) => {
			element.all(by.xpath(locator)).then((list) => {
				if (list.length === 1) {
					resolve();
				} else if (list.length > 1){
					reject ('Searched result is more than 1');
				} else {
					reject ('No searched result');
				}
			});
		});
	};

	validate_item_no () {
		let locator = '//span[text() = \'Save this search\']/../../../../..//h1//span[2]';
		let el = element(by.xpath(locator));
		return new Promise ((resolve, reject) => {
			el.isPresent().then ((present) => {
				if (present) {
					resolve (el.getText());
				} else {
					reject (locator + ' is not present');
				}
			})
		});
	};

	validate_recently_viewed_items () {
		let locator = '//h3[text() = \'Recently viewed items\']/..//div[@class = \'s-item__image-wrapper\']';
		return new Promise ((resolve, reject) => {
			element.all (by.xpath(locator)).then ((list) => {
				if (list.length > 0) {
					resolve (list.length);
				} else {
					reject ('No recently viewed items');
				}
			});
		});
	};
}

module.exports = new SearchedResultPage();