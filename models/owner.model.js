import mongoose from "mongoose";

const OwnerSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Realty',
        required: true
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

export default mongoose.model('Owner', OwnerSchema)