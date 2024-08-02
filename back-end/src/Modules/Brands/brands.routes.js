import { Router } from 'express'
import * as bc from './brands.controller.js'
import { asyncHandler } from '../../Utils/asyncHandler.js'
import { isAuth, isAuth_provider } from '../../Middlewares/auth.js'
import { brandApisRoles } from './brand.endPoints.js'



const router = Router()




router.get('/getAllTasks', isAuth_provider(brandApisRoles.GET_ALL_BRAND)
    , asyncHandler(bc.getAllTasks))

router.get('/providers', isAuth_provider(brandApisRoles.GET_ALL_BRAND)
    , asyncHandler(bc.getAllProviders))

router.post(
    '/create',
    isAuth_provider(brandApisRoles.CREATE_BRAND),
    asyncHandler(bc.addservice),
)

router.patch(
    '/changeStatus',
    isAuth_provider(brandApisRoles.UPDATE_BRAND),
    asyncHandler(bc.changeStatusOfTask),
)
router.delete('/delete',
    isAuth_provider(brandApisRoles.DELETE_BRAND)
    , asyncHandler(bc.deleteservice))

router.get('/services', asyncHandler(bc.services))



export default router