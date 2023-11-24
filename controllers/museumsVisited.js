//Importamos el model
const MuseumsVisited = require("../models/museumsVisited")

const getMuseumsV = async(req,res)=>{
    try {
        const museums = await MuseumsVisited.find();
        if(museums.length<1){
            res.status(200).json("No has visitado ningun museo");
        }else{
            res.status(200).json(museums);
        }
    } catch (error) {
        res.status(500).json({message:error});
    }
}
const getMuseumV = async(req, res)=>{
    try {
        paramsId = req.params.id;

        const museum = await MuseumsVisited.findById(paramsId);
        if(!museum){
            res.status(404).json(`No existe o has visitado un museo con id: ${paramsId}`);
        }else{
            res.status(200).json(museum);
        }
    } catch (error) {
        res.status(500).json({message:error});
    }
}

const addMuseumV = async(req,res)=>{
    const museum = req.body;
    
   
    const newMuseum = new MuseumsVisited(museum);
    try {
        await newMuseum.save();
        res.status(201).json(newMuseum)
    } catch (error) {
        res.status(500).json({message:error})
    }
}

const deleteMuseumV = async(req,res)=>{
    const idMuseum = req.params.id
    try {
        const museum = await MuseumsVisited.findById(idMuseum)
        if(!museum){
            res.status(404).json(`No existe un museo con id: ${idMuseum}`);
        }else{
            await MuseumsVisited.deleteOne(museum)
            res.status(200).json(museum)
        }
    } catch (error) {
        res.status(500).json({message:error})
    }
}

const updateMuseumV = async(req,res)=>{
    const idMuseum= req.params.id
    const newMuseum = req.body
    try {
      const oldMuseum = await MuseumsVisited.findById(idMuseum);
      if(!oldMuseum){
        res.status(404).json("No existe el usuario");
      }else{
        await oldMuseum.updateOne(newMuseum)
        res.status(200).json(await MuseumsVisited.findById(idMuseum))
      }

    } catch (error) {
      res.status(500).json({message:error})
    }

}

//Exportamos los metodos del controller
module.exports={getMuseumsV,getMuseumV,addMuseumV,updateMuseumV,deleteMuseumV}