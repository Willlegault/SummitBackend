const mongoose = require('mongoose');
const { Schema } = mongoose;

const DebtSchema = new Schema({
    principal: { type: Number, required: true },
    interestRate: { type: Number, required: true },
})

const UserSchema = new Schema(
    { 
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        income: { type: Number, required: false },
        // debt: {type: DebtSchema, required: false},
        debt: {type: Number, required: false},
        location: {type: String, required: false},
    }, 
    {
        timestamps: true,
    }
);

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;