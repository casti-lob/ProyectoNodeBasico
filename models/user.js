
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {type:String, require:true, trim:true, minLength: 2, maxLength:20 },
    age: {type:Number, min:4, max:100, require:false},
    email:{type:String, require:true,minLength: 4, unique:true},
    password:{type:String, require:true, minLength: 3}
})

module.exports= mongoose.model("user", UserSchema)