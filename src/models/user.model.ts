import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
    role: string;
    eamil: string;
    password: string;
    nick: string;
    image: string;
}

const userSchema = new Schema(
    {
        role: {
            type: String,
            required: true,
            default: 'USER_ROLE', 
            enum: {
                values: ['ADMIN_ROLE', 'USER_ROLE'],
                message: '{VALUE} no es un rol permitido'
            }
        },
        email: {
            unique: true,
            type: String,
            trim: true,
            require: true
        },
        password: {
            type: String,
            trim: true,
            required: true
        },
        nick: {
            type: String,
            lowercase: true,
            trim: true,
            require: true
        },
        image: {
            type: String,
            default: 'user-default.png',
            required: true
        }
    },
    {
        collection: 'users'
    }
);

export default model<IUser>('User', userSchema);
