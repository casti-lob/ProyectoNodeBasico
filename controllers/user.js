//Importamos el model
const User = require("../models/user")

const bcryptjs = require('bcryptjs')


const getUsers = async(req,res)=>{
    try {
        const users = await User.find();
        if(users.length<1){
            res.status(200).json("No hay usuarios");
        }else{
            res.status(200).json(users);
        }
    } catch (error) {
        res.status(500).json({message:error});
    }
}
const getUser = async(req, res)=>{
    try {
        paramsId = req.params.id;
        const user = await User.findById(paramsId);
        if(!user){
            res.status(404).json(`No existe un usuario con id: ${paramsId}`);
        }else{
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(500).json({message:error});
    }
}


const addUsers = async(req,res)=>{
    const user = req.body;//Hay que restringir los parametros 
    const newUser = new User(user);

    //Encriptado password
    const salt = bcryptjs.genSaltSync();
    const encryptedPassword = bcryptjs.hashSync( newUser.password, salt);
    newUser.password= encryptedPassword
    //el login por post y el rol
    newUser.active= true;
    newUser.rol= "USER_ROLE"
    try {
        await newUser.save();
        res.status(201).json(newUser)
    } catch (error) {
        res.status(500).json({message:error})
    }
}

const deleteUser = async(req,res)=>{
    const idUser = req.params.id
    try {
        const oldUser = await User.findById(idUser)
        
        if(!oldUser){
            res.status(404).json(`No existe un usuario con id: ${idUser}`);
        }else{
            console.log(oldUser);
            oldUser.active= false;
            console.log(oldUser);
            await User.findByIdAndUpdate(idUser,oldUser)
           res.status(200).json(oldUser)
        }
    } catch (error) {
        res.status(500).json({message:error})
    }
}

const updateUser = async(req,res)=>{
    const idUser= req.params.id
    const newUser = req.body
    try {
      const oldUse = await User.findById(idUser);
      if(!oldUse){
        res.status(404).json("No existe el usuario");
      }else{
        const email = newUser.email
        const existsEmail = await User.findOne({email})
        if(existsEmail&& existsEmail._id!=idUser){
            res.status(404).json("Ese email lo tiene otro usuario");
        }else{
            await oldUse.updateOne(newUser)
            res.status(200).json(await User.findById(idUser))
        }
       
      }

    } catch (error) {
      res.status(500).json({message:error})
    }

}

//Exportamos los metodos del controller
module.exports={getUsers, addUsers, getUser, deleteUser, updateUser}