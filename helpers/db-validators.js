const User = require('../models/user')

const existsEmail = async (email)=>{
    const emailDb = await User.findOne({email})
    if(emailDb){
        throw new Error(`Email ${email} already exists`)//lo requiere el check para validar personalizado
    }
}

module.exports ={existsEmail}
