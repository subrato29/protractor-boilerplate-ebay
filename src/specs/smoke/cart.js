
'use strict'

let url = require('../../../config/urls.js');
let cartPage = require('../../pages/cart_page.js')
let data = require("../../../data/data.js");

browser.ignoreSynchronization = true;


describe('Shopping cart functionality validation: ', function() {

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
      return cartPage.validate_shopping_cart_text();
    }).then((bool) => {
      return expect(bool).toBe(true);
    }).then(() => {
      return cartPage.validate_shopping_cart_with_no_item();
    }).then((bool) => {
      return expect(bool).toBe(true);
    }).then(() => {
      return cartPage.validate_no_item_text();
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