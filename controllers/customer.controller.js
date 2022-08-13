import CustomerModel from "../models/customer.model.js";

export const addNewCustomer = async (req, res) => {
    try {        
        const doc = new CustomerModel({
            fullName: req.body.fullName,
            phoneNumber: req.body.phoneNumber,
            request: {
                realtyIsNeed: req.body.request.realtyIsNeed,
                haveCash: req.body.request.haveCash,
                terms: req.body.request.terms,
                comment: req.body.request.comment
            },
            user: req.userId
        })
        const customer = await doc.save()

        res.json(customer._doc)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Не вдалось додати клієнта'
        })
    }
}