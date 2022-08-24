import OwnerModel from "../models/owner.model.js";

export const getAllOwners = async (req, res) => {
    try {
        const owners = await OwnerModel.find()

        res.json(owners)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Не вдалось отримати власників"
        })        
    }
}

export const getOwner = async (req, res) => {
    try {
        const owner = await OwnerModel.findById(req.params.id)

        if (!owner) {
            return res.status(404).json({
                message: "Власник не знайдений"
            })
        }

        res.json(owner)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Не вдалось отримати власника"
        })
    }
}

export const updateOwner = async (req, res) => {
    try {
        const ownerId = req.params.id

        await OwnerModel.updateOne(
            {
                _id: ownerId
            },
            {
                user: req.userId,
                fullName: req.body.fullName,
                phoneNumber: req.body.phoneNumber
            }
        )

        res.json({
            success: true
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Не вдалось змінити дані власника"
        })
    }
}

export const deleteOwner = async (req, res) => {
    try {
        const ownerId = req.params.id

        OwnerModel.findOneAndDelete(
            {
                _id: ownerId
            },
            (error, doc) => {
                if (error) {
                    console.log(error)
                    return res.status(500).json({
                        message: "Не вдалось видалити власника"
                    })
                }

                if (!doc) {
                    return res.status(404).json({
                        message: "Не вдалось знайти власника"
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
            message: "Не вдалось видалити власника"
        })
    }
}