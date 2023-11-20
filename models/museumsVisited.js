
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MuseumsVisitedSchema = new Schema({
    idUser: {type:String, require:true, trim:true},
    idMuseum: {type:String, require:true, trim:true},
    valuation: {type:Number, require:true, min:0, max:10},
    comentary:{type:String, require:false, min:5, max:100}
})

module.exports= mongoose.model("museumsVisited",MuseumsVisitedSchema)