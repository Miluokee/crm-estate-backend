import RealtyModel from "../models/realty.model.js";
import OwnerModel from "../models/owner.model.js";

export const createRealtyObject = async (req, res) => {
    try {
        const realtyOwner = await OwnerModel.findOne({phoneNumber: req.body.owner.phoneNumber})

        if (!realtyOwner) {
            const newOwner = new OwnerModel({
                fullName: req.body.owner.fullName,
                phoneNumber: req.body.owner.phoneNumber,
                user: req.userId
            })

            const owner = await newOwner.save()

            const newRealty = new RealtyModel({
                user: req.userId,
                realtyType: req.body.realtyType,
                cost: req.body.cost,
                location: req.body.location,
                district: req.body.district,
                street: req.body.street,
                houseNumber: req.body.houseNumber,
                flatNumber: req.body.flatNumber,
                floorCount: req.body.floorCount,
                floor: req.body.floor,
                owner: owner
            })
            
            const realty = await newRealty.save()

            return res.json(realty)
        } 
        
        const newRealty = new RealtyModel({
            user: req.userId,
            realtyType: req.body.realtyType,
            cost: req.body.cost,
            location: req.body.location,
            district: req.body.district,
            street: req.body.street,
            houseNumber: req.body.houseNumber,
            flatNumber: req.body.flatNumber,
            floorCount: req.body.floorCount,
            floor: req.body.floor,
            owner: realtyOwner
        })

        const realty = await newRealty.save()

        res.json(realty)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Не вдалось створити об'єкт нерухомості"
        })
    }
}