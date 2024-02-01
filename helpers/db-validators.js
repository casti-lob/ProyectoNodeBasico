const User = require('../models/user')
const Museum = require('../models/museum')
const existsEmail = async (email)=>{
    const emailDb = await User.findOne({email})
    if(emailDb){
        throw new Error(`Email ${email} already exists`)//lo requiere el check para validar personalizado
    }
}

const existsUserName = async (userName)=>{
    const userNameDb = await User.findOne({userName})
    if(userNameDb){
        throw new Error(`El usuario ${userName} already exists`)//lo requiere el check para validar personalizado
    }
}

const existsUser = async (id)=>{
    const userDb = await User.findById(id)
    if(!userDb){
        throw new Error(`Id User ${id} does not exist`)
    }
}

const existsMuseum = async (id)=>{
    const museumDb = await Museum.findById(id)
    if(!museumDb){
        throw new Error(`Id Museo ${id} does not exist`)
    }
}


module.exports ={existsEmail, existsUser, existsMuseum, existsUserName}
