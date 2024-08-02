import { Schema, model } from 'mongoose'

const orderSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        serviceids: [{
            type: Schema.Types.ObjectId,
            ref: 'Services',
            required: true,
        }],
        paidAmount: {
            type: Number,
            default: 0,
            // required: true,
        },
        address: {
            type: String,
            // required: true,
        },
        orderStatus: {
            type: String,
            enum: [
                'pending',
                'start',
                'end'],
        },
    },
    { timestamps: true },
)

export const orderModel = model('Order', orderSchema)