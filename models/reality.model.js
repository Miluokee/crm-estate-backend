import mongoose from "mongoose";

const RealtySchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    avatarUrl: String,
},
{
    timestamps: true
})

export default mongoose.model('Realty', RealtySchema)