import { Schema, model } from 'mongoose'

const cartSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        serviceids:[ {
            type: Schema.Types.ObjectId,
            ref: 'Services',
            required: true,
        }],
    },
    { timestamps: true },
)

export const cartModel = model('Cart', cartSchema)