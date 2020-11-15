
'use strict'

let url = require('../../../config/urls.js');
let productPage = require('../../pages/product_details.js')
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

  it ('Removal of addied product from shopping cart: ', function() {
    browser.get(url.url.item.baseUrl + data.items.product1[0]).then(() => {
      return browser.driver.manage().deleteAllCookies();
    }).then(() => {
      return browser.driver.manage().window().maximize();
    }).then(() => {
      return productPage.validate_item_title();
    }).then((text) => {
      return expect(text.toUpperCase()).toContain(data.items.product1[1].toUpperCase());
    }).then(() => {
      return productPage.validate_item_price();
    }).then((text) => {
      return expect(text).toBe(data.items.product1[2]);
    }).then(() => {
      return productPage.set_quantity(data.items.product1[3]);
    }).then(() => {
      return productPage.click_add_to_cart();
    }).then (() => {
      return productPage.click_no_thanks();
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
    }).then(() => {
      return viewCartPage.click_btn_remove();
    }).then(() => {
      return viewCartPage.validate_item_removal();
    }).then((bool) => {
      return expect(bool).toBe(true);
    }).catch((err) => {
      return Promise.reject(err);
    })
  });

  it ('Validation of addition of products in cart: ', function () {
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
      return productPage.get_total_cart_items();
    }).then ((text) => {
      return expect (expectedTotalQuantity.toString()).toBe(text);
    }).then (() => {
      return productPage.get_total_price();
    }).then ((text) => {
      return expect (expectedTotalPrice.toString()).toBe(text);
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