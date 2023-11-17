
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MuseumsVisitedSchema = new Schema({
    idUser: Number,
    idMuseum: Number,
    valuation: Number,
    comentary:String
})

module.exports= mongoose.model("museumsVisited",MuseumsVisitedSchema)