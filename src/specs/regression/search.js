
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


  afterEach((done) => {
    browser.get(url.url.home.baseUrl).then(() => {
        done();
    });
  });


});