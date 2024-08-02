import { Schema, model } from 'mongoose'

const taskSchema = new Schema(
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
        serviceId: {
            type: Schema.Types.ObjectId,
            ref: 'Services',
            required: true,
        },
        taskStatus: {
            type: String,
            enum: [
                'start',
                'end'],
        }
    },
    {
        timestamps: true,
    },
)

export const taskModel = model('Tasks', taskSchema)