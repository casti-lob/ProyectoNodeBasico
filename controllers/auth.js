const User = require("../models/user")
const bcryptjs = require('bcryptjs')

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
            res.status(200).json(user)
        }
        
    } catch (error) {
        res.status(500).json({message:error});
    }
}

module.exports={login}