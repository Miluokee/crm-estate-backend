import OwnerModel from "../models/owner.model.js";

export const getOwners = async (req, res) => {
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