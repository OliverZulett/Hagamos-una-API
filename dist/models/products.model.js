"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        lowercase: true,
        trim: true
    },
    ingredients: {
        type: Array,
    },
    order_time: {
        type: Number,
    },
    description: {
        type: String,
    }
}, {
    collection: 'products'
});
exports.default = mongoose_1.model('Product', productSchema);
