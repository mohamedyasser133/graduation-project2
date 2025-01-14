import { Schema, model } from 'mongoose'

const productSchema = new Schema(
    {
        // ======= Text section =======
        title: {
            type: String,
            required: true,
            lowercase: true,
        },
        desc: String,
        slug: {
            type: String,
            required: true,
            lowercase: true,
        },

        // ======= Specifications section =======
        colors: [String],
        sizes: [String],

        // ======= Price section =======
        price: {
            type: Number,
            required: true,
            default: 1,
        },
        appliedDiscount: {
            type: Number,
            default: 0,
        },
        priceAfterDiscount: {
            type: Number,
            default: 0,
        },

        // ======= Quantity section =======
        stock: {
            type: Number,
            required: true,
            default: 1,
        },

        // ======= Related Ids section =======
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        updatedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        deletedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        categoryId: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
        subCategoryId: {
            type: Schema.Types.ObjectId,
            ref: 'subCategory',
            required: true,
        },
        brandId: {
            type: Schema.Types.ObjectId,
            ref: 'Brand',
            required: true,
        },

        // ======= Images section =======
        Images: [
            {
                secure_url: {
                    type: String,
                    required: true,
                },
                public_id: {
                    type: String,
                    required: true,
                },
            },
        ],
        //================= rate ============
        rate: {
            type: Number,
            default: 0,
        },
        customId: String,
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    },
)
productSchema.virtual('Reviews', {
    ref: 'Review',
    foreignField: 'productId',
    localField: '_id',
})
const productModel = model('Product', productSchema)
new productModel({
    desc:" ddd",
    price:100

})
export { productModel } 