import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
    firstName: {
        type: String,
        required: 'Enter a first name'
    },
    lastName: {
        type: String,
        required: 'Enter a first name'
    },
    email: {
        type: String            
    },
    phone: {
        type: Number            
    },
    permissionLevel: { type: Number },
    created_date: {
        type: Date,
        default: Date.now
    }
});
export const UserModel = mongoose.model('Users', UserSchema);