
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MuseumSchema = new Schema({
    name: String,
    country: String,
    price: Number,
    category:String
})

module.exports= mongoose.model("museum",MuseumSchema)