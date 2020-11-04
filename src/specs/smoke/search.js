
'use strict'

let url = require('../../../config/urls.js');
let homePage = require('../../pages/home_page.js')
let data = require("../../../data/data.js");

browser.ignoreSynchronization = true;


describe('Search functionality validation: ', function() {

  beforeEach((done) => {
    browser.waitForAngularEnabled(false);
    browser.get(url.url.home.baseUrl).then(() => {
        done();
    });
  });


  it ('Valdating search field: ', function() {
      browser.driver.manage().deleteAllCookies().then(() => {
    }).then(() => {
      return browser.driver.manage().window().maximize();
    }).then(() => {
      return homePage.validate_search_box();
    }).then((bool) => {
      return expect(bool).toBe(true);
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