
'use strict'

let url = require('../../../config/urls.js');
let productPage = require('../../pages/product_details.js')
let viewCartPage = require('../../pages/view_cart_page.js')
let checkoutPage = require('../../pages/checkout_page.js')
let data = require("../../../data/data.js");

browser.ignoreSynchronization = true;


describe('Checkout flow: ', function() {

  beforeEach((done) => {
    browser.waitForAngularEnabled(false);
    browser.get(url.url.item.baseUrl).then(() => {
        done();
    });
  });

  it ('Validation of checkut product: ', function () {
    let expectedTotalQuantity = 0;
    let expectedTotalPrice = 0;
    return new Promise ((resolve) => {
      for(let i = 1; i <= 2; i++) {
        browser.get(url.url.item.baseUrl + Object.values(data.items)[i][0]).then (() => {
          return browser.driver.manage().deleteAllCookies();
        }).then (() => {
          return browser.driver.manage().window().maximize();
        }).then(() => {
          return productPage.select_color(Object.values(data.items)[i][1]);
        }).then(() => {
          let quantity = parseInt(Object.values(data.items)[i][3]);
          let price = Object.values(data.items)[i][2];
          expectedTotalPrice = expectedTotalPrice + (quantity * price);
          expectedTotalQuantity = expectedTotalQuantity + quantity;
          return productPage.set_quantity(quantity);
        }).then(() => {
          return productPage.click_add_to_cart();
        }).then(() => {
          return productPage.click_go_to_cart();
        }).then(() => {
          if (i === 2) {
            resolve();
          }
        });
      }
    }).then (() => {
      return viewCartPage.click_check_out();
    }).then (() => {
      return viewCartPage.click_continue_as_guest();
    }).then (() => {
      return checkoutPage.validate_checkout_title();
    }).then ((bool) => {
      return expect (bool).toBe (true);
    }).then(() => {
      return checkoutPage.get_item_total_count()
    }).then((text) => {
      return expect (text).toBe (expectedTotalQuantity.toString());
    }).then(() => {
      return checkoutPage.get_item_total_price()
    }).then((text) => {
      return expect (text).toBe (expectedTotalPrice.toString());
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