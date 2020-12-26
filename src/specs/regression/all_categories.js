
'use strict'

let url = require('../../../config/urls.js');
let allCategoriesPage = require('../../pages/all_categories_page.js')
let data = require("../../../data/data.js");
let genericUtils = require('../../../lib/genericUtils.js');

browser.ignoreSynchronization = true;

describe('Validating all categories page: ', function () {

	beforeEach((done) => {
	   browser.waitForAngularEnabled(false);
	   browser.get(url.url.all_categories.baseUrl).then(() => {
	       done();
	   });
	});


	it('Validating list of names of categories: ', function() {
		browser.driver.manage().deleteAllCookies().then(() => {
			return browser.driver.manage().window().maximize();
		}).then(() => {
			return allCategoriesPage.validate_all_categories();
		}).then((list) => {
			expect (genericUtils.compareArray(list, data.all_prod_categories.list_prod_cat)).toBe(true);
		}).catch((err) => {
			return Promise.reject(err);
		})
	});


	afterEach((done) => {
	    browser.get(url.url.home.baseUrl).then(() => {
	        done();
	    });
	});

});