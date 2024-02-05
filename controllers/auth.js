const User = require("../models/user")
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

//login
const login= async (req,res)=>{
    const{userName,password}= req.body;
    try {
        const user= await User.findOne({userName})
        //comprobamos contraseña
        const validPassword = bcryptjs.compareSync( password, user.password);

        if(!user || !validPassword){
            return res.status(400).json({mensage:`Las credenciales estan mal`})
        }else if(user.active==false){
            return res.status(401).json({mensage:`Lo sentimos pero el usuario no está activo`})
        }else{
            
            //Generar el JWT token
            
            const payload ={uid: user.id};
            const token = jwt.sign(payload, process.env.SECRET,{expiresIn:'4h'})  

            res.status(200).json({user,token})
        }
        
    } catch (error) {
        res.status(500).json({message:error});
    }
}

module.exports={login}