import mongoose from "mongoose";
import RealtySchema from "./realty.model.js";

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
