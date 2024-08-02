import { Schema, model } from 'mongoose'
const ServicesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description:{
      type: String,
      required: true,
    },
    price:{
      type:String,
      required: true,
    },
    brandId:{
      type: Schema.Types.ObjectId,
      ref: 'Brand',
      required: true,
    }
  },  {
    timestamps: true,
},
)
export const ServicesModel = model('Services', ServicesSchema)
