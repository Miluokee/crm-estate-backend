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

export const getAllRealtyObjects = async (req, res) => {
    try {
        const realty = await RealtyModel.find().populate('user').exec()

        res.json(realty)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Не вдалось отримати об'єкти нерухомості"
        })
    }
}

export const getRealtyObject = async (req, res) => {
    try {
        const realty = await RealtyModel.findById(req.params.id).populate('user')

        if (!realty) {
            return res.status(404).json({
                message: "Об'єкт нерухомості не знайдений"
            })
        }

        res.json(realty)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Не вдалось отримати об'єкт нерухомості"
        })
    }
}

export const editRealtyObject = async (req, res) => {
    try {
        const realtyId = req.params.id

        if (!req.body.owner) {
            await RealtyModel.updateOne(
                {
                    _id: realtyId
                },
                {
                    user: req.userId,
                    realtyType: req.body.realtyType,
                    cost: req.body.cost,
                    location: req.body.location,
                    district: req.body.district,
                    street: req.body.street,
                    houseNumber: req.body.houseNumber,
                    flatNumber: req.body.flatNumber,
                    floorCount: req.body.floorCount,
                    floor: req.body.floor
                }
                )
            
                return res.json({
                    success: true
                })
            }
        
            const newOwner = new OwnerModel({                       //This part need FIX - if another name with same number it can't create new Owner
                fullName: req.body.owner.fullName,                  //Need to check numbers for identity and if it same - leave this Owner without changes
                phoneNumber: req.body.owner.phoneNumber,            //If numbers are different - need to set new number
                user: req.userId
            })
        
            const owner = await newOwner.save()
        
            await RealtyModel.updateOne(
                {
                    _id: realtyId
                },
                {
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

                res.json({
                    success: true
                })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Помилка редагування інформації про об'єкт нерухомості"
        })
    }
}

export const deleteRealtyObject = async (req, res) => {
    try {
        const realtyId = req.params.id

        RealtyModel.findOneAndDelete(
            {
                _id: realtyId
            },
            (error, doc) => {
                if (error) {
                    console.log(error)
                    return res.status(500).json({
                        message: "Не вдалось видалити об'єкт нерухомості"
                    })
                }

                if (!doc) {
                    return res.status(404).json({
                        message: "Не вдалось видалити об'єкт нерухомості"
                    })
                }

                res.json({
                    success: true
                })
            }
            )

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Не вдалось видалити статтю"
        })
    }
}