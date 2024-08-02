import { reviewModel } from '../../../DB/Models/review.model.js'
import { ApiFeatures } from '../../Utils/apiFeatures.js'
import { brandModel } from '../../../DB/Models/brand.model.js'
//============================ add review ================
export const addReview = async (req, res, next) => {
    const { _id } = req.authUser
    const { brandId } = req.query
    const { reviewRate, reviewComment } = req.body

 

    const reviewObject = {
        userId: _id,
        brandId,
        reviewComment,
        reviewRate,
    }
    const reviewDB = await reviewModel.create(reviewObject)

    if (!reviewDB) {
        return next(new Error('fail to add review', { cause: 500 }))
    }

    const brand = await brandModel.findById(brandId)
    const reviews = await reviewModel.find({ brandId })
    let sumOfRates = 0
    for (const review of reviews) {
        sumOfRates += review.reviewRate
    }
    brand.rate = Number(sumOfRates / reviews.length).toFixed(2)
    await brand.save()

    res.status(201).json({ message: 'Done', reviewDB, brand })
}

//============================   ================== 
export const getAllReviews = async (req, res, next) => {
    const { brandId } = req.query
    // const { limit, skip } = paginationFunction({ page, size })

    const reviews = await reviewModel.find({ brandId })
    if (!reviews.length) {
        return next(new Error('there are no longer reviews', { cause: 400 }))
    }

    res.status(200).json({ message: 'Done', reviews })
}

// ===================== apply some features in api ==============
export const listReviews = async (req, res, next) => {

    const ApiFeaturesInstance = new ApiFeatures(reviewModel.find({}), req.query)
        .pagination()
        .filters()
        .sort()
        .select()
    const reviews = await ApiFeaturesInstance.mongooseQuery
    res.status(200).json({ message: 'Done', reviews })
}
