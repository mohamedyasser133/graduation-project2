
import { userModel } from '../../../DB/Models/user.model.js'
import { generateToken, verifyToken } from '../../Utils/tokenFunctions.js'
import pkg from 'bcrypt'
import { brandModel } from '../../../DB/Models/brand.model.js'

//======================================== SignUp ===========================
export const signUp = async (req, res, next) => {
    const {
        userName,
        email,
        password,
        role

    } = req.body
    // email check
    const isEmailDuplicate = await userModel.findOne({ email })
    if (isEmailDuplicate) {
        return next(new Error('email is already exist', { cause: 400 }))
    }

    

    const user = new userModel({
        userName,
        email,
        password,
        provider: 'System',
        role
    })

    const savedUser = await user.save()
    req.failedDocument = {
        model: userModel,
        _id: user._id
    }
    res.status(201).json({ message: 'Done', savedUser })
}
//=============================== Log In ===============================
export const logIn = async (req, res, next) => {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })
    
    if (!user) {
        return next(new Error('invalid login credentials', { cause: 400 }))
    }
    const isPassMatch = pkg.compareSync(password, user.password)
    if (!isPassMatch) {
        return next(new Error('invalid login credentials', { cause: 400 }))
    }

    const token = generateToken({
        payload: {
            email,
            _id: user._id,
            role: user.role,
        },
        signature: process.env.SIGN_IN_TOKEN_SECRET,
        expiresIn: '1h',
    })

    const userUpdated = await userModel.findOneAndUpdate(
        { email },
        {
            token,
            status: 'Online',
        },
        {
            new: true,
        },
    )
    res.status(200).json({ messge: 'Login done', userUpdated })
}

// -----------------------------signup provider------------------------------------------
export const signUp_provider = async (req, res, next) => {
    const {
        userName,
        email,
        password,
        role,

    } = req.body
    // email check
    const isEmailDuplicate = await brandModel.findOne({ email })
    if (isEmailDuplicate) {
        return next(new Error('email is already exist', { cause: 400 }))
    }

    
  

    const user = new brandModel({
        name: userName,
        email,
        password,
        role,
    })

    const savedUser = await user.save()
    // req.failedDocument = {
    //     model: userModel,
    //     _id: user._id
    // }
    res.status(201).json({ message: 'Done', savedUser })
}
// -------------------------login------------------
export const logIn_provider = async (req, res, next) => {
    const { email, password } = req.body
    const user = await brandModel.findOne({ email })
    if (!user) {
        return next(new Error('invalid login credentials', { cause: 400 }))
    }
    // const isPassMatch = pkg.compareSync(password, user.password)
    if (password !== user.password) {
        return next(new Error('invalid login credentials', { cause: 400 }))
    }

    const token = generateToken({
        payload: {
            email,
            _id: user._id,
            role: user.role,
        },
        signature: process.env.SIGN_IN_TOKEN_SECRET,
        expiresIn: '1h',
    })

    const userUpdated = await brandModel.findOneAndUpdate(
        { email },
        {
            token,
        },
        {
            new: true,
        },
    )
    res.status(200).json({ message: 'Login done', userUpdated })
}