
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {type:String, require:true, trim:true, minLength: 2, maxLength:20 },
    userName:{type:String, require:true, trim:true},
    age: {type:Number, min:4, max:100, require:false},
    email:{type:String, require:true,minLength: 4, unique:true},
    password:{type:String, require:true, minLength: 3},
    rol:{type:String, required: true, emun: ['ADMIN_ROLE', 'USER_ROLE']},
    active:{type:Boolean}
})

UserSchema.methods.toJSON = function(){
    const {__v,password,_id,...user}=this.toObject()
    user.uid = _id
    return user
}

module.exports= mongoose.model("user", UserSchema)