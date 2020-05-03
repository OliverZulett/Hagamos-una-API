import mongoose, { Schema, model, Document } from 'mongoose';

export interface IProduct extends Document {
    name: string,
    image: string,
    price: number
    ingredients: string[],
    order_time: number,
    description: string
}

const productSchema = new Schema(
    {
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
    },
    {
        collection: 'products'
    }
);

export default model<IProduct>('Product', productSchema);