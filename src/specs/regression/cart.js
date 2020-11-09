
'use strict'

let url = require('../../../config/urls.js');
let cartPage = require('../../pages/cart_page.js')
let viewCartPage = require('../../pages/view_cart_page.js')
let data = require("../../../data/data.js");

browser.ignoreSynchronization = true;


describe('Regression- Shopping cart functionality validation: ', function() {

  beforeEach((done) => {
    browser.waitForAngularEnabled(false);
    browser.get(url.url.item.baseUrl).then(() => {
        done();
    });
  });

  it ('Validation of adding product into shopping cart: ', function() {
    browser.get(url.url.item.baseUrl + data.items.product1[0]).then(() => {
      return browser.driver.manage().deleteAllCookies();
    }).then(() => {
      return browser.driver.manage().window().maximize();
    }).then(() => {
      return cartPage.validate_item_title();
    }).then((text) => {
      return expect(text.toUpperCase()).toContain(data.items.product1[1].toUpperCase());
    }).then(() => {
      return cartPage.validate_item_price();
    }).then((text) => {
      return expect(text).toBe(data.items.product1[2]);
    }).then(() => {
      return cartPage.set_quantity(data.items.product1[3]);
    }).then(() => {
      return cartPage.click_add_to_cart();
    }).then (() => {
      return cartPage.click_no_thanks();
    }).then(() => {
      return viewCartPage.validate_item_title();
    }).then((text) => {
      return expect(text.toUpperCase()).toContain(data.items.product1[1].toUpperCase());
    }).then (() => {
      return viewCartPage.validate_item_price();
    }).then((text) => {
      return expect(text).toBe(data.items.product1[2]);
    }).then (() => {
      return viewCartPage.validate_item_count();
    }).then((text) => {
      return expect(text).toBe(data.items.product1[3]);
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