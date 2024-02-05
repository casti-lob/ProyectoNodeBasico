const {request, response}= require('express')
const jwt= require('jsonwebtoken')
const User = require('../models/user')

const validateJWT = async(req=request, res=response, next)=>{
    const token = req.header('x-token');
    
    if(!token){
        return res.status(401).json({msg:'No hay token en la petición'})
    }
    try {
        const {uid} = jwt.verify(token, process.env.SECRET)
        console.log('Uid',uid);
        const user = await User.findById(uid)
        if(!user){
            return res.status(401).json({msg:'Token no valido el usuario no existe'})
        }
        if(!user.active){
            return res.status(401).json({msg:'Token no valido el usuario no está activo'})
        }
        console.log('User',user);
        req.userLogin = user;
        next()
    } catch (error) {
        console.log('Error',error);
    }
}

module.exports={validateJWT}