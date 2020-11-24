
'use strict'

let url = require('../../../config/urls.js');
let homePage = require('../../pages/home_page.js')
let searchedResultPage = require('../../pages/searched_results_page.js')
let data = require("../../../data/data.js");

browser.ignoreSynchronization = true;


describe('Regression- Search functionality validation: ', function() {

  beforeEach((done) => {
    browser.waitForAngularEnabled(false);
    browser.get(url.url.home.baseUrl).then(() => {
        done();
    });
  });

  it ('Validating searching product by item number: ', function() {
    let item_no = data.items.product1[0];
    browser.driver.manage().deleteAllCookies().then(() =>{
      return homePage.validate_search_activity(item_no);
    }).then(() => {
      return homePage.click_btn_search();
    }).then(() => {
      return searchedResultPage.validate_search_result();
    }).then(() => {
      return searchedResultPage.validate_item_no();
    }).then ((text) => {
      return expect (text).toBe (item_no);
    }).catch((err) => {
      return Promise.reject (err);
    });
  });

  it ('Validating recently viewed items: ', function() {
    
  });


  afterEach((done) => {
    browser.get(url.url.home.baseUrl).then(() => {
        done();
    });
  });


});