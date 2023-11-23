//Importamos el model
const Museum = require("../models/museum")

const getMuseums = async(req,res)=>{
    try {
        const museum = await Museum.find();
        if(museum.length<1){
            res.status(200).json("No hay museos");
        }else{
            res.status(200).json(museum);
        }
    } catch (error) {
        res.status(500).json({message:error});
    }
}
const getMuseum = async(req, res)=>{
    try {
        paramsId = req.params.id;
        const museum = await Museum.findById(paramsId);
        if(!museum){
            res.status(404).json(`No existe un museo con id: ${paramsId}`);
        }else{
            res.status(200).json(museum);
        }
    } catch (error) {
        res.status(500).json({message:error});
    }
}

const addMuseum = async(req,res)=>{
    const museum = req.body;
    const newMuseum = new Museum(museum);
    try {
        await newMuseum.save();
        res.status(201).json(newMuseum)
    } catch (error) {
        res.status(500).json({message:error})
    }
}

const deleteMuseum = async(req,res)=>{
    const idMuseum = req.params.id
    try {
        const museum = await Museum.findById(idMuseum)
        if(!museum){
            res.status(404).json(`No existe un usuario con id: ${idMuseum}`);
        }else{
            res.status(200).json(await Museum.deleteOne(museum))
        }
    } catch (error) {
        res.status(500).json({message:error})
    }
}

const updateMuseum = async(req,res)=>{
    const idMuseum= req.params.id
    const newMuseum = req.body
    try {
      const oldMuseum = await Museum.findById(idMuseum);
      if(!oldMuseum){
        res.status(404).json("No existe el usuario");
      }else{
        await oldMuseum.updateOne(newMuseum)
        res.status(200).json(await Museum.findById(idMuseum))
      }

    } catch (error) {
      res.status(500).json({message:error})
    }

}

//Exportamos los metodos del controller
module.exports={getMuseums, addMuseum, getMuseum, deleteMuseum, updateMuseum}