import mongoose from "mongoose";

const RealtySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    realtyType: String,
    cost: Number,
    location: String,
    district: String,
    street: String,
    houseNumber: String,
    flatNumber: String,
    floorCount: Number,
    floor: Number,
    owner: {
        fullName: String,
        phoneNumber: String
    }
},
{
    timestamps: true
})

export default mongoose.model('Realty', RealtySchema)