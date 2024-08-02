
// import { customAlphabet } from 'nanoid'
// const nanoid = customAlphabet('123456_=!ascbhdtel', 5)
import { ServicesModel } from '../../../DB/Models/service.js'
import { taskModel } from '../../../DB/Models/task.model.js'
import { orderModel } from '../../../DB/Models/order.model.js'
import { brandModel } from '../../../DB/Models/brand.model.js'





//=================================== Add Brand ========================
export const addservice = async (req, res, next) => {
    const { name, description, price } = req.body
    const { brandId } = req.query

    const Servicemodel = new ServicesModel({ name, description, price, brandId })
    await Servicemodel.save()
    res.status(201).json({ message: 'service added sucsseflly', Servicemodel })
}



//===================================delete ========================
export const deleteservice = async (req, res, next) => {
    const { brandId } = req.query

    // get Brand by id 
    const isBrandExsit = await ServicesModel.findOneAndDelete({
        brandId,
    })
    if (!isBrandExsit) {
        return next(new Error('invalid brand Id', { cause: 400 }))

    } res.status(201).json({ message: 'deleted sucssfully', isBrandExsit })
}

export const getAllTasks = async (req, res, next) => {
    const { brandId } = req.query

    // get Brand by id 
    const isBrandExsit = await taskModel.find({ brandId })
    if (!isBrandExsit) {
        return next(new Error('invalid brand Id', { cause: 400 }))

    } res.status(201).json({ message: 'All tasks', isBrandExsit })
}

export const getAllProviders = async (req, res, next) => {

    const isBrandExsit = await brandModel.find()

    res.json({ message: 'All Providers', isBrandExsit })
}

export const changeStatusOfTask = async (req, res, next) => {
    const { brandId, serviceId } = req.query
    const { status } = req.body

    // get Brand by id 
    const isBrandExsit = await taskModel.findOne({ brandId, serviceId })
    if (!isBrandExsit) {
        return next(new Error('invalid brand Id or service', { cause: 400 }))
    }

    
    if (status == "start") {
        isBrandExsit.taskStatus = 'start'
        await isBrandExsit.save()
        const order = await orderModel.findOne({ userId: isBrandExsit.userId, serviceids: { $in: [serviceId] } })
        order.orderStatus = 'start'
        await order.save()
        res.status(201).json({ message: 'Task status has been changed', isBrandExsit })
    } else {
        isBrandExsit.taskStatus = 'end'
        await isBrandExsit.save()
        const order = await orderModel.findOne({ userId: isBrandExsit.userId, serviceids: { $in: [serviceId] } })
        order.orderStatus = 'end'
        await order.save()

        res.status(201).json({ message: 'All tasks', isBrandExsit })
    }
}
//   get all services
export const services = async (req, res, next) => {

    const services = await ServicesModel.find()

    res.status(201).json({ message: 'All services', services })
}