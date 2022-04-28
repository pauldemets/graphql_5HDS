const db = require('../db');

const Query = {
    products: () => db.products.list()
}

const Product = {
}



module.exports = { Query, Product }