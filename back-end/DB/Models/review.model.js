import { Schema, model } from 'mongoose'

const reviewSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        brandId: {
            type: Schema.Types.ObjectId,
            ref: 'Brand',
            required: true,
        },
        reviewRate: {
            type: Number,
            required: true,
            enum: [1, 2, 3, 4, 5],
        },
        reviewComment: String,
    },
    {
        timestamps: true,
    },
)

export const reviewModel = model('Review', reviewSchema)