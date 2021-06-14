const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userController = {
    signUp: async (req,res) => {
        let {name, userName, email, password, google} = req.body
        const mailExist = await User.findOne({email})

        let respuesta;
        let error;
        let userToRecord;
        
        password = bcryptjs.hashSync(password, 10)
        if(!mailExist){
            try{
                userToRecord = new User({name, userName, email, password, google})       
                await userToRecord.save()
                const token = jwt.sign({...userToRecord}, process.env.SECRET_OR_KEY)
                respuesta = token  
            }catch{
                error = "There was an error in the user engraving. Retry"
            }
        } else {
            error = 'The mail is already in use'
        }
        if(error){
            return res.json({success: false, errores: {'controllers':error}})
        }
        res.json({
            success: true,
            respuesta: {token: respuesta, name: userToRecord.name, userName: userToRecord.userName, email: userToRecord.email}
        }) 
    },
    signIn: async (req,res) => {
        const {password} = req.body
        
        let respuesta;
        let error;
        let userExist
        userExist = await User.findOne({email: req.body.emailOrUsername})
        if(!userExist){
            userExist = await User.findOne({userName: req.body.emailOrUsername})
        }

        if(userExist){
            const passwordEqual = bcryptjs.compareSync(password, userExist.password)
            if(passwordEqual){
                const token = jwt.sign({...userExist}, process.env.SECRET_OR_KEY)
                respuesta = token 
            }else{
                error = userExist.google ? 'You have to login with google' : 'Incorrect username and/or password'                
            }
        } else {
            error = 'Incorrect username and/or password'
        }

        res.json({
            success: !error ? true : false,
            respuesta: !error && {token: respuesta, name: userExist.name, userName: userExist.userName, email: userExist.email},
            error: error
        })  
    },
    loginForced: (req, res) => {
        res.json({success: true, respuesta: { name: req.user.name, userName: req.user.userName, email: req.user.email}})
    }
}

module.exports = userController