
'use strict'

let url = require('../../../config/urls.js');
let productPage = require('../../pages/product_details.js')
let data = require("../../../data/data.js");

browser.ignoreSynchronization = true;


describe('Smoke- Shopping cart functionality validation: ', function() {

  beforeEach((done) => {
    browser.waitForAngularEnabled(false);
    browser.get(url.url.cart.baseUrl).then(() => {
        done();
    });
  });

  it ('Validation of shoppin cart page: ', function() {
      browser.driver.manage().deleteAllCookies().then(() => {      
    }).then(() => {
      return browser.driver.manage().window().maximize();
    }).then(() => {
      return productPage.validate_shopping_cart_text();
    }).then((bool) => {
      return expect(bool).toBe(true);
    }).then(() => {
      return productPage.validate_shopping_cart_with_no_item();
    }).then((bool) => {
      return expect(bool).toBe(true);
    }).then(() => {
      return productPage.validate_no_item_text();
    }).then((bool) => {
      return expect(bool).toBe(true);
      done();
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