'use strict'

let genericUtils = {
	getArray: function(string, separator) {
        return string.split(separator);
    },

    generateRandomNumber: function (length) {
    	return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
	}
};

module.exports = genericUtils;