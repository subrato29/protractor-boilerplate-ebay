var rest = require('restler');
var apiUtils = {

    get: function (url) {
        var defered = protractor.promise.defer();
        console.log("[INFO]: API URL ### : " + url);
        rest.get(url).on('complete', function (result, response) {
            console.log("Response data " + JSON.stringify(result));
            if (result instanceof Error) {
                console.log('Error:', result.message);
                defered.reject(result.message);
                this.retry(5000); // try again after 5 sec
            } else {
                //console.log(result);
                console.log(response.statusCode);
                defered.fulfill(result);
            }
        });
        return defered.promise;
    },

    post: function (url, data) {
        var defered = protractor.promise.defer();
        rest.post(url, data).on('complete', function (result, response) {
            if (result instanceof Error) {
                console.log('Error:', result.message);
                defered.reject(result.message);
                this.retry(5000); // try again after 5 sec
            } else {
                //console.log(result);
                console.log(response.statusCode);
                defered.fulfill(result);
            }
        });
        return defered.promise;

    },

    update: function (url, data) {
        var defered = protractor.promise.defer();
        console.log("[INFO]: API URL: " + url);
        rest.putJson(url, data, {headers: {"Content-Type": "application/json"}}).on('complete', function (result, response) {
            console.log("Response data" + JSON.stringify(result));
            if (result instanceof Error) {
                console.log('Error:', result.message);
                defered.reject(result.message);
                this.retry(5000); // try again after 5 sec
            } else {
                //console.log(result);
                console.log(response.statusCode);
                defered.fulfill(result);
            }
        });
        return defered.promise;
    },

    delete: function (url) {
        var defered = protractor.promise.defer();
        console.log("[INFO]: API URL ### : " + url);
        rest.del(url).on('complete', function (result, response) {
            console.log("Response data " + JSON.stringify(result));
            if (result instanceof Error) {
                console.log('Error:', result.message);
                defered.reject(result.message);
                this.retry(5000); // try again after 5 sec
            } else {
                //console.log(result);
                console.log(response.statusCode);
                defered.fulfill(result);
            }
        });
        return defered.promise;
    }
};
module.exports = apiUtils;