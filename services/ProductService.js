const db = require('../db');
const { v4: uuidv4 } = require('uuid');

const Query = {
    products: () => db.products.list()
}

const Product = {
}

const Mutation = {
    createProduct: (root, args, context, info) => {
        const { name, description, price, stock } = args.input;

        const res = db.products.create({
            id: uuidv4(),
            name: args.input.name,
            description: args.input.description,
            price: args.input.price,
            stock: args.input.stock,
            created_at: new Date().toLocaleString(),
            updated_at: new Date().toLocaleString()
        });

        return `Product "${name}" successfully created.`;
    },
    deleteProductById: (root, args, context, info) => {
        const result = db.products.delete(args.id);
        return true;
    },
    updateProductById: (root, args, context, info) => {
        const currentProduct = db.products.get(args.id);
        const { name, description, price, stock } = args.input;

        if (name != '') {
            currentProduct.name = name;
        }
        if (description != '') {
            currentProduct.description = description;
        }
        if (price != '') {
            currentProduct.price = price;
        }
        if (stock != '') {
            currentProduct.stock = stock;
        }

        const result = db.products.update(
            {
                id: currentProduct.id,
                name: currentProduct.name,
                description: currentProduct.description,
                price: currentProduct.price,
                stock: currentProduct.stock,
                created_at: currentProduct.created_at,
                updated_at: new Date().toLocaleString()
            });

        return `Product #${args.id} successfully updated.`;
    },
}



module.exports = { Query, Product, Mutation }