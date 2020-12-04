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
	},

	determineOrderOfArray: function(arr) {
	   if(arr.length < 2){
	      return 'not enough items';
	   };
	   let ascending = null;
	   let nextArr = arr.slice(1);
	   for(var i = 0; i < nextArr.length; i++) {
	      if(nextArr[i] === arr[i]){
	         continue;
	      }else if(ascending === null) {
	         ascending = nextArr[i] > arr[i];
	      }else if (ascending !== nextArr[i] > arr[i]){
	         return 'unsorted';
	      };
	   }
	   if(ascending === null){
	      return 'all items are equal';
	   };
	   return ascending ? 'ascending' : 'descending';
	}
};

module.exports = genericUtils;