'use strict'

module.exports = {
    configure: {
        smoke: {
            specs: [
                'src/specs/smoke/search.js',
                'src/specs/smoke/cart.js',
                'src/specs/regression/search.js'
            ]
        },
        regression: {
            specs: [
                'src/specs/regression/cart.js',
                'src/specs/regression/checkout.js'  
            ]
        }
    }
};
