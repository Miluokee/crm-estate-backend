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

export const getAllCustomers = async (req, res) => {
    try {
        const customers = await CustomerModel.find().populate('user')

        res.json(customers)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Не вдалось отримати дані клієнтів'
        })
    }
}

export const getOneCustomer = async (req, res) => {
    try {
        const customerId = req.params.id

        CustomerModel.findById({
            _id: customerId
        },
        (error, doc) => {
            if (error) {
                console.log(error)
                return res.status(500).json({
                    message: 'Не вдалось відобразити клієнта'
                })
            }
            if (!doc) {
                return res.status(404).json({
                    message: 'Клієнт відсутній'
                })
            }

            res.json(doc)
        }).populate('user')
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Не вдалось отримати дані клієнта'
        })
    }
}

export const editCustomerInfo = async (req, res) => {
    try {
        const customerId = req.params.id

        await CustomerModel.updateOne({
            _id: customerId
        },
        {
            fullName: req.body.fullName,
            phoneNumber: req.body.phoneNumber,
            request: {
                realtyIsNeed: req.body.request.realtyIsNeed,
                haveCash: req.body.request.haveCash,
                terms: req.body.request.terms,
                comment: req.body.request.comment
            }
        })

        res.json({
            success: true
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Не вдалось оновити інформацію про клієнта'
        })
    }
}

export const deleteCustomer = async (req, res) => {
    try {
        const customerId = req.params.id

        CustomerModel.findOneAndDelete({
            _id: customerId
        },
        (error, doc) => {
            if (error) {
                console.log(error)
                return res.status(500).json({
                    message: 'Не вдалось видалити дані про кієнта'
                })
            }

            if (!doc) {
                return res.status(404).json({
                    message: 'Клієнт відсутній'
                })
            }

            res.json({
                success: true
            })
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Не вдалось отримати дані клієнта'
        })
    }
}