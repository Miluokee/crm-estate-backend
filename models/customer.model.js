import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    request: {
        realtyIsNeed: String,
        haveCash: String,
        terms: String,
        comment: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
{
    timestamps: true
})

export default mongoose.model('Customer', CustomerSchema)