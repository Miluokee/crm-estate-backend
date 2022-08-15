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
        const realtyId = req.params.id
        await RealtyModel.findOneAndUpdate({
            _id: realtyId
        },
        {
            $inc: { viewCount: 1}
        },
        {
            returnDocument: 'after'
        },
        (error, doc) => {
            if (error) {
                console.log(error)
                return res.status(500).json({
                    message: "Не вдалось відобразити об'єкт нерухомості"
                })
            }
            if (!doc) {
                console.log(error)
                return res.status(404).json({
                    message: "Не вдалось знайти об'єкт нерухомості"
                })
            }

            res.json(doc)
        }).populate('user')
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
        
            const newOwner = new OwnerModel({
                fullName: req.body.owner.fullName,
                phoneNumber: req.body.owner.phoneNumber,
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