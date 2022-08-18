import OwnerModel from "../models/owner.model.js";
import RealtyModel from "../models/realty.model.js";

export const newOwner = async (req, res) => {
    try {
        const property = await RealtyModel.find().populate('user').exec()
        
        console.log(property)

        const isOwner = await property.reduce((acc, rec) => {
            let number = rec.owner.phoneNumber
            if (number === req.body.phoneNumber) {
                return [rec, ...acc]
            }
            return acc
        }, [])

        console.log(isOwner)
        
        const doc = new OwnerModel(
            {
                fullName: req.body.fullName,
                phoneNumber: req.body.phoneNumber,
                user: req.userId,
                property: isOwner
            }
        )

        const owner = await doc.save()
        res.json(owner)
    } catch (error) {
        console.log(error)
        res.json({
            message: "Не вдалось створити власника"
        })
    }
}