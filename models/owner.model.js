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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    property: {
        type: Array,
        ref: 'Realty',
        default: []
    }
},
{
    timestamps: true
})

export default mongoose.model('Owner', OwnerSchema)
