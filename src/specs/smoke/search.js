
'use strict'

let url = require('../../../config/urls.js');
let homePage = require('../../pages/home_page.js')
let searchResultPage = require('../../pages/searched_results_page.js')
let data = require("../../../data/data.js");

browser.ignoreSynchronization = true;


describe('Sanity- Search functionality validation: ', function() {

  beforeEach((done) => {
    browser.waitForAngularEnabled(false);
    browser.get(url.url.home.baseUrl).then(() => {
        done();
    });
  });


  it ('Valdating search field. existance: ', function() {
      browser.driver.manage().deleteAllCookies().then(() => {
    }).then(() => {
      return browser.driver.manage().window().maximize();
    }).then(() => {
      return homePage.validate_search_box();
    }).then((bool) => {
      return expect(bool).toBe(true);
      done();
    }).catch((err) => {
      return Promise.reject(err);
    })
  });

  it ('Valdating search functionality fetch the more than zero record: ', function() {
      browser.driver.manage().deleteAllCookies().then(() => {
    }).then(() => {
      return browser.driver.manage().window().maximize();
    }).then(() => {
      return homePage.validate_search_activity('Laptop');
    }).then(() => {
      return homePage.click_btn_search();
    }).then(() => {
      return homePage.validate_count_of_searched_result();
    }).then((count) => {
      console.log ('total no searched result: ' + count);
      return expect(count).toBeGreaterThan(0);
      done();
    }).catch((err) => {
      return Promise.reject(err);
    })
  });

  it ('Validation of all aategories list beside search box: ', function() {
    browser.driver.manage().deleteAllCookies().then(() => {
    }).then(() => {
      return browser.driver.manage().window().maximize();
    }).then(() => {
      return homePage.validation_of_all_categories();
    }).then((list) => {
      let all_cat = data.home.all_cat;
      for (let i = 0; i < all_cat.length; i++) {
        expect(list.includes(all_cat[i])).toBe(true);
      }
    }).catch((err) => {
      return Promise.reject(err);
    })
  });

  it ('Validation of search criteria of a product mismatch of search criteria: ', function() {
    browser.driver.manage().deleteAllCookies().then(() => {
      return browser.driver.manage().window().maximize();
    }).then(() => {
      return homePage.validate_search_activity('hhjagsdhjagahs');
    }).then(() => {
      return homePage.click_btn_search();
    }).then(() => {
      return homePage.validate_no_exact_match_found();
    }).catch((err) => {
      return Promise.reject(err);
    });
  });

  it('Validating search criteria with a blank value: ', function() {
    browser.driver.manage().deleteAllCookies().then(() => {
      return browser.driver.manage().window().maximize();
    }).then(() => {
      return homePage.validate_search_activity('     '); 
    }).then(() => {
      return homePage.click_btn_search();
    }).then(() => {
      return searchResultPage.validating_search_result_by_blank_char();
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