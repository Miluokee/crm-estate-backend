import OwnerModel from "../models/owner.model.js";
import RealtyModel from "../models/realty.model.js";

export const newOwner = async (req, res) => {
    try {
        const isOwner = await OwnerModel.findOne({phoneNumber: req.body.phoneNumber})

        if(!isOwner) {
            const newOwner = new OwnerModel({
                fullName: req.body.fullName,
                phoneNumber: req.body.phoneNumber,
                user: req.userId
            })

            const owner = await newOwner.save()

            return res.json(owner)
        }

        res.json(isOwner)

        
    } catch (error) {
        console.log(error)
        res.json({
            message: "Не вдалось створити власника"
        })
    }
}