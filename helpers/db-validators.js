const User = require('../models/user')
const Museum = require('../models/museum')
const existsEmail = async (email)=>{
    const emailDb = await User.findOne({email})
    if(emailDb){
        throw new Error(`Email ${email} already exists`)//lo requiere el check para validar personalizado
    }
}

const isAdmin =  ()=>{
    const userLog = req.userLogin
    if(userLog.rol !='ADMIN_ROLE'){
        throw new Error(`El usuario no es administrador para realizar la acción`)

    }
   
}

const rolValid = async(rol)=>{
    if(rol!=='ADMIN_ROLE'&&rol!=='USER_ROLE'){
        throw new Error(`Solo se admite de rol ADMIN_ROLE y USER_ROLE`)
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


module.exports ={existsEmail, existsUser, existsMuseum, existsUserName, rolValid}
