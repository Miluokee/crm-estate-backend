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
        location: {
            district: String,
            flat: String,
            floor: String,
            
        },
        required: true
    }
},
{
    timestamps: true
})

export default mongoose.model('Customer', CustomerSchema)