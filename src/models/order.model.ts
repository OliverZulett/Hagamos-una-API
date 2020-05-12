import { Schema, model, Document } from 'mongoose';
import moment_timezone from 'moment-timezone';

export interface IOrder extends Document {
    user_id: string;
    products: Object[];
    name: string;
    surname: string;
    nit: string;
    quantity: number;
    total_price: number;
    order_date: number;
    phone: number;
    adress: string;
    notes: string;
}

const dateLaPaz = moment_timezone.tz(Date.now(), "America/La_Paz").format();

const orderSchema = new Schema(
    {
        products: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    required: true,
                    ref:'Product'
                },
                quantity: {
                    type: Number,
                    required: true,
                    default: 0,
                    trim: true
                },
            }
        ],
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref:'User'
        },
        name: {
            type: String,
            lowercase: true,
            trim: true
        },
        surname: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },
        nit: {
            type: String,
            required: true,
            default: 'Sin-nit',
            trim: true
        },
        total_price: {
            type: Number,
            required: true,
            default: 0,
            trim: true
        },
        order_date: {
            type: Date,
            required: true,
            default: dateLaPaz
        },
        phone: {
            type: Number,
            required: true,
            trim: true
        },
        adress: {
            type: String,
            required: true,
        },
        notes: {
            type: String
        }
    },
    {
        collection: 'orders'
    }
);

export default model<IOrder>('Orders', orderSchema);
