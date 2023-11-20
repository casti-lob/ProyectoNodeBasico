
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MuseumSchema = new Schema({
    name: {type:String, require:true, trim: true, minLength: 3, unique:true},
    country: {type:String, require:true, trim: true, minLength: 4},
    price: {type:Number, require:true, min:1},
    category:{type:String, require:true, trim: true, minLength: 5}
})

module.exports= mongoose.model("museum",MuseumSchema)