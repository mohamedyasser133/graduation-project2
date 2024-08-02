import { cartModel } from '../../../DB/Models/cart.model.js'
import { orderModel } from '../../../DB/Models/order.model.js'
import { ServicesModel } from '../../../DB/Models/service.js'
import { taskModel } from '../../../DB/Models/task.model.js'
import { generateToken, verifyToken } from '../../Utils/tokenFunctions.js'
// ========================== create order =================
export const createOrder = async (req, res, next) => {
    const { _id } = req.authUser
    const {
        serviceid,
        address,
    } = req.body

    // ====================== service check ================
    const serviceids = []
    serviceids.push(serviceid)

    //====================== paid Amount =================
    let paidAmount = 0

    const Service = await ServicesModel.findById(serviceid)
    paidAmount = Service.price

    //======================= paymentMethod  + orderStatus ==================
    const orderStatus = "pending"

    const orderObject = {
        userId: _id,
        serviceids,
        address,
        orderStatus,
        paidAmount,
    }
    const brandTask = {
        userId: _id,
        brandId: Service.brandId,
        serviceId: serviceid,
    }

    const orderDB = await orderModel.create(orderObject)
    await taskModel.create(brandTask)

    return res.status(201).json({ message: 'Order is created Done', orderDB })

}

// =========================== create order from cart products ====================
export const fromCartoOrder = async (req, res, next) => {
    const { _id } = req.authUser
    const { cartId } = req.query
    const { address } = req.body

    const cart = await cartModel.findById(cartId)
    if (!cart) {
        return next(new Error('please fill your cart first', { cause: 400 }))
    }

    //====================== paid Amount =================
    let paidAmount = 0
    let bulkTasks = []
    for (let index = 0; index < cart.serviceids.length; index++) {
        let serviceId = cart.serviceids[index].toString()
        const servicePrice = await ServicesModel.findById(serviceId)
        paidAmount += Number(servicePrice.price)
        const brandTask = {
            userId: _id,
            brandId: servicePrice.brandId,
            serviceId,
        }
        bulkTasks.push(brandTask)
    }
    //======================= paymentMethod  + orderStatus ==================
    const orderStatus = "pending"

    const orderObject = {
        userId: _id,
        serviceids: cart.serviceids,
        address,
        orderStatus,
        paidAmount,
    }

    const orderDB = await orderModel.create(orderObject)
    await taskModel.create(bulkTasks)


    return res.status(201).json({ message: 'Done', orderDB })
}

export const getMyOrders = async (req, res, next) => {
    const { _id } = req.authUser

    const orders = await orderModel.find({ userId: _id })

    res.status(200).json({ message: 'Done', orders })
}
// ============================= success payment  ===================
export const successPayment = async (req, res, next) => {
    const { token } = req.query
    const decodeData = verifyToken({ token, signature: process.env.ORDER_TOKEN })
    const order = await orderModel.findOne({
        _id: decodeData.orderId,
        orderStatus: 'pending',
    })
    if (!order) {
        return next(new Error('invalid order id', { cause: 400 }))
    }
    order.orderStatus = 'confirmed'
    await order.save()
    res.status(200).json({ message: 'done', order })
}

//================================ cancel payment =====================
export const cancelPayment = async (req, res, next) => {
    const { token } = req.query
    const decodeData = verifyToken({ token, signature: process.env.ORDER_TOKEN })
    const order = await orderModel.findOne({ _id: decodeData.orderId })
    if (!order) {
        return next(new Error('invalid order id', { cause: 400 }))
    }

    //=============== approch one orderSattus:'canceled' =============
    order.orderStatus = 'canceled'
    await order.save()
    //================ delete from db ================
    // await orderModel.findOneAndDelete({ _id: decodeData.orderId })

    //=================== undo prouducts  and coupon  ====================
    for (const product of order.products) {
        await productModel.findByIdAndUpdate(product.productId, {
            $inc: { stock: parseInt(product.quantity) },
        })
    }

    if (order.couponId) {
        const coupon = await couponModel.findById(order.couponId)
        if (!coupon) {
            return next(new Error('invalid coupon id'))
        }
        coupon.couponAssginedToUsers.map((ele) => {
            if (order.userId.toString() == ele.userId.toString()) {
                ele.usageCount -= 1
            }
        })

        await coupon.save()
    }
    res.status(200).json({ message: 'done', order })
}

export const deliverOrder = async (req, res, next) => {
    const { orderId } = req.query

    const order = await orderModel.findOneAndUpdate(
        {
            _id: orderId,
            orderStatus: { $nin: ['delivered', 'pending', 'canceled', 'rejected'] },
        },
        {
            orderStatus: 'delivered',
        },
        {
            new: true,
        },
    )

    if (!order) {
        return next(new Error('invalid order', { cause: 400 }))
    }

    return res.status(200).json({ message: 'Done', order })
}