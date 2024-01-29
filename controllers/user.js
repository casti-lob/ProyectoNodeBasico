//Importamos el model
const User = require("../models/user")

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

//login
const login= async (req,res)=>{
    const{name,password}= req.body;
    try {
        const user= await User.findOne({name})
        
        if(!user || user.password != password){
            return res.status(400).json({mensage:`Las credenciales estan mal`})
        }else{
            res.status(200).json(user)
        }
        
    } catch (error) {
        res.status(500).json({message:error});
    }
}

const addUsers = async(req,res)=>{
    const user = req.body;
    const newUser = new User(user);
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
        const user = User.findById(idUser)
        if(!user){
            res.status(404).json(`No existe un usuario con id: ${idUser}`);
        }else{
            await User.deleteOne(user)
            res.status(200).json(user)
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
module.exports={getUsers, addUsers, getUser, deleteUser, updateUser, login}