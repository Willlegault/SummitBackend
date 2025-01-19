const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema(
    { 
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        income: { type: Number, required: true },
        totalDebt: { type: Number, required: true }
    }, 
    {
        timestamps: true,
    }
);

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;