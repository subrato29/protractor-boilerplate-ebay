'use strict'

let genericUtils = {
	getArray: function(string, separator) {
        return string.split(separator);
    },

    generateRandomNumber: function (length) {
    	return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
	},

	getPriceList: function (array) {
		let result = [];
		for (let i = 0; i < array.length; i++) {
			result.push(array[i].split('$')[1]);
		}
		return result;
	}
};

module.exports = genericUtils;