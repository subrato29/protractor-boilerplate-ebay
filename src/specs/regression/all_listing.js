
'use strict'

let url = require('../../../config/urls.js');
let all_listing_page = require('../../pages/all_listing_page.js')
let data = require("../../../data/data.js");
let utils = require('../../../lib/genericUtils.js');

browser.ignoreSynchronization = true;


describe('Regression- All listing product: ', function() {

  beforeEach((done) => {
    browser.waitForAngularEnabled(false);
    browser.get(url.url.all_listing.baseUrl).then(() => {
        done();
    });
  });

  it ('Validating searching product by item number: ', function() {
    let from_price_list = data.all_listing.price[0];
    let to_price_list = data.all_listing.price[1];
    browser.driver.manage().deleteAllCookies().then(() => {
      return browser.driver.manage().window().maximize();
    }).then (() => {
      return all_listing_page.set_price_from (from_price_list);
    }).then (() => {
      return all_listing_page.set_price_to (to_price_list);
    }).then (() => {
      return all_listing_page.click_price_btn();
    }).then (() => {
      return all_listing_page.get_price_list();
    }).then ((price_list) => {
      price_list = utils.getPriceList(price_list);
      console.log (price_list)
      for (let i = 0; i < price_list.length; i++) {
        if (price_list[i].includes(' to ')) {
          let price = price_list[i].replace(' to ', '');
          return ((expect(parseFloat(price)).toBeGreaterThanOrEqual(parseFloat(from_price_list))) || (expect(parseFloat(price)).toBeLessThanOrEqual(parseFloat(to_price_list))));
        } else {
          return ((expect(parseFloat(price_list[i])).toBeGreaterThanOrEqual(parseFloat(from_price_list))) || (expect(parseFloat(price_list[i])).toBeLessThanOrEqual(parseFloat(to_price_list))));
        }
      }
    }).catch ((err) => {
      return Promise.reject (err);
    })
  });

  it ('Validating price by ascending order: ', function () {
    browser.driver.manage().deleteAllCookies().then(() => {
      return browser.driver.manage().window().maximize();
    }).then(() => {
      return all_listing_page.select_best_match();
    }).then(() => {
      return all_listing_page.select_ascending_price();
    }).then (() => {
      return all_listing_page.get_price_list();
    }).then((price_list) => {
      price_list = utils.getPriceList(price_list);
      console.log (price_list);
      return expect (utils.determineOrderOfArray(price_list)).toBe ('ascending');
    }).catch ((err) => {
      return Promise.reject (err);
    });
  });

  it ('Validating price by descending order: ', function () {
    browser.get('https://www.ebay.com/sch/i.html?_from=R40&_nkw=laptop&_sacat=0&_oaa=1&_dcat=177&_sop=16').then(() => {
      browser.driver.manage().deleteAllCookies().then(() => {
        return browser.driver.manage().window().maximize();
      }).then(() => {
        return all_listing_page.select_best_match();
      }).then(() => {
        return all_listing_page.select_descending_price();
      }).then (() => {
        return all_listing_page.get_price_list();
      }).then((price_list) => {
        price_list = utils.getPriceList(price_list);
        console.log (price_list);
        return expect (utils.determineOrderOfArray(price_list)).toBe ('descending');
      }).catch ((err) => {
        return Promise.reject (err);
      });
    })
  });

  afterEach((done) => {
    browser.get(url.url.home.baseUrl).then(() => {
        done();
    });
  });


});