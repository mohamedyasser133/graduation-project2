import { cartModel } from '../../../DB/Models/cart.model.js'
import { productModel } from '../../../DB/Models/product.model.js'
import { ServicesModel } from '../../../DB/Models/service.js'

// ======================= Add to cart ==================
export const addToCart = async (req, res, next) => {
   const { id } = req.authUser
    const { serviceid } = req.body
console.log("ddd")
    // ================== product check ==============
    const productCheck = await ServicesModel.findById({
        _id: serviceid
    })
    if (!productCheck) {
        return next(
            new Error('inavlid Service', { cause: 400 }),
        )
    }

    const userCart = await cartModel.findOne({ userId: id }).lean()
    if (userCart) {
        const cart = await cartModel.hydrate(userCart)
        if (cart.serviceids.includes(serviceid)) {
            return next(
                new Error('this service is already exist', { cause: 400 }),
            )
        }

        cart.serviceids.push(serviceid)

        const updatedUser = await cart.save()
        // const newCart = await cartModel.findOneAndUpdate(
        //     { userId: _id },
        //     {

        //         serviceids: userCart.serviceids,
        //     },
        //     {
        //         new: true,
        //     },
        // )
        return res.status(200).json({ message: 'Done', updatedUser })
    }

    // First Time

    // let newID = userCart.serviceids
    // newID.push(serviceid)

    // const UserCart = await cartModel.findOne({ userId: _id })
    let userServices = [serviceid]
    const cartObject = {
        userId: _id,
        serviceids: userServices,
    }

    const cartDB = await cartModel.create(cartObject)

    res.status(201).json({ message: 'Done', cartDB })
}

// ======================= delete from cart ==================

export const deleteFromCart = async (req, res, next) => {
    const { _id } = req.authUser
    const { serviceid } = req.body


    // ================== service check ==============
    const serviceCheck = await ServicesModel.findById({ _id: serviceid })
    if (!serviceCheck) {
        return next(new Error('inavlid product id', { cause: 400 }))
    }

    const userCart = await cartModel.findOne({ userId: _id })

    if (!userCart) {
        return next(new Error('no productId in cart '))
    }


    const newCart = await cartModel.findOneAndUpdate(
        { userId: _id },
        {

            $pull: {

                serviceids: serviceid,
            }
        },
        {
            new: true,
        },
    )
    return res.status(200).json({ message: 'Done', newCart })
}