'use strict'

let utils = require('../../lib/commonUtils.js');

class CitiesPage {

	get find_your_city () {
        return new Promise((resolve, reject) => {
            element(by.xpath('//input[@placeholder = \'Find Your City\']')).isPresent().then((present) => {
                if (present) {
                    resolve(element(by.xpath('//input[@placeholder = \'Find Your City\']')));
                } else {
                    browser.getCurrentUrl().then((url) => {
                        reject('Error retrieving find_your_city text. ' + url);
                    });
                }
            });
        });
    };

    get got_your_easy_ride () {
        return new Promise((resolve, reject) => {
            utils.isElementPresent('//h1[contains(text(), \'got your easy ride across town\')]');
            element(by.xpath('//h1[contains(text(), \'got your easy ride across town\')]')).isPresent().then((present) => {
                if (present) {
                    resolve(element(by.xpath('//h1[contains(text(), \'got your easy ride across town\')]')));
                } else {
                    browser.getCurrentUrl().then((url) => {
                        reject('Error retrieving got_your_easy_ride text. ' + url);
                    });
                }
            });
        });
    };

    get get_estimate() {
        utils.elementToBeClickable('//span[text() = \'GET ESTIMATE\']');
        return new Promise((resolve, reject) => {
            element(by.xpath('//span[text() = \'GET ESTIMATE\']')).isPresent().then((present) => {
                if (present) {
                    resolve (element(by.xpath('//span[text() = \'GET ESTIMATE\']')));
                } else {
                    reject ('//span[text() = \'GET ESTIMATE\'] is not present');
                }
            });
        });
    }

    no_lyft_service () {
        element.all(by.xpath('//h1[contains(text(), \'got your easy ride across town\')]')).then((list) => {
            expect(list.length).toBe(0);
        });
    };

    get ride_for_every_occasion () {
        return new Promise((resolve, reject) => {
            utils.isElementPresent('//h2[text() = \'A ride for every occasion\']');
            element(by.xpath('//h2[text() = \'A ride for every occasion\']')).isPresent().then((present) => {
                if (present) {
                    resolve (true);
                } else {
                    reject (false);
                }
            });
        });
    };

    get btnCountry () {
        return new Promise((resolve, reject) => {
            let locator = '//button[text() = \'United States\']';
            element(by.xpath(locator)).isPresent().then((present) => {
                if (present) {
                    resolve (element(by.xpath(locator))); 
                } else {
                    reject (locator + ' is not displayed');
                }
            });
        });
    };

    get canada () {
        return new Promise((resolve, reject) => {
            let locator = '//li[text() = \'Canada\']';
            element(by.xpath(locator)).isPresent().then((present) => {
                if (present) {
                    resolve (element(by.xpath(locator)));
                } else {
                    reject (locator + ' is not displayed');
                }
            });
        });
    };

    get british_columbia () {
        return new Promise((resolve, reject) => {
            let locator = '//h2[text() = \'BRITISH COLUMBIA\']';
            element(by.xpath(locator)).isPresent().then((present) => {
                if (present) {
                    resolve (element(by.xpath(locator)));
                } else {
                    reject (locator + ' is not displayed');
                }
            });
        });
    };

    verify_ride_for_every_occasion_lux () {
        return new Promise((resolve, reject) => {
            utils.isElementExist('//span[text() = \'LUX\']').then((present) => {
                if (present) {
                    element(by.xpath('//span[text() = \'LUX\']')).click().then(() => {
                        utils.isElementExist('//p[contains(text(), \'Lyft Lux is your high\')]').then((present) => {
                            if (present) {
                                resolve (true);
                            } else {
                                reject ('//p[contains(text(), \'Lyft Lux is your high\')] is not visible');
                            }
                        });
                    });
                } else {
                    reject ('//span[text() = \'LUX\'] is not displayed');
                }
            });
        });
    };

    verify_ride_for_every_occasion_lyft_xl () {
        return new Promise((resolve, reject) => {
            utils.elementToBeClickable('//span[text() = \'LYFT XL\']');
            utils.isElementExist('//span[text() = \'LYFT XL\']').then((present) => {
                if (present) {
                    element(by.xpath('//span[text() = \'LYFT XL\']')).click().then(() => {
                        utils.isElementExist('//p[contains(text(), \'Lyft XL is a supersized\')]').then((present) => {
                            if (present) {
                                resolve (true);
                            } else {
                                reject ('//p[contains(text(), \'Lyft XL is a supersized\')] is not visible');
                            }
                        });
                    });
                } else {
                    reject ('//span[text() = \'LYFT XL\'] is not displayed');
                }
            });
        });
    };

    get currently_no_rides () {
        return new Promise((resolve, reject) => {
            utils.waitForElement('//span[contains(text(), \'currently no rides\')]');
            element(by.xpath('//span[contains(text(), \'currently no rides\')]')).isPresent().then((present) => {
                if (present) {
                    resolve(element(by.xpath('//span[contains(text(), \'currently no rides\')]')));
                } else {
                    browser.getCurrentUrl().then((url) => {
                        reject('Error retrieving currently_no_rides text. ' + url);
                    });
                }
            });
        });
    };

    set_find_your_city(city_loc) {
    	let set_find_your_city = this.find_your_city;
        return set_find_your_city.then((_promise) => {
            set_find_your_city = _promise;
            set_find_your_city.sendKeys(city_loc);
            return new Promise((resolve, reject) => {
                utils.isElementPresent('//ul[@role = \'listbox\']/li[1]//span');
                utils.wait(2000);
                element(by.xpath('//ul[@role = \'listbox\']/li[1]//span')).isPresent().then((present) => {
                    if (present) {
                        resolve (element(by.xpath('//ul[@role = \'listbox\']/li[1]//span')).click());
                    } else {
                            browser.getCurrentUrl().then((url) => {
                            //reject('Error retrieving set_find_your_city text. ' + url);
                        });
                    }
                });
            });
        }).catch((err) => {
            Promise.reject(err);
        });
    };

    verify_got_your_easy_ride() {
        let verify_got_your_easy_ride = this.got_your_easy_ride;
        return verify_got_your_easy_ride.then((_promise) => {
            verify_got_your_easy_ride = _promise;
            return verify_got_your_easy_ride.getText();
        }).catch((err) => {
            return Promise.reject(err);
        })
    };

    set_pick_up_loc(location) {
        return new Promise((resolve, reject) => {
            utils.isElementExist('//span[contains(text(), \'Enter pick-up location\')]/../..//input').then((present) => {
                if(present) {
                    element(by.xpath('//span[contains(text(), \'Enter pick-up location\')]/../..//input')).sendKeys(location).then(() => {
                        utils.elementToBeClickable('//ul[@role = \'listbox\']/li[1]');
                        resolve (element(by.xpath('//ul[@role = \'listbox\']/li[1]')).click());
                    });
                } else {
                    reject('set_pick_up_loc function is failed');
                }
            });
        });
    };

    set_drop_off_loc(location) {
        return new Promise((resolve, reject) => {
            utils.isElementExist('//span[contains(text(), \'Enter drop-off location\')]/../..//input').then((present) => {
                if(present) {
                    element(by.xpath('//span[contains(text(), \'Enter drop-off location\')]/../..//input')).sendKeys(location).then(() => {
                        utils.elementToBeClickable('//ul[@role = \'listbox\']/li[1]');
                        resolve (element(by.xpath('//ul[@role = \'listbox\']/li[1]')).click());
                    });
                } else {
                    reject('set_drop_off_loc function is failed');
                }
            });
        });
    };

    click_get_estimate() {
        let click_get_estimate = this.get_estimate;
        return click_get_estimate.then((_promise) => {
            click_get_estimate = _promise;
            return click_get_estimate.click();
        }).catch((err) => {
            return Promise.reject('error in click_get_estimate function');
        })
    };

    get_ride_types() {
        utils.waitForElement('//span[text() = \'Lyft\']');
        element.all(by.xpath('//span[text() = \'Lyft\']/../../..//tr/td[1]')).getText().then((list) => {
            expect(list.length).toEqual(5);
            expect(list.includes('Lyft')).toBe(true);
            expect(list.includes('XL')).toBe(true);
            expect(list.includes('Lux')).toBe(true);
            expect(list.includes('Lux Black')).toBe(true);
            expect(list.includes('Lux Black XL')).toBe(true);
        });
    };

    click_btnCountry () {
        let click_btnCountry = this.btnCountry;
        return click_btnCountry.then((_promise) => {
            click_btnCountry = _promise;
            return click_btnCountry.click();
        }).catch((err) => {
            return Promise.reject('error is click_btnCountry function');
        });
    };

    click_canada () {
        let click_canada = this.canada;
        return click_canada.then ((_promise) => {
            click_canada = _promise;
            return click_canada.click();
        }).catch((err) => {
            return Promise.reject('error is click_canada function');
        });
    };

}

module.exports = new CitiesPage();