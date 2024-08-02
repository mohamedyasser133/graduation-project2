import { globalResponse } from './asyncHandler.js'
import { connectDB } from '../../DB/connection.js'
import * as allRouters from '../Modules/index.routers.js'
import { gracefulShutdown } from 'node-schedule'
import cors from 'cors'

export const initiateApp = (app, express) => {

    const port = process.env.PORT || 5000

    connectDB()
    app.use(express.json())
    // cors policy
    app.use(cors())
    app.get('/', (req, res) => res.send('Hello There in my Trust_pro_Connect platform! '))
    //  Section Requests On RESTful APIs
    app.use('/brand', allRouters.brandRouters)
    app.use('/product', allRouters.productRouters)
    app.use('/auth', allRouters.authRouters)
    app.use('/cart', allRouters.cartRouters)
    app.use('/order', allRouters.orderRouters)
    app.use('/review', allRouters.reviewRouter)


    app.all('*', (req, res) => { res.status(404).json({ Message: "404 Not fount URL" }) })

    app.use(globalResponse)



    gracefulShutdown()

    app.listen(port, () => { console.log(`...Server is running on Port ${port}`); })
}

